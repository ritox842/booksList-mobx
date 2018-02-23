import { BooksStore } from './../../providers/books.store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {

  bookTitle: string;
  bookAuthor: string;
  bookIndex: number;

  constructor(private dialogRef: MatDialogRef<DeleteBookComponent>,
    private booksStore: BooksStore,
    @Inject(MAT_DIALOG_DATA) dialogData: any) {
      this.bookTitle = dialogData['bookTitle'];
      this.bookAuthor = dialogData['bookAuthor'];
      this.bookIndex = dialogData['bookIndex'];
     }

  ngOnInit() {
  }


  /**
   * Close delte book dialog component
   * without deleting the book
  */
  cancelDelete(): void {
    this.dialogRef.close();
  }

  /**
   *Delete book by its index and close
   this dialog.
  */
  deleteBook(): void {
    this.booksStore.deleteBook(this.bookIndex);
    this.dialogRef.close();
  }

}
