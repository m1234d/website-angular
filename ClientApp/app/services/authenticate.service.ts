import { Injectable, Inject, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import { RestService } from './rest.service';
import { StorageService } from './storage.service';
import { Route, Router } from '@angular/router';

@Injectable()
export class AuthenticateService {
    rest: RestService;
    storage: StorageService;

    constructor(_rest: RestService, _storage : StorageService, private _router: Router) {
        this.rest = _rest;
        this.storage = _storage;
        console.log("Initializing OnInit")
       
        this.runVerify();
    }
    public logout() {
        this.storage.logout();
        localStorage.setItem("loginToken", "");
        this._router.navigateByUrl('/home');
    }
    public getUser() {
        if (this.storage.logged_in == false) {
            return null;
        }
        return localStorage.getItem("username");
    }
    public runVerify() {
        try {
            var tok = localStorage.getItem("loginToken");
            var user = localStorage.getItem("username");
            console.log("Current token: " + tok);
            if (tok == "" || tok == null || tok == "null") {
                console.log("Login token invalid");
                this.logout();
                return;
            }
            this.verifyToken({ username: user, token_id: tok }).subscribe(result => {
                if (result) {
                    console.log("Login token verified");                  
                    this.storage.login();
                }
                else {
                    console.log("Login token invalid");
                    this.storage.logout();
                }
            });
        }
        catch (e) {
            console.log("Loginstorage not yet initialized in Authentication");
        }
    }
    public watchLogin() {
        return this.storage.loginChanged.asObservable();
    }
    public verifyToken(t: Token) {
        return this.rest.post<Token>('api/User/VerifyLogin', t);
    }
}

export interface Token {
    token_id: string;
    username: string;
}