import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from "../../models/product.model";
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Output()
  public onBuy: EventEmitter<Product> = new EventEmitter<Product>();
  @Input()
  public product!: Product;
}
