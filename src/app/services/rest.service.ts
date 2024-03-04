import {
    HttpClient,
    HttpHeaders,
    HttpParams,
    HttpResponse,
} from "@angular/common/http";
import {
  environment
} from "../../environments/environment";
import {
    Injectable,
} from "@angular/core";
import {
    EMPTY,
    Observable,
    throwError,
} from "rxjs";
import {
    catchError,
    finalize,
} from "rxjs/operators";

interface RequestData<D> {
    url: string;
    options: RestApiOptions;
    requestType: string;
    body?: D;
}

export interface RestApiOptions {
    urlParameters?: Object;
    request?: RestApiRequestOptions;
    encodeUri?: "encodeURI" | "encodeURIComponent";
}

interface RestApiRequestOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: "response";
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: "json";
    withCredentials?: boolean;
}

const REST_URLS: Record<string, string> = {
  products: `products`
};

const API_PREFIX: string = "/";

@Injectable({
    providedIn: "root",
})
export class RestService {

    constructor(
        private http: HttpClient
    ) {
    }

    public get<T>(url: string, options: RestApiOptions = { urlParameters: { args: "" } }): Observable<HttpResponse<T>> {
        return this.getRequestByType<T>({
            requestType: "get",
            url, options,
        });
    }

    public post<T>(url: string, body?: T, options?: RestApiOptions): Observable<HttpResponse<T>>;
    public post<T, S>(url: string, body: S, options?: RestApiOptions): Observable<HttpResponse<T>>;
    public post<T, S>(url: string, body: S, options: RestApiOptions = { urlParameters: { args: "" } }): Observable<HttpResponse<T>> {
        return this.getRequestByType<T, S>({
            requestType: "post",
            url, body, options,
        });
    }

    public put<T>(url: string, body: T, options?: RestApiOptions): Observable<HttpResponse<T>>;
    public put<T, S>(url: string, body: S, options?: RestApiOptions): Observable<HttpResponse<T>>;
    public put<T, S>(url: string, body: S, options: RestApiOptions = { urlParameters: { args: "" } }): Observable<HttpResponse<T>> {
        return this.getRequestByType<T, S>({
            requestType: "put",
            url, body, options,
        });
    }

    public patch<T>(url: string, body: T, options?: RestApiOptions): Observable<HttpResponse<T>>;
    public patch<T, S>(url: string, body: S, options?: RestApiOptions): Observable<HttpResponse<T>>;
    public patch<T, S>(url: string, body: S, options: RestApiOptions = { urlParameters: { args: "" } }): Observable<HttpResponse<T>> {
        return this.getRequestByType<T, S>({
            requestType: "patch",
            url, body, options,
        });
    }

    public delete<T>(url: string, options: RestApiOptions = { urlParameters: { args: "" } }): Observable<HttpResponse<T>> {
        return this.getRequestByType<T>({
            requestType: "delete",
            url, options,
        });
    }

    private getRequestByType<T>(data: RequestData<T>): Observable<HttpResponse<T>>;
    private getRequestByType<T, S>(data: RequestData<S>): Observable<HttpResponse<T>>;
    private getRequestByType<T, S>(data: RequestData<S>): Observable<HttpResponse<T> | Object> {
        const currentUrl: string = this.resolveUrl(data.url, data.options.urlParameters, data.options.encodeUri);
        if (!data.options.request) {
            data.options.request = {};
        }
        data.options.request.observe = "response";
        let request;
        switch (data.requestType) {
            case "get":
            case "delete":
                // @ts-ignore
                request = this.http[data.requestType](currentUrl, data.options.request);
                break;
            case "post":
            case "put":
            case "patch":
                // @ts-ignore
                request = this.http[data.requestType](currentUrl, data.body, data.options.request);
                break;
        }
        return request
            ? request.pipe(
                catchError((error) => {
                    return throwError(error);
                }),
                finalize(() => {
                }),
            )
            : EMPTY;
    }

    private resolveUrl(url: string, options?: Object, encodeUri?: string): string {
        let path: string = REST_URLS[url];
        if (options) {
            Object.keys(options).forEach((key: string) => {
                if (Object.prototype.hasOwnProperty.call(options, key)) {
                    path = path?.replace("{" + key + "}", (options as Record<string, string>)[key]);
                }
            });
        }
        path = this.checkForEmptyParams(path);
        path = API_PREFIX.concat(path);
        path = environment.host.concat(path);
        if (encodeUri === "encodeURIComponent") {
            return encodeURIComponent(path);
        }
        return encodeURI(path).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }

    private checkForEmptyParams(path: string): string {
        if (path.includes("?")) {
            const params: string[] = path.split("?")[1].split("&");
            params.forEach((param: string, index: number) => {
                if ((param.includes("{") && param.includes("}")) || param[param.length - 1] === "=") {
                    const replaceValue: string = index !== 0
                        ? "&" + param
                        : param;
                    path = path.replace(replaceValue, "");
                }
            });
        }
        return path;
    }
}
