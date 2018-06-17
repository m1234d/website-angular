import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'

@Injectable()
export class RestService {
    http: Http;
    baseUrl: string;
    get(url: string) {
        return this.http.get(this.baseUrl + url).map(result => {
            return result.json();
        })
    }
    post<T>(url: string, input: T) {
        let headers2 = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers2 });
        console.log("[POST] Sending " + input + " to " + url);
        return this.http.post(this.baseUrl + url, input, options).map(result => {
            console.log("[POST] Received:");
            console.log(result.json());
            return result.json();
        })
    }
    constructor(_http: Http, @Inject('BASE_URL') _baseUrl: string) {
        this.http = _http;
        this.baseUrl = _baseUrl;
    }

}