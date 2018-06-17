import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RestService } from '../../services/rest.service';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public logins: Login[];

    constructor(rest: RestService) {
        rest.get('api/User/GetUsers').subscribe(result => {
            this.logins = result as Login[];
        })
    }
}

interface Login {
    Username: string;
    Pass: string;
    Userhash: string;
    Passhash: string;
}
