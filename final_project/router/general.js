const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let showBook = new Promise((resolve, reject) =>{
  res.send(JSON.stringify(books,null,4));
  })
  //if promise completes
  showBook.then(() => console.log("Promise to display books is done(task 10)"));
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let showBookIsbn = new Promise((resolve, reject) =>{
    const isbn = req.params.isbn;
     res.send(books[isbn]);
  })
  showBookIsbn.then(() => console.log("Promise to display books via isbn is done(task 11)"));
 // return res.status(300).json({message: "Yet to be implemented1"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let showBookAuthor = new Promise((resolve, reject) =>{
     let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
        if(books[isbn]["author"] === req.params.author) {
          booksbyauthor.push({"isbn":isbn,
                             "author":books[isbn]["author"],
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
        }
    })
    showBookAuthor.then(() => console.log("Promise to display books via author is done(task 12)"));
  });
  res.send(JSON.stringify({booksbyauthor}, null, 4));
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let showBookTitle = new Promise((resolve, reject) =>{
    let booksbytitle = [];
    let isbns = Object.keys(books);
     isbns.forEach((isbn) => {
      if(books[isbn]["title"] === req.params.title) {
          booksbytitle.push({"isbn":isbn,
                           "author":books[isbn]["author"],
                           "title":books[isbn]["title"],
                              "reviews":books[isbn]["reviews"]});
      }
    })
    showBookTitle.then(() => console.log("Promise to display books via title is done(task 13)"));
    });
    res.send(JSON.stringify({booksbytitle}, null, 4));
 // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"]);

 // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;