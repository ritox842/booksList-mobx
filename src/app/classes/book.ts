import {Ibook} from '../interfaces/book.interface';

export class Book implements Ibook {

  title: string;
  author: string;
  date: number;

  constructor(title: string, author: string, date: number) {
    this.title = title;
    this.author = author;
    this.date = date;
  }
}
