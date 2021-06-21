// *************************************************************************************************
// CHANGED DIVS CONTAINERS FROM BTNS FOR CSS STYLE. NEED TO CHANGE NODES ON ID SELECTORS TO GET THEM TO WORK. SEE HTML
// CHANGED HTML. NEED TO CHANGE HTML FOR RENDER FUNCTION. ADDED LINE DIV AND REMOVED SOME ON BUTTONS
// **************************************************************************************************

let log = console.log;

let myLibrary = [];

let bookArray = 0;

function book(id, title, author, pages, status) {
  this.id = id;
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.status = status),
    (this.report = function () {
      let returnReport = `${this.title} by ${this.author} has ${this.pages} pages and ${this.status}`;
      return returnReport;
    });
}

// const newBook1 = new book('The Bible', 'Jesus', '510', 'it has not been read');
// console.log(newBook1.report());

let addBookToLibrary = function () {
  let id, title, author, pages, status;

  if (myLibrary.length > 0) {
    id = myLibrary[myLibrary.length - 1].id + 1;
  } else {
    id = 0;
  }

  console.log(id);

  title = document.getElementById('b-title').value;
  author = document.getElementById('b-author').value;
  pages = document.getElementById('b-pages').value;

  if (document.getElementById('radio-yes').checked === true) {
    status = 'Avaliable';
  } else if (document.getElementById('radio-no').checked === true) {
    status = 'Unavaliable';
  }

  let newBook = new book(id, title, author, pages, status);
  myLibrary.push(newBook);
  document.forms[0].reset();
  log(myLibrary);
  render();
};

let render = function () {
  //  let html = '<div class="book" id="bookid-%id%"> <div> <button class="btn btn__delete" id="btn__delete">delete</button> </div> <h2 class="book__header">BOOK TITLE: <span id="book-info__title-%num%"></span></h2> <h3 class="book__author">BOOK AUTHOR: <span id="book-info__author-%num%"></span></h3> <h3 class="book__pages">NUMBER OF PAGES: <span id="book-info__pages-%num%"></span></h3> <h3 class="book__read">BOOK HAS BEEN READ?: <span id="book-info__read-%num%"></span></h3> <div> <button class="btn btn__read" id="btn__read-yes">read yes</button> </div> <div> <button class="btn btn__read" id="btn__read-no">read no</button> </div> </div>'
  let html = `<div class="book" id="bookid-%id%"> <div> <button class="btn btn__delete" id="btn__delete">delete</button> </div> <div class="line line-long"></div> <h3 class="book__header">BOOK TITLE: <span id="book-info__title-%num%">FONT TEST</span></h3> <div class="line"></div> <h4 class="book__author">BOOK AUTHOR: <span id="book-info__author-%num%">FONT TEST</span></h4> <div class="line"></div> <h4 class="book__pages">NUMBER OF PAGES: <span id="book-info__pages-%num%">FONT TEST</span></h4> <div class="line"></div> <h4 class="book__read">STATUS: <span id="book-info__read-%num%"></span></h4> <div class="line line-long"></div> <div> <button class="btn btn__read" id="btn__read-yes">Avaliable</button>   <button class="btn btn__read" id="btn__read-no">Unavaliable</button> </div> </div>`;
  const parent = document.querySelector('.book__card');

  while (parent.firstChild) {
    parent.firstChild.remove();
  }

  for (i = 0; i < myLibrary.length; i++) {
    let newHtml = html.replace('%id%', myLibrary[i].id);
    newHtml = newHtml.replace(/%num%/g, i);
    document
      .querySelector('.book__card')
      .insertAdjacentHTML('beforeend', newHtml);

    let book = myLibrary[i];

    document.querySelector(
      `#book-info__title-${i}`
    ).innerHTML = `${book.title}`;
    document.querySelector(
      `#book-info__author-${i}`
    ).innerHTML = `${book.author}`;
    document.querySelector(
      `#book-info__pages-${i}`
    ).innerHTML = `${book.pages}`;
    document.querySelector(
      `#book-info__read-${i}`
    ).innerHTML = `${book.status}`;

    if (
      document.getElementById(`book-info__read-${i}`).textContent ==
      'Unavaliable'
    ) {
      document.getElementById(`bookid-${book.id}`).classList.add('book-NA');
      log(`book`);
    } else if (
      document.getElementById(`book-info__read-${i}`).textContent == 'Avaliable'
    ) {
      document.getElementById(`bookid-${book.id}`).classList.add('book-AV');
    }
  }

  numberOfBook();
};

