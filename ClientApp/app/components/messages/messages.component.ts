import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {

    constructor(private rest: RestService, private auth: AuthenticateService) { }
    public messages: Message[];
    public toBox: string;
    public msgBox: string;
    ngOnInit() {
        this.auth.runVerify();
        this.getMessages();
        this.auth.watchLogin().subscribe(result => {
            if (result == true) {
                this.getMessages();
            }
        });
    }
    getMessages() {
        let user = this.auth.storage.username;
        this.rest.post('api/User/GetMessages', [user, ""]).subscribe(result => {
            this.messages = result as Message[];
            console.log("Received messages")
        });

    }
    clearMessages() {
        let user = this.auth.storage.username;
        this.rest.post('api/user/ClearMessages', [user, ""]).subscribe(result => {
            console.log("Messages cleared");
            this.getMessages();
            return true;
        });
    }
    sendMessage(to: string, msg: string) {
        let from = this.auth.storage.username;
        this.rest.post<Message>('api/User/SendMessage', { to: to, from: from, msg: msg }).subscribe(result => {
            (<HTMLInputElement>document.getElementById("toId")).value = "";
            (<HTMLInputElement>document.getElementById("msgId")).value = "";
            this.getMessages();
        });
    }
}
interface Message {
    id?: number;
    from: string;
    to: string;
    msg: string;
}
