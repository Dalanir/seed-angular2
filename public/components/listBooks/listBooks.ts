import {Component, View, NgFor} from 'angular2/angular2';
import {Book} from '../../services/serviceBook/serviceBook';

@Component({
    selector: 'list-books'
})

@View({
    directives: [NgFor],
    template: `
        <div>
            <ul>
                <li *ng-for="#book of bookService.books">
                    <span>{{book.name}} - {{book.author}}</span>
                </li>
            </ul>
        </div>
    `
})

export class ListBooks {

    constructor(public bookService: Book) {
        console.log(this.bookService);
    }
}