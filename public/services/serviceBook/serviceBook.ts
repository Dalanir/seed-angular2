/**
 * Created by lorho_j on 26/10/15.
 */

export class BookModel {
    name: string = '';
    author: string = '';

    constructor(name: string, author: string) {
        this.name = name;
        this.author = author;
    }
}

export class Book {
    books: BookModel[] = [];

    constructor() {
        this.books.push(new BookModel('Livre 1', 'Auteur 1'));
        this.books.push(new BookModel('Livre 2', 'Auteur 2'));
        this.books.push(new BookModel('Livre 3', 'Auteur 3'));
        this.books.push(new BookModel('Livre 4', 'Auteur 4'));
        this.books.push(new BookModel('Livre 5', 'Auteur 5'));
    }
}