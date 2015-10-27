/**
 * Created by lorho_j on 26/10/15.
 */
var BookModel = (function () {
    function BookModel(name, author) {
        this.name = "";
        this.author = "";
        this.name = name;
        this.author = author;
    }
    return BookModel;
})();
exports.BookModel = BookModel;
var Book = (function () {
    function Book() {
        this.books = [];
        this.books.push(new BookModel("Livre 1", "Auteur 1"));
        this.books.push(new BookModel("Livre 2", "Auteur 2"));
        this.books.push(new BookModel("Livre 3", "Auteur 3"));
        this.books.push(new BookModel("Livre 4", "Auteur 4"));
        this.books.push(new BookModel("Livre 5", "Auteur 5"));
    }
    return Book;
})();
exports.Book = Book;
//# sourceMappingURL=serviceBook.js.map