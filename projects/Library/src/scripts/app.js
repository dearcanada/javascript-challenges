class Book {
  title;
  author;
  pages;
  readStatus = false;
  id = crypto.randomUUID();

  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus;
    this.id;
  };

  info() {
    let infoString = `The ${this.title} by ${this.author}, ${this.pages} pages`;
    
    if (this.readStatus === false) {
      return infoString.concat(', not read yet.');
    } else {
      return infoString.concat(', read yet.');
    };
  };

  readInfo() {
    return this.readStatus === false ? 'Not read yet' : 'Read yet'; 
  };

  read() {
    this.readStatus = true;
    return this.readStatus; 
  };
};

const myLibrary = [];

function createBookData(title, author, pages) {
  title === '' ? title = 'Not specified' : '';
  author === '' ? author = 'Not specified' : '';
  pages === '' ? pages = 0 : '';

  myLibrary.push(new Book(title, author, pages));  
  renderDOM(myLibrary.at(-1));
};

// HTML Event Handlers
export const dialog = document.querySelector('#dialog');
export const addButton = document.querySelector('#add-btn');
export const removeButtons = [];
export const readButtons = [];
export const catalog = document.querySelector('#catalog-id');

dialog.addEventListener('click', event => {
  const target = event.target;

  // Modal window event delegation
  if (target.getAttribute('id') === 'submit-btn') {
    event.preventDefault();
    
    const title = document.querySelector('#title-id');
    const author = document.querySelector('#author-id');
    const pages = document.querySelector('#pages-id');

    createBookData(title.value, author.value, pages.value);
    dialog.close();
  };
  if (target.getAttribute('id') === 'cancel-btn') {
    dialog.close();
  };
});

addButton.addEventListener('click', () => dialog.showModal());

function pushCurrentRemoveButton(button, book) {
  removeButtons.push(button);

  button.addEventListener('click', event => {
    event.target.closest('.book').remove();
    
    const currentBookIndex = myLibrary.findIndex(bookInstance => bookInstance.id === book.id);
    myLibrary.splice(currentBookIndex, 1);
  });
};

function pushCurrentReadButton(button, book) {
  readButtons.push(button);

  button.addEventListener('click', () => {
    const readStatusSpan = button.closest('.book').querySelector('.book__status');
    book.read();

    readStatusSpan.innerHTML = `\n<span>Status:</span> ${book.readInfo()}`;
  });
};

// DOM Render
function renderDOM(book) {
  let bookContentWrapper = document.createElement('article');
  bookContentWrapper.classList.add('book');
  bookContentWrapper.setAttribute('data-uid', book.id);
    
  bookContentWrapper.innerHTML = `\n
    <h1 class="book__title">${book.title}</h1>
    <span class="book__author"><span>Author:</span> ${book.author}</span>
    <span class="book__pages"><span>Pages:</span> ${book.pages}</span>
    <span class="book__status"><span>Status:</span> ${book.readInfo()}</span>
    <span class="book__id"><span>UID:</span> ${book.id}</span>
    <div class="book__buttons">
      <button type="button" class="btn btn--read" data-action-btn="read-btn">Read</button>
      <button type="button" class="btn btn--remove" data-action-btn="remove-btn">Remove</button>
    <div/>
  `;

  catalog.appendChild(bookContentWrapper);

  pushCurrentRemoveButton(bookContentWrapper.querySelector('[data-action-btn="remove-btn"]'), book);
  pushCurrentReadButton(bookContentWrapper.querySelector('[data-action-btn="read-btn"]'), book);
};