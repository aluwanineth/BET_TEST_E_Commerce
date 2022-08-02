import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { mergeMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { GetOrderParams, Order } from 'src/app/data/models/order';
import { CartService } from 'src/app/data/services/cart.service';
import { OrderItemService } from 'src/app/data/services/order-item.service';
import { OrderService } from 'src/app/data/services/order.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  order: any = {};

  summary: { name: string, amount: string | undefined, id: string }[] = [];
  constructor(private orderService: OrderService,
    private storage: LocalStorageService,
    private authenticationService: AuthenticationService,
    private orderItemService: OrderItemService,
    private cart: CartService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.orderService.getOrder(this.cart.orderId, GetOrderParams.cart)
    .subscribe(
      order => this.processOrder(order),
      err => this.showOrderError('retrieving your cart')
    );
  }

  private processOrder(order: any) {
    this.order = order.data;

    this.summary = [
      { name: 'Subtotal', amount: order.data.total, id: 'subtotal' },
    ];
  }

  private showOrderError(msg: string) {
    this.snackBar.open(`There was a problem ${msg}.`, 'Close', { duration: 8000 });
  }

  checkout() {
    if(this.cart.orderId)
    {
      const currentUserValue = this.authenticationService.currentUserValue;
      this.orderService.checkout(this.cart.orderId, currentUserValue.data.email).subscribe(
        () => {
          this.storage.deleteItem('order-id');
          this.storage.deleteItem('item-count');
          this.snackBar.open(`Order detail successfully sent user.`, 'Close', { duration: 8000 })
          setTimeout(() => this.router.navigateByUrl('/product'), 6000);
        },
        err => this.showOrderError("Error occur while checking out")
        );
    }

  }
  goBack() {
    this.router.navigate(['/product']);;
  }
  deleteLineItem(id: string) {
    Swal.fire({
      text: `Are you sure you want delete order item?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderItemService.deleteOrderItem(id)
      .pipe(
        mergeMap(() => this.orderService.getOrder(this.cart.orderId, GetOrderParams.cart))
      ).subscribe(
        order => {
          this.processOrder(order);
          this.cart.itemCount;
          this.snackBar.open(`Item successfully removed from cart.`, 'Close', { duration: 8000 })
        },
        err => this.showOrderError('deleting your order')
      );
      }
    })


  }
}
