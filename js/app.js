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
let books = testBooks;

/**
 * @constructor
 * @param {string} author
 * @param {string} title
 * @param {string} description
 * @param {number} pages
 * @param {boolean} read
 * */
function Book(author, title, description, pages, read) {
  this.author = author;
  this.title = title;
  this.description = description;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
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

function renderCards() {
  let cards = document.createElement("div");
  cards.setAttribute("id", "cards");

  books.forEach(({ title, description, author, pages, read, id: cardId }) => {
    const card = createElement("div", "card");
    const cardFooter = createElement("div", "card-footer");

    cardFooter.append(
      createElement("p", "author", author),
      createElement("p", "pages", `${pages} pages`),
      createElement("p", "read", read ? "read" : "non read"),
    );

    card.append(
      createElement("h3", "title", title),
      createElement("p", "description", description),
      cardFooter,
      (() => {
        const trash = document.createElement("img");
        trash.className = "trash";
        trash.setAttribute("src", "./static/trash.svg");

        return trash;
      })(),
    );

    card.dataset.id = cardId;

    cards.appendChild(card);
  });

  let main = $("main");

  let oldCards = document.querySelector("#cards");

  if (oldCards === null) {
    main.append(cards);
    return;
  }

  main.replaceChild(cards, oldCards);
}

/**
 * @param {Element} main
 */
function newBookHandler(main) {
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

function main() {
  let main = $("main");

  if (books.length == 0) {
    const text = document.createElement("p");
    text.setAttribute("id", "info");
    text.textContent = "There are no books to show.";

    main.appendChild(text);

    return;
  }

  renderCards();

  const button = $("#new-book");
  button.addEventListener("click", () => newBookHandler(main));

  document.addEventListener("click", handleMainEvent);
}

/**
 * @param {Event} event
 * */
function handleMainEvent(event) {
  if (!event.target) return;
  if (event.target instanceof HTMLElement) {
    if (event.target.matches(".trash")) {
      const card = event.target.closest(".card");
      if (!card || !(card instanceof HTMLElement)) return;
      const id = card.dataset.id;
      if (id === undefined) return;
      removeBook(id);
      renderCards();
    }
  }
}

main();
