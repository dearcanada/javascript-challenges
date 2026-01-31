function Book(title, author, pages) {
  if (!new.target) {
    throw Error('The "new" operator wasn\'t used.')
  }
  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = false;
  this.id = crypto.randomUUID();

  this.read = function() {
    this.readStatus = true;
  };
  this.info = function() {
    return this.readStatus === false ? 'Not read yet' : 'Read yet'; 
    
    // let infoString = `The ${this.title} by ${this.author}, ${this.pages} pages`;
    
    // if (this.readStatus === false) {
    //   return infoString.concat(', not read yet.');
    // } else {
    //   return infoString.concat(', read yet.');
    // };
  };
};

const bookInstances = [];

function createBookData(title, author, pages) {
  bookInstances.push(new Book(title, author, pages));

  addBookToDOM(bookInstances.at(-1));
};

createBookData('Abysmal JavaScript Book', 'DearsodaCan', 600);

// HTML Books display
const addButton = document.querySelector('#add-btn');
const closeButton = document.querySelector('#close-btn');
const submitButton = document.querySelector('#submit-btn');
const removeButton = document.querySelector('#remove-btn');
const dialog = document.querySelector('#dialog');


addButton.addEventListener('click', () => dialog.showModal())
closeButton.addEventListener('click', () => dialog.close())

submitButton.addEventListener('click', event => {
  event.preventDefault();

  const titleInput = (document.querySelector('#title-id')).value;
  const authorInput = (document.querySelector('#author-id')).value;
  const pagesInput = (document.querySelector('#pages-id')).value;
  
  createBookData(titleInput, authorInput, pagesInput);
});

removeButton.addEventListener('click', event => {
  event.target.closest('.book').remove();
})


function addBookToDOM(book) {
  const newBook = document.createElement('article');
  const catalog = document.querySelector('#catalog-id'); // An error occurs if outside of its function

  newBook.classList.add('book');
  newBook.innerHTML = 
    `\n
      <h1 class="book__title">${book.title}</h1>
      <span class="book__author"><span>Author:</span> ${book.author}</span>
      <span class="book__pages"><span>Pages:</span> ${book.pages}</span>
      <span class="book__status"><span>Status:</span> ${book.info()}</span>
      <span class="book__id"><span>UID:</span> ${book.id}</span>
      <button type="button" class="btn btn--remove" id="remove-btn">Remove</button>
    `;

  console.log(newBook);
  
  catalog.appendChild(newBook);
};

// 1/31/26 issue:
// If a book is created it has multiple IDs (it might be fixed by selecting a class instead of an id);
// "remove book" removes a book from DOM only, not from the array