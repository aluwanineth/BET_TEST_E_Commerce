import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';


import { PageEvent } from '@angular/material/paginator';

import { ProductService } from 'src/app/data/services/product.service';
import { Product } from 'src/app/data/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  cols = 4;

  length = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent!: PageEvent | void;

  products: Product[] = [];
  constructor(private breakpointObserver: BreakpointObserver,
    private productService: ProductService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getProducts(1, 40);
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints['(max-width: 599.98px) and (orientation: portrait)'] || result.breakpoints['(max-width: 599.98px) and (orientation: landscape)']) {
          this.cols = 1;
        }
        else if (result.breakpoints['(min-width: 1280px) and (orientation: portrait)'] || result.breakpoints['(min-width: 1280px) and (orientation: landscape)']) {
          this.cols = 4;
        } else {
          this.cols = 3;
        }
      }
    });
  }

  private getProducts(pageNumber: number, pageSize: number) {
    this.productService.getProducts(pageNumber, pageSize)
      .subscribe(
        products => {
          this.products = products.data;
          this.length = products.data.length;
        },
        err => this.router.navigateByUrl('/error')
      );
  }

  getNextPage(event: PageEvent) {
    this.getProducts(event.pageIndex + 1, event.pageSize);
  }

  trackSkus(index: number, item: Product) {
    return `${item.id}-${index}`;
  }

}
