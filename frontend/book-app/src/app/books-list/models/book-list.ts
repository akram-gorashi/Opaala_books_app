import { Book } from "../../books/models/book";

export interface BookList {
  id: number;
  name: string;
  books: Book[];
}
