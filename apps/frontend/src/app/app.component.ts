import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    libraryOpened = false;

    constructor(private httpClient: HttpClient) {}

    testApi() {
        return this.httpClient.get('/api/testapi').subscribe(pach => console.log(pach));
    }
}
