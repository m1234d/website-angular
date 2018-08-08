import { Component, OnInit, Input } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { RestService } from '../../services/rest.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
    public auth: AuthenticateService;
    public list: string[];
    public rest: RestService;
    public newTodo: string;
    constructor(_auth: AuthenticateService, _rest: RestService) {
        this.auth = _auth;
        this.rest = _rest;
    }
    //called when page loads
    ngOnInit() {
        this.auth.runVerify();
        this.list = [];
        //if (this.auth.storage.logged_in == true) {
        //    this.loadUser();
        //}
        this.auth.watchLogin().subscribe(result => {
            if (result == true) {
                this.loadUser();
            }
        });
    }
    loadUser() {
        this.getList();
    }
    getList() {  
        console.log(this.auth.storage.username);
        this.rest.post('api/user/GetTodo', [this.auth.storage.username]).subscribe(result => {
            this.list = result as string[];
        })
    }
    addToList(newStr: string) {

        this.rest.post('api/user/SetTodo', [this.auth.storage.username, newStr]).subscribe(result => {
            console.log(result);
            (<HTMLInputElement>document.getElementById("newBoxID")).value = "";
            this.getList();
        })
    }
    remove(event: any) {
        console.log(event.target.id);
        this.rest.post('api/user/RemoveTodo', [this.auth.storage.username, event.target.textContent]).subscribe(result => {
            console.log("Element removed: " + result);
            this.getList();
        })
    }
}
