/// @ts-check

/** @typedef {{author: string, title: string, description: string, pages: number, read: boolean, id: string}} BookData */

const testBooks = [
  {
    author: "Gabriel García Márquez",
    title: "Cien años de soledad",
    description:
      "La saga de la familia Buendía en el mítico pueblo de Macondo.",
    pages: 471,
    read: true,
    id: crypto.randomUUID(),
  },
  {
    author: "George Orwell",
    title: "1984",
    description:
      "Una distopía sobre un régimen totalitario que controla cada aspecto de la vida.",
    pages: 328,
    read: true,
    id: crypto.randomUUID(),
  },
  {
    author: "J.R.R. Tolkien",
    title: "El Señor de los Anillos: La Comunidad del Anillo",
    description:
      "El inicio de la épica aventura para destruir el Anillo Único.",
    pages: 423,
    read: false,
    id: crypto.randomUUID(),
  },
  {
    author: "Jane Austen",
    title: "Orgullo y prejuicio",
    description:
      "La historia de Elizabeth Bennet y el señor Darcy en la Inglaterra rural.",
    pages: 279,
    read: true,
    id: crypto.randomUUID(),
  },
  {
    author: "Ray Bradbury",
    title: "Fahrenheit 451",
    description:
      "Un futuro donde los libros están prohibidos y los bomberos los queman.",
    pages: 194,
    read: false,
    id: crypto.randomUUID(),
  },
  {
    author: "Antoine de Saint-Exupéry",
    title: "El Principito",
    description:
      "Un piloto perdido en el desierto conoce a un pequeño príncipe de otro planeta.",
    pages: 96,
    read: true,
    id: crypto.randomUUID(),
  },
  {
    author: "Fiódor Dostoievski",
    title: "Crimen y castigo",
    description:
      "Un estudiante comete un asesinato y lidia con su conciencia y la culpa.",
    pages: 671,
    read: false,
    id: crypto.randomUUID(),
  },
  {
    author: "Isabel Allende",
    title: "La casa de los espíritus",
    description:
      "La historia de varias generaciones de la familia Trueba en Chile.",
    pages: 433,
    read: true,
    id: crypto.randomUUID(),
  },
  {
    author: "Frank Herbert",
    title: "Dune",
    description:
      "Una epopeya de ciencia ficción sobre poder, política y un planeta desértico.",
    pages: 617,
    read: false,
    id: crypto.randomUUID(),
  },
  {
    author: "Miguel de Cervantes",
    title: "Don Quijote de la Mancha",
    description:
      "Las aventuras de un hidalgo que enloquece leyendo libros de caballerías.",
    pages: 863,
    read: false,
    id: crypto.randomUUID(),
  },
];
/** @type {BookData[]} */
const books = testBooks;

class Book {
  /**
   * @param {string} author
   * @param {string} title
   * @param {string} description
   * @param {number} pages
   * @param {boolean} read
   * */
  constructor(author, title, description, pages, read) {
    this.author = author;
    this.title = title;
    this.description = description;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }
}

/** @param {BookData} book */
function addBookToLibrary(book) {
  books.push(book);
}

/**
 * @param {string} tag
 * @param {string} className
 * @param {string} [text]
 * @returns {HTMLElement}
 */
function createElement(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
}

/**
 * @param {string} selector
 * @returns {Element}
 * */
function $(selector) {
  let node = document.querySelector(selector);
  if (!node) throw "Error al encontrar el nodo " + selector;
  return node;
}

/**
 * @returns {HTMLFormElement}
 */
function getForm() {
  let form = document.createElement("form");
  form.id = "create-book-form";

  let _formTitle = createFormRow("title", "text", "Title:", true);
  let _formDescription = document.createElement("div");
  _formDescription.setAttribute("id", "form-description");
  _formDescription.append(
    (() => {
      const _label = document.createElement("label");
      _label.setAttribute("for", "description");
      _label.innerText = "Description:";
      return _label;
    })(),
    (() => {
      const _textArea = document.createElement("textarea");
      _textArea.required = true;
      _textArea.setAttribute("id", "description");
      _textArea.setAttribute("name", "description");
      return _textArea;
    })(),
  );

  let _formAuthor = createFormRow("author", "text", "Author:", true);
  let _formPages = createFormRow("pages", "number", "Pages:", true);
  let _formRead = createFormRow("read", "checkbox", "Read:", false);

  let _formCreate = document.createElement("button");
  _formCreate.id = "create-book";
  _formCreate.type = "submit";
  _formCreate.textContent = "Create";

  form.addEventListener("submit", createBookHandler);

  form.append(
    _formTitle,
    _formDescription,
    _formAuthor,
    _formPages,
    _formRead,
    _formCreate,
  );

  return form;
}

