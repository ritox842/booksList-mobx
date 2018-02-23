import { FormValidetorsService } from './providers/form-validetors.service';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { BookTitlePipe } from './pipes/book-title.pipe';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import {BooksStore} from './providers/books.store';

export const PROVIDERS = [
  BooksStore,
  FormValidetorsService
];

export const COMPONENTS = [
  AppComponent,
  BookComponent,
  BookTitlePipe,
  EditBookComponent,
  DeleteBookComponent
];

export const PIPES = [
  BookTitlePipe
];


