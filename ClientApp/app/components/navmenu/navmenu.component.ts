import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    rest: RestService;
    auth: AuthenticateService;
    public isCollapsed: boolean = true;

    constructor(_rest: RestService, _auth: AuthenticateService, private _router: Router) {
        this.rest = _rest;
        this.auth = _auth;
    }
    logout() {
        this.auth.logout();
        this._router.navigateByUrl('/home');
    }
    
}