/**
 * @param {string} inputName
 * @param {string} inputType
 * @param {string} labelText
 * @param {boolean} required
 * @returns {HTMLDivElement}
 */
function createFormRow(inputName, inputType, labelText, required) {
  let div = document.createElement("div");
  div.classList.add("form-row");

  let label = document.createElement("label");
  label.setAttribute("for", inputName);
  label.innerText = labelText ?? inputName + ":";
  let input = document.createElement("input");
  input.setAttribute("id", inputName);
  input.setAttribute("name", inputName);
  input.setAttribute("type", inputType ?? "text");
  if (required) {
    input.required = true;
  }

  div.append(label, input);

  return div;
}

function newBookHandler() {
  let main = $("main");

  const form = main.querySelector("#create-book-form");

  if (!form) {
    let form = getForm();
    main.append(form);
  } else {
    main.removeChild(form);
  }

  main.classList.toggle("creating-book");
}

/**
 * @param {Event} event
 * */
function createBookHandler(event) {
  event.preventDefault();

  /**
   * @param {string} selector
   * @returns {HTMLInputElement}
   * */
  function $button(selector) {
    const b = $(selector);
    if (b instanceof HTMLInputElement) {
      return b;
    }
    throw (
      "El elemento definido por el selector " + selector + " no es un input."
    );
  }

  const keys = ["title", "author", "pages", "read"];

  let { title, author, pages, read } = Object.fromEntries(
    keys.map((key) => {
      return [key, $button(`#${key}`)];
    }),
  );

  let description = document.querySelector("#description");
  if (!(description instanceof HTMLTextAreaElement)) {
    throw "El elemento definido por el selector #description no es un textarea.";
  }

  let book = new Book(
    author.value,
    title.value,
    description.value,
    pages.valueAsNumber,
    read.checked,
  );

  addBookToLibrary(book);

  renderCards();
}

/**
 * @param {string} id
 */
function removeBook(id) {
  for (const [i, book] of books.entries()) {
    if (book.id === id) {
      books.splice(i, 1);
      break;
    }
  }
}

/**
 * @param {Event} event
 * */
function handleReadChange(event) {
  if (!(event.target && event.target instanceof HTMLElement)) return;
  const card = event.target.closest(".card");
  if (!(card && card instanceof HTMLElement)) return;
  const bookId = card.dataset.id;
  if (bookId === undefined) return;
  toggleRead(bookId);
  renderCards();
}

/**
 * @param {string} bookId
 * */
function toggleRead(bookId) {
  for (const book of books) {
    if (book.id === bookId) {
      book.read = !book.read;
    }
  }
}

/**
 * @param {Event} event
 * */
function handleMainEvent(event) {
  if (!(event.target && event.target instanceof HTMLElement)) return;

  if (event.target.matches(".trash")) {
    const card = event.target.closest(".card");
    if (!(card && card instanceof HTMLElement)) return;
    const id = card.dataset.id;
    if (id === undefined) return;
    removeBook(id);
    renderCards();
  } else if (event.target.matches("#new-book")) {
    newBookHandler();
  } else if (event.target.matches(".toggle-read")) {
    handleReadChange(event);
  }
}

function renderCards() {
  let cards = $("#cards");

  if (books.length === 0) {
    const text = document.createElement("p");
    text.id = "info";
    text.textContent = "There are no books to show.";

    cards.classList.remove("with-content");
    cards.replaceChildren(text);
    return;
  }

  const newCards = document.createElement("div");
  newCards.id = "cards";

  books.forEach(({ title, description, author, pages, read, id: cardId }) => {
    const card = createElement("div", "card");

    card.append(
      createElement("h3", "title", title),
      createElement("p", "description", description),
      createElement("p", "author", author),
      createElement("p", "pages", `${pages} pages`),
      (() => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "toggle-read";
        button.textContent = read ? "Mark as unread" : "Mark as read";
        return button;
      })(),
      (() => {
        const trash = createElement("img", "trash");
        trash.setAttribute("src", "./static/trash.svg");
        return trash;
      })(),
    );

    card.dataset.id = cardId;

    newCards.appendChild(card);
  });

  newCards.classList.add("with-content");

  $("main").replaceChild(newCards, cards);
}

function main() {
  const main = $("main");

  let cards = document.createElement("div");
  cards.id = "cards";

  main.appendChild(cards);

  renderCards();

  document.addEventListener("click", handleMainEvent);
}

main();
