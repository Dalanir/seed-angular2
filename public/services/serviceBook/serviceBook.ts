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
        this.books.push(new BookModel('Book 1', 'Author 1'));
        this.books.push(new BookModel('Book 2', 'Author 2'));
        this.books.push(new BookModel('Book 3', 'Author 3'));
        this.books.push(new BookModel('Book 4', 'Author 4'));
        this.books.push(new BookModel('Book 5', 'Author 5'));
    }
}