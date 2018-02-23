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

  @action addNewBook(book: Book) {
    if (!book) {
      return;
    }
    this.booksList.unshift(book);
  }

  @action editBook(bookIndex: number, book: Book) {
    if (!book || this.booksList.length < bookIndex) {
      return;
    }
    this.booksList[bookIndex] = book;
  }

  @action deleteBook(bookIndex: number): void {
    if (this.booksList.length > bookIndex) {
      this.booksList.splice(bookIndex, 1);
    }
  }
}
