import { Book } from './../classes/book';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {computed, observable, action, runInAction} from 'mobx';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Ibook} from '../interfaces/book.interface';


@Injectable()
export class BooksStore {

  @observable booksList: Book[];

  constructor(private http: HttpClient) {
  }

  /**
   * Computed books list.
   * @returns {Observable<Book[]>}
   */
  @computed get books() {
    if (!this.booksList) {
        this.fetchBooksList();
    }
    return this.booksList;
  }

  /**
   Fetch book list from remote server.
   Map response to be with 'book' objects.
   onSuccess, store data in bookList.
   onFailure, store an empty list in bookList.
  **/
  @action
  async fetchBooksList() {
      try {
          this.http.get('/assets/books.json')
          .map(books => (<Ibook[]>books).map(book => new Book(
            book['title'], book['author'], book['date'])))
            .toPromise()
            .then(books => {
              runInAction(() => {
                this.booksList = books;
              });
            }, err => {
              runInAction(() => {
                this.booksList = [];
              });
            });

      } catch (error) {
          runInAction(() => {
              this.booksList = [];
          });
      }
  }

  /**
  Add new book to bookList array.
  Will add it to the begining of the list.
  **/
  @action addNewBook(book: Book) {
    if (!book) {
      return;
    }
    this.booksList.unshift(book);
  }

  /**
  Update exiting book with new data.
  overide bookList in given index with  new book data.
  **/
  @action editBook(bookIndex: number, book: Book) {
    if (!book) {
      return;
    }
    this.booksList[bookIndex] = book;
  }

  /**
  Delete book by it's index in bookList array.
  **/
  @action deleteBook(bookIndex: number): void {
      this.booksList.splice(bookIndex, 1);
  }
}
