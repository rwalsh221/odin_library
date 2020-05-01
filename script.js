let log = console.log

let myLibrary = [];

let bookArray = 0

function book (id, title, author, pages, haveRead) {
    this.id = id
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.haveRead = haveRead,
    this.report = function() {
        let returnReport = (`${this.title} by ${this.author} has ${this.pages} pages and ${this.haveRead}`);
        return returnReport;
    }
}

const newBook1 = new book('The Bible', 'Jesus', '510', 'it has not been read');
console.log(newBook1.report());


let addBookToLibrary = function () {
  
  let id, title, author, pages, haveRead;

  if (myLibrary.length > 0) {
    id = myLibrary[myLibrary.length -1].id + 1
  } else {
    id = 0
  }

  console.log(id)
  
  title = document.getElementById('b-title').value;
  author = document.getElementById('b-author').value;
  pages = document.getElementById('b-pages').value

  

  let newBook = new book(id, title, author, pages);
  myLibrary.push(newBook);
  document.forms[0].reset()
  render();
}

let render = function () {
  
 let html = '<div class="book" id="id-%id%"> <button class="btn btn__delete" id="btn__delete">delete</button> <h2 class="book__header">BOOK TITLE: <span id="book-info__title-%num%"></span></h2> <h3 class="book__author">BOOK AUTHOR: <span id="book-info__author-%num%"></span></h3> <h3 class="book__pages">NUMBER OF PAGES: <span id="book-info__pages-%num%"></span></h3> <h3 class="book__read">BOOK HAS BEEN READ?: <span id="book-info__read-%num%"></span></h3> </div>'

 const parent = document.getElementById('book__card');

 while(parent.firstChild) {
   parent.firstChild.remove();
 }
  
  for (i = 0; i < myLibrary.length; i++) {
    let newHtml = html.replace('%id%', myLibrary[i].id); 
    newHtml = newHtml.replace(/%num%/g, i)
    document.querySelector('.book__card').insertAdjacentHTML('beforeend', newHtml);

    let book = myLibrary[i];

    document.querySelector(`#book-info__title-${i}`).innerHTML = `${book.title}`
    document.querySelector(`#book-info__author-${i}`).innerHTML = `${book.author}`
    document.querySelector(`#book-info__pages-${i}`).innerHTML = `${book.pages}`
    document.querySelector(`#book-info__read-${i}`).innerHTML = `${book.haveRead}`
  }
}

let deleteBook = function(event) {
  let bookID, dBook;
  console.log('work1');
  bookID = event.target.parentNode.id
  console.log('work2');
  console.log(bookID);
  console.log('work3');
  dBook = document.getElementById(bookID);
  console.log(dBook.parentNode)
  document.getElementById(bookID).parentNode.removeChild(document.getElementById(bookID));
  console.log('work4');

}




let openForm = function() {
  document.getElementById('book-form').style.display = 'inline-block'
  document.getElementById('body__blur').style.filter = 'blur(60px)'
}

let closeForm = function() {
  document.getElementById('book-form').style.display = 'none'
  document.getElementById('body__blur').style.filter = 'blur(0px)'
}

document.getElementById('btn__form').addEventListener('click', openForm);
document.getElementById('btn__close').addEventListener('click', closeForm);
document.getElementById('btn__add').addEventListener('click', addBookToLibrary);
document.querySelector('.container').addEventListener('click', deleteBook);





const testString = ('id-55565456564');
let testSplit = testString.split("-")
console.log(testSplit);





// NOTES **************************************************************************************************************

// let render = function () {
//   for (i = 0; i < myLibrary.length; i++) {
//     let book = myLibrary[i]
//     log(myLibrary[i]) 
//     document.querySelector(`#book-info__${i+1}`).innerHTML = `${book.title}`
//     document.querySelector(`#book-info__${i+2}`).innerHTML = `${book.author}`
//     document.querySelector(`#book-info__${i+3}`).innerHTML = `${book.pages}`
//     document.querySelector(`#book-info__${i+4}`).innerHTML = `${book.haveRead}`
    
//     // document.querySelector('#main').innerHTML = book.author
//   }
// }

// addBookToLibrary('bible', 'jesus','500','no');
// addBookToLibrary('got', 'test6','test7','test8');
// addBookToLibrary('lotr', 'test10','test11','test12');
// addBookToLibrary('got', 'test6','test7','test8');