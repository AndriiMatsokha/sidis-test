import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { reverseWord } from './functions/reverse-word';
import { generatePassword } from './functions/generate-password';
import { HeaderComponent } from "./components/header/header.component";
import { ProductComponent } from "./components/product/product.component";
import { ProductRestService } from "./components/product/services/product-rest.service";
import { Product } from "./models/product.model";
import { Observable } from "rxjs";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ProductComponent,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public burgerIsOpen: boolean = false;
  public products$!: Observable<Product[] | null>;

  constructor(
    private productRestService: ProductRestService
  ) {
  }
  public ngOnInit(): void {
    this.products$ = this.productRestService.loadMany();

    // task-4
    console.log(reverseWord("молоток"));
    // task-5
    console.log(generatePassword());
  }

  public onBuyLog(product: Product): void {
    console.log(product);
  }
}
