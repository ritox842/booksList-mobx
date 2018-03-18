import { EditBookComponent } from './components/edit-book/edit-book.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Book } from './classes/book';
import { Observable } from 'rxjs/Observable';
import { Component, ViewChildren, state, keyframes, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import {BooksStore} from './providers/books.store';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {

  bookColorArray: string[] = ['A600A6', 'E40045', '530FAD', 'CCF600', 'D235D2', 'F13C73', '8243D6', 'DAFB3F',
                              '0A67A3', '7277D8', '00B25C', '00733C', '218555', 'FF8E00', 'FFAA40', 'FFC173'];

 dialogRef: MatDialogRef<any>;
 dialogRefSubscriber$: Subscription;

  constructor(public booksStore: BooksStore,
              private dialog: MatDialog) {

  }

  /**
   Open dialog witch user can add new book.
   On dialog close event, if needed, add new book
   data to state.
  **/
  addBook(): void {
    this.dialogRef = this.dialog.open(EditBookComponent, {
      width: '25em',
      data: {
        dialogTitle: 'Add new book',
        actionButton: 'Add book'
      }
  });

  this.dialogRefSubscriber$ = this.dialogRef.afterClosed()
  .subscribe(result => {
    if (!result) {
      return;
    }
    this.booksStore.addNewBook(result); // Add new book data to store.
  });
  }

  ngOnDestroy() {
    if (this.dialogRefSubscriber$) {
      this.dialogRefSubscriber$.unsubscribe();
  }
}

}
