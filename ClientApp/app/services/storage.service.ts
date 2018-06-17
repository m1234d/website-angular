import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StorageService {
    [key: string]: any;
    public loginChanged = new Subject<boolean>();

    logged_in: boolean = false;
    username: string;

    constructor() {
        try {
            if (localStorage.getItem("logged_in") == "true") {
                console.log("Initializing localstorage to true");
                this.logged_in = true;
                this.loginChanged.next(this.logged_in);
            }
            else {
                console.log("Initializing localstorage to false");
                this.logged_in = false;
                this.username = null;
                this.loginChanged.next(this.logged_in);

            }
        }
        catch (e) {
            console.log("Localstorage not found");
            this.logged_in = false;
        }
    }

    getProperty(name: string) {
        localStorage.getItem(name);
    }
    setProperty(name: string, value: string) {
        localStorage.setItem(name, value);
        this[name] = value;
        this[name + "Changed"].next(value);
    }
    createProperty(name: string, value: string) {
        localStorage.seItem(name, value);
        this[name] = value;
        this[name + "Changed"] = new Subject<string>();
    }
    getListener(name: string) {
        return this[name + "Changed"].asObservable();
    }

    login() {
        this.logged_in = true;
        this.username = localStorage.getItem("username");

        localStorage.setItem("logged_in", "true");
        this.loginChanged.next(this.logged_in);
    }
    logout() {
        this.logged_in = false;
        this.username = null;

        localStorage.setItem("logged_in", "false");
        localStorage.setItem("username", null);
        this.loginChanged.next(this.logged_in);
    }
    getLoggedIn() {
        return this.logged_in;
    }
}