let log = console.log

let myLibrary = [];

function book (title, author, pages, haveRead) {
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


let addBookToLibrary = function (title, author, pages, haveRead) {
  let newBook = new book(title, author, pages, haveRead);
  myLibrary.push(newBook);
}

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

let render = function () {
  
 let html = '<div class="book"> <h2 class="book__header">BOOK TITLE: <span id="book-info__title-%id%"></span></h2> <h3 class="book__author">BOOK AUTHOR: <span id="book-info__author-%id%"></span></h3> <h3 class="book__pages">NUMBER OF PAGES: <span id="book-info__pages-%id%"></span></h3> <h3 class="book__read">BOOK HAS BEEN READ?: <span id="book-info__read-%id%"></span></h3> </div>'

  
  for (i = 0; i < myLibrary.length; i++) {
    let newHtml = html.replace(/%id%/g, i)
    document.querySelector('.book__card').insertAdjacentHTML('beforeend', newHtml);

    let book = myLibrary[i];

    document.querySelector(`#book-info__title-${i}`).innerHTML = `${book.title}`
    document.querySelector(`#book-info__author-${i}`).innerHTML = `${book.author}`
    document.querySelector(`#book-info__pages-${i}`).innerHTML = `${book.pages}`
    document.querySelector(`#book-info__read-${i}`).innerHTML = `${book.haveRead}`
  }
}

addBookToLibrary('bible', 'jesus','500','no');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('lotr', 'test10','test11','test12');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('bible', 'jesus','500','no');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('lotr', 'test10','test11','test12');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('bible', 'jesus','500','no');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('lotr', 'test10','test11','test12');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('bible', 'jesus','500','no');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('lotr', 'test10','test11','test12');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('got', 'test6','test7','test8');
addBookToLibrary('got', 'test6','test7','test8');





log(myLibrary);

log('working');
render();