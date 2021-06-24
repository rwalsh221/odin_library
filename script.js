let myLibrary = [];

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

let addBookToLibrary = function () {
  let id, title, author, pages, status;

  if (myLibrary.length > 0) {
    id = myLibrary[myLibrary.length - 1].id + 1;
  } else {
    id = 0;
  }

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

  setLocalStorage('library', myLibrary);
  render();
};

let render = function () {
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

  bookNodeID = event.target.parentNode.parentNode.id;

  if (bookNodeID && event.target.id == 'btn__delete') {
    splitBookID = bookNodeID.split('-');
    bookID = parseInt(splitBookID[1]);
    dBook = document.getElementById(bookNodeID);
    dBook.parentNode.removeChild(document.getElementById(bookNodeID));
  }

  libraryID = myLibrary.map(function (current) {
    return current.id;
  });

  libraryIndex = libraryID.indexOf(bookID);

  if (libraryIndex !== -1) {
    myLibrary.splice(libraryIndex, 1);
  }

  setLocalStorage('library', myLibrary);

  render();
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
  // bookNodeID = event.target.parentNode.parentNode.id;
  if (event.target.id == 'btn__read-yes' || event.target.id == 'btn__read-no') {
    bookNodeID = event.target.parentNode.parentNode.id;

    splitBookID = bookNodeID.split('-');
    bookID = parseInt(splitBookID[1]);
  }

  libraryID = myLibrary.map(function (current) {
    return current.id;
  });

  libraryIndex = libraryID.indexOf(bookID);

  bookNodeYesNo = event.target.id;

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

// LOCAL STORAGE

const setLocalStorage = function (storeName, data) {
  localStorage.setItem(`${storeName}`, JSON.stringify(data));
};
const getLocalStorage = function (storeName) {
  let data = localStorage.getItem(`${storeName}`);

  if (data) {
    myLibrary = JSON.parse(data);
    render();
  }
};

getLocalStorage('library');

// OPEN POP UP FORM

let openForm = function () {
  document.getElementById('book-form').style.display = 'inline-block';
  document.getElementById('body__blur').style.filter = 'blur(60px)';
  addClickOutsideListener('body__blur');
  addClickOutsideListener('header');
};

let closeForm = function () {
  document.getElementById('book-form').style.display = 'none';
  document.getElementById('body__blur').style.filter = 'blur(0px)';
  removeClickOutsideListener('body__blur');
  removeClickOutsideListener('header');
};

// EVENT LISTENER

const addClickOutsideListener = function (id) {
  document.getElementById(`${id}`).addEventListener('click', closeForm);
};
const removeClickOutsideListener = function (id) {
  document.getElementById(`${id}`).removeEventListener('click', closeForm);
};

document.getElementById('btn__form').addEventListener('click', openForm);
document.getElementById('btn__close').addEventListener('click', closeForm);

document.getElementById('btn__add').addEventListener('click', addBookToLibrary);
document.querySelector('.container').addEventListener('click', deleteBook);
document.querySelector('.container').addEventListener('click', changeStatus);

numberOfBook();