let deleteBook = function (event) {
  let bookNodeID, dBook, libraryID, libraryIndex, bookID, splitBookID;
  // console.log('work1');
  bookNodeID = event.target.parentNode.parentNode.id;
  log(event.target.id);
  // console.log('work2');
  // console.log(bookID);
  // console.log('work3');

  // console.log(dBook.parentNode)

  // console.log('work4');

  // console.log(event.target.parentNode.parentNode.id);

  if (bookNodeID && event.target.id == 'btn__delete') {
    splitBookID = bookNodeID.split('-');
    bookID = parseInt(splitBookID[1]);
    dBook = document.getElementById(bookNodeID);
    dBook.parentNode.removeChild(document.getElementById(bookNodeID));
  }

  libraryID = myLibrary.map(function (current) {
    return current.id;
  });

  log(libraryID);

  libraryIndex = libraryID.indexOf(bookID);

  log(libraryIndex);

  if (libraryIndex !== -1) {
    myLibrary.splice(libraryIndex, 1);
  }

  log(myLibrary);
  let numBook = myLibrary.length;
  numberOfBook();
  render();
};

let openForm = function () {
  document.getElementById('book-form').style.display = 'inline-block';
  document.getElementById('body__blur').style.filter = 'blur(60px)';
};

let closeForm = function () {
  document.getElementById('book-form').style.display = 'none';
  document.getElementById('body__blur').style.filter = 'blur(0px)';
};

let numberOfBook = function () {
  let numBook = myLibrary.length;

  if (myLibrary.length > 0) {
    document.getElementById(
      'number__book'
    ).textContent = `The Library contains ${numBook} books`;
  } else {
    document.getElementById(
      'number__book'
    ).textContent = `The Library does not contain any books`;
  }
};

let changeStatus = function (event) {
  let bookNodeID, bookNodeYesNo, splitBookID, bookID, libraryID, libraryIndex;

  bookNodeID = event.target.parentNode.parentNode.id;

  log(bookNodeID);
  log('this is booknodeid for status');

  if (
    (bookNodeID && event.target.id == 'btn__read-yes') ||
    (bookNodeID && event.target.id == 'btn__read-no')
  ) {
    splitBookID = bookNodeID.split('-');
    bookID = parseInt(splitBookID[1]);
  }

  libraryID = myLibrary.map(function (current) {
    return current.id;
  });

  log(libraryID + ' this is library id');
  log(bookID + ' this is book id');

  libraryIndex = libraryID.indexOf(bookID);
  log(libraryIndex + ' this is library index');

  bookNodeYesNo = event.target.id;
  log(event.target.id);
  log(bookNodeYesNo + 'yesno');

  if (bookNodeYesNo == 'btn__read-yes') {
    document.getElementById(`book-info__read-${libraryIndex}`).textContent =
      'Avaliable';
    document.getElementById(`bookid-${bookID}`).style.boxShadow =
      '1rem 1rem 1rem black';

    document.getElementById(`bookid-${bookID}`).classList.remove('book-NA');
    document.getElementById(`bookid-${bookID}`).classList.add('book-AV');

    myLibrary[libraryIndex].status = 'Avaliable';
  } else if (bookNodeYesNo == 'btn__read-no') {
    document.getElementById(`book-info__read-${libraryIndex}`).textContent =
      'Unavaliable';
    document.getElementById(`bookid-${bookID}`).style.boxShadow =
      '1rem 1rem 1rem red';
    document.getElementById(`bookid-${bookID}`).classList.remove('book-AV');
    document.getElementById(`bookid-${bookID}`).classList.add('book-NA');

    myLibrary[libraryIndex].status = 'Unavaliable';
  }
};

const testpress = () => {
  console.log('btn-add press');
};

const testclose = () => {
  console.log('btn-close press');
};

document.getElementById('btn__form').addEventListener('click', openForm);
document.getElementById('btn__close').addEventListener('click', closeForm);
document.getElementById('btn__close').addEventListener('click', testclose);
document.getElementById('btn__add').addEventListener('click', testpress);
document.getElementById('btn__add').addEventListener('click', addBookToLibrary);
document.querySelector('.container').addEventListener('click', deleteBook);
document.querySelector('.container').addEventListener('click', changeStatus);

// const testString = ('id-55565456564');
// let testSplit = testString.split("-")
// console.log(testSplit);
numberOfBook();

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
