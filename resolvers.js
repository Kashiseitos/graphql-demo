import { books, authors } from "./data.js";

export const resolvers = {
  Query: {
    books: () => books,
    book: (_parent, { id }) => books.find((b) => b.id === id),
    authors: () => authors,
  },
  Mutation: {
    addBook: (_parent, { title, year, authorId }) => {
      const newBook = {
        id: String(books.length + 1),
        title,
        year,
        authorId,
      };
      books.push(newBook);
      return newBook;
    },
  },
  // Relaciones entre libros y autores
  Book: {
    author: (book) => authors.find((a) => a.id === book.authorId),
  },
  Author: {
    books: (author) => books.filter((b) => b.authorId === author.id),
  },
};
