const Book = require('../models/book');

async function getBook(req,res) {
   try {
      const id = req.params.id;
      const book = await Book.findById(id);
      console.log(JSON.stringify(book));
      res.status(200).send({
         data: book,
      });
   } catch (err) {
      res.status(400).send({ error: 'Something failed. Not found!' });
   }
}

async function getBooks(req,res) {
   try {
      const books = await Book.find();
      res.json(books);
   } catch(err) {
      res.status(500).send({ error: 'Something failed. Nothing in Database!' });
   }
}

async function saveBook(req,res) {
   try {
      const {title,author,editorial,language,state} = req.body;
      const newBook = new Book({title,author,editorial,language,state});      
      await newBook.save();
      console.log(JSON.stringify(newBook));
      res.status(200).send({ status: 'Book saved' });
   } catch(err) {
      //console.error(err);
      res.status(500).send({ error: 'Something failed. Nothing saved!' });
   }
}

async function updateBook(req,res) {
   try {
      const id = req.params.id;
      const {title,author,editorial,language,state} = req.body;
      const updBook = {title,author,editorial,language,state};
      await Book.findByIdAndUpdate(id, updBook);
      console.log(JSON.stringify(updBook));
      res.status(200).send({ status: 'Book updated' });
   } catch(err) {
      res.status(400).send({ error: 'Something failed. Nothing saved!' });
   }
}

async function deleteBook(req,res) {
   try {
      const id = req.params.id;
      await Book.findByIdAndRemove(id);
      res.status(200).send({ status: 'Book deleted' });
   } catch (err) {
      res.status(400).send({ error: 'Something failed. Nothing deleted!' });
   }
}

module.exports = {
   getBook,
   getBooks,
   saveBook,
   updateBook,
   deleteBook
}