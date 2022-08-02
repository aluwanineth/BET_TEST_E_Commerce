import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { CartService } from 'src/app/data/services/cart.service';
import { ProductService } from 'src/app/data/services/product.service';
import { OrderItemService } from 'src/app/data/services/order-item.service';
import { OrderService } from 'src/app/data/services/order.service';
import { Order } from 'src/app/data/models/order';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id: string = '';
  product: any;
  quantity: number = 0;
  productQuantity: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private router: Router,
    private orders: OrderService,
    private orderItemService: OrderItemService,
    private cart: CartService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        mergeMap(params => {
          const id = params.get('id')
          this.id = id ? id : '';

          return this.productService.getProduct(this.id);
        }),
        map((product) => {
          this.product = product.data;
        })
      ).subscribe({
        error: (err) => this.router.navigateByUrl('/error')
      });

  }

  addItemToCart() {
    if (this.quantity > 0) {
      if (this.cart.orderId == '') {
        this.orders.createOrder()
          .pipe(
            mergeMap((order: any) => {
              if(order.succeeded){
                 this.cart.orderId = order.data.id || '';
              }

              return this.orderItemService.createOrderItem({
                orderId: order.data.id,
                productId: this.product.id,
                name: this.product.name,
                imageUrl: this.product.imageUrl,
                quantity: this.quantity,
                unitPrice: this.product.price,
                totalPrice: 0
              });
            })
          )
          .subscribe(
            () => {
              this.cart.incrementItemCount(this.quantity);
              this.showSuccessSnackBar();
            },
            err => this.showErrorSnackBar()
          );
      } else {
        this.orderItemService.createOrderItem({
          orderId: this.cart.orderId,
          productId: this.product.id,
          name: this.product.name,
          imageUrl: this.product.imageUrl,
          quantity: this.quantity,
          unitPrice: this.product.price,
          totalPrice: 0
        }).subscribe(
          () => {
            this.cart.incrementItemCount(this.quantity);
            this.showSuccessSnackBar();
          },
          err => this.showErrorSnackBar()
        );
      }
    } else {
      this.snackBar.open('Select a quantity greater than 0.', 'Close', { duration: 8000 });
    }
  }

  setQuantity(no: number) {
    this.quantity = no;
  }

  goBack() {
    this.location.back();
  }

  private showSuccessSnackBar() {
    this.snackBar.open('Item successfully added to cart.', 'Close', { duration: 8000 });
  }

  private showErrorSnackBar() {
    this.snackBar.open('Failed to add your item to the cart.', 'Close', { duration: 8000 });
  }
}


