function Book(title, author, pages) {
  if (!new.target) {
    throw Error('The "new" operator wasn\'t used.')
  }
  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = false;
  this.id = crypto.randomUUID();
};

Book.prototype = Object.create({
  info() {
    let infoString = `The ${this.title} by ${this.author}, ${this.pages} pages`;
    
    if (this.readStatus === false) {
      return infoString.concat(', not read yet.');
    } else {
      return infoString.concat(', read yet.');
    };
  },
  readInfo() {
    return this.readStatus === false ? 'Not read yet' : 'Read yet'; 
  },
  read() {
    this.readStatus = true;    
  },
})

const myLibrary = [];

function createBookData(title, author, pages) {
  myLibrary.push(new Book(title, author, pages));  
  renderDOM(myLibrary.at(-1));
};

// HTML Event Handlers
const dialog = document.querySelector('#dialog');
const addButton = document.querySelector('#add-btn');
const removeButtons = [];
const catalog = document.querySelector('#catalog-id');

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

function pushCurrentRemoveButton(button) {
  removeButtons.push(button);

  button.addEventListener('click', event => event.target.closest('.book').remove())
};

// DOM Render
function renderDOM(book) {
  let bookContentWrapper = document.createElement('article');
  bookContentWrapper.classList.add('book');
  bookContentWrapper.setAttribute('data-uid', book.id);
    
  bookContentWrapper.innerHTML = `\n
    <h1 class="book__title"><span>The</span> ${book.title}</h1>
    <span class="book__author"><span>Author:</span> ${book.author}</span>
    <span class="book__pages"><span>Pages:</span> ${book.pages}</span>
    <span class="book__status"><span>Status:</span> ${book.readInfo()}</span>
    <span class="book__id"><span>UID:</span> ${book.id}</span>
    <button type="button" class="btn btn--remove" data-action-btn="remove-btn">Remove</button>
  `;

  catalog.appendChild(bookContentWrapper);

  pushCurrentRemoveButton(bookContentWrapper.querySelector('[data-action-btn]'));
};

