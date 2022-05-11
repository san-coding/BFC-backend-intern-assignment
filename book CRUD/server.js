const express = require("express");
const randomId = require("random-id");
const app = express(),
  bodyParser = require("body-parser"),
  fs = require("fs"),
  port = process.env.PORT || 3080;

const books = require("./book");
const authors = require("./author");
// place holder for the data

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(`<h1>Following routes are defined </h1>
  <ul>
  <li>GET LIST OF AUTHORS /api/authors</li>
    <li>GET LIST OF BOOKS /api/books</li>
    <li>GET LIST OF BOOKS BY AUTHORID/api/authors/id</li>
    <li>POST add a new author /api/authors</li>  
    <li>POST add a new book /api/books</li>
    <li>Update author /api/authors/update/:id</li>
    <li> Update book /api/books/update/:id</li>
    </ul>`);
});

// get list of authors
app.get("/api/authors", (req, res) => {
  res.send(authors);
});

// get list of books
app.get("/api/books", (req, res) => {
  res.send(books);
});

// get books by author id
app.get("/api/authors/id", (req, res) => {
  const authorId = req.query.id;
  const authorBooks = [];
  books.forEach((book) => {
    if (book.author_id == authorId) {
      authorBooks.push(book);
    }
  });
  // sort the books by publication_year
  authorBooks.sort((a, b) => {
    return a.publication_year - b.publication_year;
  });
  console.log(authorBooks);
  res.send(authorBooks);
});

// route to add a new author
app.post("/api/authors", (req, res) => {
  const newAuthor = req.body;
  // generate a random id int
  newAuthor.id = Math.floor(Math.random() * 1000000);

  newAuthor.books_ids = [];
  newAuthor.author_name = req.body.author_name;
  authors.push(newAuthor);
  res.send(newAuthor);
});

// route to add a new book
app.post("/api/books", (req, res) => {
  const newBook = req.body;
  newBook.id = Math.floor(Math.random() * 1000000);
  newBook.author_id = req.body.author_id;
  newBook.book_name = req.body.book_name;
  newBook.publication_year = req.body.publication_year;
  newBook.type = req.body.type;
  books.push(newBook);
  // editing the author's books_ids
  authors.forEach((author) => {
    if (author.id == newBook.author_id) {
      author.books_ids.push(newBook.id);
    }
  });

  res.send(books);
});

// update author
app.put("/api/authors/update/:id", (req, res) => {
  const authorId = req.params.id;
  const author = authors.find((author) => author.id == authorId);
  if (author) {
    author.author_name = req.body.author_name;
    res.send(author);
  } else {
    res.sendStatus(404);
  }
});

// update book
app.put("/api/books/update/:id", (req, res) => {
  const bookId = req.params.id;
  const book = books.find((book) => book.id == bookId);
  if (book) {
    book.book_name = req.body.book_name;
    book.publication_year = req.body.publication_year;
    book.type = req.body.type;

    res.send(book);
  } else {
    res.sendStatus(404);
  }
});

// Delete a book
app.delete("/api/books/delete/:id", (req, res) => {
  const bookId = req.params.id;
  const book = books.find((book) => book.id == bookId);
  if (book) {
    books.splice(books.indexOf(book), 1);
  } else {
    res.sendStatus(404);
  }
  // deleting the book from the author's books_ids
  authors.forEach((author) => {
    if (author.id == book.author_id) {
      author.books_ids.splice(author.books_ids.indexOf(book.id), 1);
    }
  });
  res.send(books);
});

// Delete an author
app.delete("/api/authors/delete/:id", (req, res) => {
  const authorId = req.params.id;
  const author = authors.find((author) => author.id == authorId);
  if (author) {
    authors.splice(authors.indexOf(author), 1);
  } else {
    res.sendStatus(404);
  }
  res.send(authors);
});

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});
