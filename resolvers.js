import { books, authors } from "./data.js";

export const resolvers = {
  Query: {
    books: () => books,
    book: (_parent, { id }) => books.find((b) => b.id === id),
    authors: () => authors,
    author: (_parent, { id }) => authors.find((b) => b.id === id),
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
  // Estos resolvers "conectan" un tipo con el otro (relaciones)
  Book: {
    author: (book) => authors.find((a) => a.id === book.authorId),
  },
  Author: {
    books: (author) => books.filter((b) => b.authorId === author.id),
  },
};
