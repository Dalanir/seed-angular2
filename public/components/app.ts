import {Component, View} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';
import {Home} from './home/home';
import {ListBooks} from './listBooks/listBooks';

@Component({
    selector: 'app'
})

@View({
    directives: [RouterOutlet, RouterLink],
    template: `
        <section class="evolt-app">
            <h1>{{title}}</h1>
            <nav>
                <ul>
                    <li><a [router-link]="['/Home']">Home</a></li>
                    <li><a [router-link]="['/ListBooks']">Page1</a></li>
                </ul>
            </nav>
            <router-outlet></router-outlet>
        </section>
    `
})

@RouteConfig([
    { path: '/', redirectTo: '/home' },
    { path: '/home', as: 'Home', component: Home},
    { path: '/list-books', as: 'ListBooks', component: ListBooks }
])

export class App {
    title: string;
    constructor() {
        this.title = 'App Seed Angular2';
    }
}