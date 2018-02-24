import { BooksStore } from './../../providers/books.store';
import { DeleteBookComponent } from './../delete-book/delete-book.component';
import { EditBookComponent } from './../edit-book/edit-book.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Component, Input, OnInit, HostBinding, OnDestroy } from '@angular/core';

import { Book } from './../../classes/book';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit, OnDestroy {

  @HostBinding('style.flexBasis') flexBasis = Math.floor(Math.random() * (40 - 10) ) + 10 + '%';

  @Input() book: Book;
  @Input() bookIndex: number;
  @Input()
  set bookColorArray(bookColorArray: string[]) {
    this.bookBackgroundColor = bookColorArray[Math.floor(Math.random() * bookColorArray.length)];
  }

  bookBackgroundColor: string;
  dialogRef: MatDialogRef<any>;
  dialogRefSubscriber$: Subscription;

  constructor(private dialog: MatDialog,
              private bookStore: BooksStore) { }

  ngOnInit() {
  }

  /**
   *Open edit book dialog.
   *Pass mendatory data for the edit proccess.
  */
  public editBook(): void {
    this.dialogRef = this.dialog.open(EditBookComponent, {
        width: '25em',
      data: {
        dialogTitle: 'Edit book',
        actionButton: 'Save changes',
        book: {
         bookTitle: this.book['title'],
         bookAuthor: this.book['author'],
         bookDate: this.book['date']
          }
        }
    });

    this.dialogRefSubscriber$ = this.dialogRef.afterClosed()
    .subscribe(result => {
      if (!result) {
        return;
      }
      this.bookStore.editBook(this.bookIndex, result); // Send new book data to store.
    });
  }
  /**
   *Open remove book dialog.
   Pass mandatory date for the delete proccess.
  */
  public removeBook(): void {
    this.dialogRef = this.dialog.open(DeleteBookComponent, {
      width: '25em',
    data: {
       bookTitle: this.book['title'],
       bookAuthor: this.book['author'],
       bookIndex: this.bookIndex
        }
  });

  }

  ngOnDestroy(): void {
    if (this.dialogRefSubscriber$) {
          this.dialogRefSubscriber$.unsubscribe();
   }
  }

}
