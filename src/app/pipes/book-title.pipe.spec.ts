import { BookTitlePipe } from './book-title.pipe';

describe('BookTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new BookTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
