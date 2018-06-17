import { Component } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public rest: RestService;
    public auth: AuthenticateService;
    public username: string;
    public password: string;
    public success: boolean;

    login() {
        let user = { Username: this.username, Pass: this.password };
        this.rest.post<Login>('api/User/Login', user).subscribe(result => {
            if (result == "") {
                this.success = false;
                return;
            }
            localStorage.setItem('loginToken', result);
            localStorage.setItem('username', this.username);
            this.auth.runVerify();
            this.success = true;
            this._router.navigateByUrl('/home');
        });
    }
    
    constructor(_rest: RestService, _auth: AuthenticateService, private location: Location, private _router: Router) {
        this.rest = _rest;
        this.auth = _auth;
        this.username = "";
        this.password = "";
        this.success = false;
        
    }
}
interface Login {
    Username: string;
    Pass: string;
}
