import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { reverseWord } from './functions/reverse-word';
import { generatePassword } from './functions/generate-password';
import { ProductComponent } from "./components/product/product.component";
import { ProductRestService } from "./components/product/services/product-rest.service";
import { Product } from "./models/product.model";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductComponent,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public products$!: Observable<Product[] | null>;
  public isOpen: boolean = false;

  constructor(
    private productRestService: ProductRestService
  ) {
  }
  public ngOnInit(): void {
    this.products$ = combineLatest([
      this.searchQuery$,
      this.productRestService.loadMany()
    ])
      .pipe(
        map(([searchQuery, data]) =>
          data.filter(x => x.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
          ))
      );

    // task-4
    console.log(reverseWord("молоток"));
    // task-5
    console.log(generatePassword());
  }

  public onBuyLog(product: Product): void {
    console.log(product);
  }
}
