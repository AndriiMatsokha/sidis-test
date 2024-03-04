import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RestService } from "../../../services/rest.service";
import { Product } from "../../../models/product.model";
import { map, Observable } from "rxjs";


@Injectable()
export class ProductRestService {
    constructor(
        private restService: RestService,
    ) {
    }

    public loadMany(): Observable<Product[]> {
        return this.restService.get<Product[]>("products").pipe(
          map(({ body }: HttpResponse<Product[]>) =>
            body!.map(({ title, price, image }: Product): Product =>
              ({ title, price, image })
            )
          ));
    }
}
