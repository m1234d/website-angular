import { Component } from '@angular/core';
import { RestService } from '../../services/rest.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent {
    public rest: RestService;
    public username: string;
    public password: string;
    public success: boolean;
    signup() {
        let user = { Username: this.username, Pass: this.password };
        console.log(user);
        this.rest.post<Login>('api/User/CreateAccount', user).subscribe(result => {
            console.log(result);
            this.success = result as boolean;
        });
    }

    constructor(_rest: RestService) {
        this.rest = _rest;
        this.username = "";
        this.password = "";
        this.success = false;

    }
}
interface Login {
    Username: string;
    Pass: string;
}
