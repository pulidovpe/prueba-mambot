const Borrow = require('../models/borrow');
const Book = require('../models/book');

async function getBorrows(req,res) {
   try {
      const borrows = await Borrow.find({}).populate([
         {path: 'user_id', model: 'User'},
         {path: 'book_id', model: 'Book'}
      ]).exec((err, brws) => {
         // console.log("Populated Borrows " + brws);
         if(err || brws === undefined) res.status(404).send({ error: 'Something failed. Not found!' });
         else res.json(brws);
      });
   } catch(err) {
      res.status(500).send({ error: 'Something failed in Database!' });
   }
}

async function getBorrow(req,res) {
   try {
      const id = req.params.id;
      const user = await Borrow.findOne({id}).populate([
         {path: 'user_id', model: 'User'},
         {path: 'book_id', model: 'Book'}
      ]).exec((err, brws) => {
         // console.log("Populated Borrows " + brws);
         if(err || brws === undefined) res.status(404).send({ error: 'Something failed. Not found!' });
         else res.json(brws);
      });
   } catch(err) {
      res.status(404).send({ error: 'Something failed. Not found!' });     
   }
}
// borrow a book
async function saveBorrow(req,res) {
   try {
      const { user_id, book_id } = req.body;      
      const newBorrow = new Borrow({ user_id, book_id });
      await newBorrow.save()
      .then(async () => {
         await Book.findByIdAndUpdate(book_id, {state: 'inactive'})
         .exec((err) => {
            if(err) res.status(404).send({ error: 'Something failed. Not found!' });
            else {
               console.log(JSON.stringify(newBorrow));
               res.status(200).send({ status: 'Borrow created' });
            }
         });
      });
   } catch(err) {
      //console.error(err);
      res.status(500).send({ error: 'Something failed. Nothing saved!' });
   }
}
// return a book
async function updateBorrow(req,res) {
   try {
      const { id, book_id } = req.params;
      const today = new Date();
      console.log(`Params Date: ${today}`);
      const updBorrow = { date_due: today, state: 'expired' };
      await Borrow.findByIdAndUpdate(id, updBorrow)
      .then(async () => {
         await Book.findByIdAndUpdate(book_id, {state: 'active'})
         .exec((err, book) => {
            if(err || book === undefined) res.status(404).send({ error: 'Something failed. Not updated!' });
            else {
               console.log(JSON.stringify(updBorrow));
               res.status(200).send({ status: 'Borrow updated' });
            }
         });
      });
   } catch(err) {
      res.status(500).send({ error: 'Something failed. Nothing saved!' });
   }
}

async function deleteBorrow(req,res) {
   try {
      const id = req.params.id;
      await Borrow.findByIdAndRemove(id);
      res.status(200).send({ status: 'Borrow deleted' });
   } catch (err) {
      res.status(400).send({ error: 'Something failed. Nothing deleted!' });
   }
}

module.exports = {
   getBorrow,
   getBorrows,
   saveBorrow,
   updateBorrow,
   deleteBorrow
}