import { Book } from './../classes/book';
import { BooksStore } from './books.store';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormValidetorsService {

  private static bookStore: any;
  constructor(bookStore: BooksStore) {
    FormValidetorsService.bookStore = bookStore;
   }


  /**
   * Validate that given book title does not exist
   * in book list state. Book title must be unique.
   * @param control
   */
  public uniqueBookTitle(currentBookName: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (currentBookName !== control.value && FormValidetorsService.bookStore.booksList
        .find(book => book['title'] === control.value)) {
        return {uniqueBookTitle: true};
      }
      return null;
    };
  }

}
