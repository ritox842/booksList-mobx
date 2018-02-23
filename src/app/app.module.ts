import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { MobxAngularModule } from 'mobx-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {PROVIDERS, COMPONENTS, PIPES} from './index';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule, MatDialogModule, MatFormFieldModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material';
import { BookComponent } from './components/book/book.component';
import { BookTitlePipe } from './pipes/book-title.pipe';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    DeleteBookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MobxAngularModule
  ],
  providers: [
    ...PROVIDERS,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditBookComponent,
    DeleteBookComponent
  ]
})
export class AppModule {
}
