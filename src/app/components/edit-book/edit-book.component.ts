import { BooksStore } from './../../providers/books.store';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Book } from '../../classes/book';
import { FormValidetorsService } from '../../providers/form-validetors.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  dialogTitle: string;
  actionButtonText: string;
  editBookForm: FormGroup;
  bookTitle: string;
  bookAuthor: string;
  bookDate: Date;

  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date();

  constructor(private formBuilder: FormBuilder,
              private formValidetors: FormValidetorsService,
              private dialogRef: MatDialogRef<EditBookComponent>,
              @Inject(MAT_DIALOG_DATA) dialogData: any) {
                this.dialogTitle = dialogData['dialogTitle'];
                this.actionButtonText = dialogData['actionButton'];

                if (dialogData['book']) {
                  const book: any = dialogData['book'];
                  this.bookTitle = book['bookTitle'];
                  this.bookAuthor = book['bookAuthor'];
                  this.bookDate = new Date(book['bookDate'] * 1000);
                }
               }

  ngOnInit() {
    this.initForm();
  }

  /**
   *Init edit book form.
  */
  private initForm(): void {
    this.editBookForm = this.formBuilder.group({
      bookTitleControl: [this.bookTitle, Validators.compose([Validators.required, this.formValidetors.uniqueBookTitle()])],
      bookAuthorControl: [this.bookAuthor, Validators.compose([Validators.required])],
      bookDateControl: [this.bookDate, Validators.compose([Validators.required])]
    });
  }

  /**
   * Close this dialog without saving
   * new book data.
  */
  private discardChanges(): void {
    this.dialogRef.close();
  }

  /**
   * Save edit book changes.
   * Emit new book data to state and close
   * this dialog.
  */
  private saveChanges(): void {
    if (!this.editBookForm.valid) {
      return;
    }
    this.dialogRef.close(new Book(this.bookTitle, this.bookAuthor, this.bookDate.getTime()));
  }

}
