import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'home'
})

@View({
    template: `
        <main>
            <h1>{{welcome}}</h1>
        </main>
    `
})

export class Home {
    welcome: string;

    constructor() {
        this.welcome = 'Welcome home bro !';
    }
}