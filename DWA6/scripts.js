/**
 * The main list of books page.
 * @module BookList
 */

import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

const page = 1; // 
let matches = books; // List of books that match the search filters

/**
 * Creates a button element for a book.
 * @param {Object} book - The book object.
 * @param {string} book.author - The author of the book.
 * @param {string} book.id - The ID of the book.
 * @param {string} book.image - The URL of the book's image.
 * @param {string} book.title - The title of the book.
 * @returns {HTMLButtonElement} The created button element.
 */

//this function takes a book object and create a button element representing the book
//Uses the provided properties to construct the HTML structure of the button element including image and some text  then returns the created elemnt
const createButtonElement = ({ author, id, image, title }) => {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);

  element.innerHTML = `
    <img class="preview__image" src="${image}" />
    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[author]}</div>
    </div>
  `;

  return element;
};

//Initializes the starting list of book items. And also creates a document fragment Which will hold the buttons for the initial boooks then append them to the fragment

const initializeList = () => {
  const starting = document.createDocumentFragment();
  matches.slice(0, BOOKS_PER_PAGE).forEach((book) => {
    const element = createButtonElement(book);
    starting.appendChild(element);
  });

  document.querySelector("[data-list-items]").appendChild(starting);
};

/**
 * Creates an option element for a select dropdown.
 * @param {string} value - The value of the option.
 * @param {string} text - The text of the option.
 * @returns {HTMLOptionElement} The created option element.
 */

const createOptionElement = (value, text) => {
  const element = document.createElement("option");
  element.value = value;
  element.innerText = text;
  return element;
};

/**
 * Creates the options for the genre or author select dropdown.
 * @param {Object} data - The data object containing genres or authors.
 * @param {string} container - The name of the container (genres or authors).
 */

const createOptions = (data, container) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createOptionElement("any", `All ${container}`));
  Object.entries(data).forEach(([id, name]) => {
    fragment.appendChild(createOptionElement(id, name));
  });
  document.querySelector(`[data-search-${container}]`).appendChild(fragment);
};

createOptions(genres, "genres");
createOptions(authors, "authors");

//Created variables that handles the settings theme which select it by its attribute
const settingsTheme = document.querySelector("[data-settings-theme]");
const prefersDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
settingsTheme.value = prefersDarkMode ? "night" : "day";
document.documentElement.style.setProperty(
  "--color-dark",
  prefersDarkMode ? "255, 255, 255" : "10, 10, 20"
);
document.documentElement.style.setProperty(
  "--color-light",
  prefersDarkMode ? "10, 10, 20" : "255, 255, 255"
);

// Updates the "Show more" button text and remaining book count.
const updateListButton = () => {
  const remaining = Math.max(matches.length - page * BOOKS_PER_PAGE, 0);
  const listButton = document.querySelector("[data-list-button]");
  listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
  `;
};

// Event handler for the search cancel button click.
const handleSearchCancel = () => {
  document.querySelector("[data-search-overlay]").open = false;
};

//Event handler for the settings cancel button click.
const handleSettingsCancel = () => {
  document.querySelector("[data-settings-overlay]").open = false;
};

// Event handler for the header search button click.
const handleHeaderSearchClick = () => {
  document.querySelector("[data-search-overlay]").open = true;
  document.querySelector("[data-search-title]").focus();
};

//Event handler for the header settings button click.
const handleHeaderSettingsClick = () => {
  document.querySelector("[data-settings-overlay]").open = true;
};

//Event handler for the close list button click.
const handleCloseListClick = () => {
  document.querySelector("[data-list-active]").open = false;
};

/**
 * Event handler for the settings form submit.
 * @param {Event} event - The form submit event.
 */
const handleSettingsFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === "night") {
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }

  document.querySelector("[data-settings-overlay]").open = false;
};

/**
 * Event handler for the search form submit.
 * @param {Event} event - The form submit event.
 */
const handleSearchFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === "any";

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  page = 1;
  matches = result;

  const listMessage = document.querySelector("[data-list-message]");
  listMessage.classList.toggle("list__message_show", result.length < 1);

  document.querySelector("[data-list-items]").innerHTML = "";
  const newItems = document.createDocumentFragment();

  result.slice(0, BOOKS_PER_PAGE).forEach((book) => {
    const element = createButtonElement(book);
    newItems.appendChild(element);
  });

  document.querySelector("[data-list-items]").appendChild(newItems);
  document.querySelector("[data-list-button]").disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;

  updateListButton();

  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector("[data-search-overlay]").open = false;
};

//Event handler for the "Show more" button click.
const handleListButtonClick = () => {
  const fragment = document.createDocumentFragment();

  matches
    .slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)
    .forEach((book) => {
      const element = createButtonElement(book);
      fragment.appendChild(element);
    });

  document.querySelector("[data-list-items]").appendChild(fragment);
  page += 1;
  updateListButton();
};

/**
 * Event handler for the list items click.
 * @param {Event} event - The click event.
 */
const handleListItemsClick = (event) => {
  // Convert the event path to an array to ensure compatibility across browsers
  const pathArray = Array.from(event.path || event.composedPath());

  // Variable to store the active book
  let active = null;

  // Iterate through the path array to find the clicked element with a "data-preview" attribute
  for (const node of pathArray) {
    // If an active book is found, exit the loop
    if (active) break;

    // Check if the current node has a "data-preview" attribute
    if (node?.dataset?.preview) {
      // Find the book in the "books" array based on the "id" matching the "data-preview" value
      active = books.find((book) => book.id === node.dataset.preview);
    }
  }

  // If an active book is found
  if (active) {
    // Get the elements from the DOM
    const listActive = document.querySelector("[data-list-active]");
    const listBlur = document.querySelector("[data-list-blur]");
    const listImage = document.querySelector("[data-list-image]");
    const listTitle = document.querySelector("[data-list-title]");
    const listSubtitle = document.querySelector("[data-list-subtitle]");
    const listDescription = document.querySelector("[data-list-description]");

    // Set the necessary information of the active book to the corresponding DOM elements
    listActive.open = true;                                 // Open the active list
    listBlur.src = active.image;                            // Set the blur image source
    listImage.src = active.image;                           // Set the image source
    listTitle.innerText = active.title;                     // Set the book title
    listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;   // Set the book author and publication year
    listDescription.innerText = active.description;         // Set the book description
  }
};


// Event handlers for different elements
const eventHandlers = {
  "[data-search-cancel]": handleSearchCancel,                  // Handler for search cancel button
  "[data-settings-cancel]": handleSettingsCancel,              // Handler for settings cancel button
  "[data-header-search]": handleHeaderSearchClick,             // Handler for header search button
  "[data-header-settings]": handleHeaderSettingsClick,         // Handler for header settings button
  "[data-list-close]": handleCloseListClick,                   // Handler for list close button
  "[data-settings-form]": handleSettingsFormSubmit,            // Handler for settings form submission
  "[data-search-form]": handleSearchFormSubmit,                // Handler for search form submission
  "[data-list-button]": handleListButtonClick,                 // Handler for list button click
  "[data-list-items]": handleListItemsClick                     // Handler for list items click
};

// Attaching event listeners to elements using their respective handlers
Object.keys(eventHandlers).forEach((selector) => {
  document.querySelector(selector).addEventListener("click", eventHandlers[selector]);
});

// Initializing list
initializeList();

// Updating list button
updateListButton();
