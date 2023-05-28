/*
============================================
Constants
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/advanced-form.html#L50
============================================
*/

// TODO: Get DOM elements from the DOM

// TODO: Create event listeners for the form

/*
============================================
API calls
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/advanced-form.html#L157
============================================
*/

// TODO: Set up a function to fetch data from the API

/*
============================================
Helper functions
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/advanced-form.html#L118
============================================
*/

// TODO: Create a function to validate an input field

// TODO: Create a function to create a DOM element

/* const formEl = document.querySelector("#js-form");
const nameEl = document.querySelector("#js-name");
const emailEl = document.querySelector("#js-email");
const passwordEl = document.querySelector("#js-password");
const messageContainerEl = document.querySelector("#js-message-container");

// Minmum 2 characters, must be letters only
const minLengthRegex = /^[a-zA-Z]{2,}/;

// Email Validation as per RFC2822 standards.
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// - at least 8 characters
// - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
// - Can contain special characters
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

formEl.addEventListener("submit", (event) => {
  // Stop the form from reloading the page
  event.preventDefault();

  const name = nameEl.value;
  const email = emailEl.value;
  const password = passwordEl.value;

  const isNameValid = validateField(nameEl, minLengthRegex);
  const isEmailValid = validateField(emailEl, emailRegex);
  const isPasswordValid = validateField(passwordEl, passwordRegex);

  messageContainerEl.innerHTML = "";

  if (!isNameValid) {
    alert("Please enter a name");
    return;
  }

  if (!isEmailValid) {
    alert("Please check your email");
    return;
  }

  if (!isPasswordValid) {
    alert("Please enter a valid password");
    return;
  }

  submitForm(name, email, password);
});
 */

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const subject = subjectInput.value;
  const message = messageInput.value;

  const isNameValid = validateField(
    nameInput,
    /^[a-zA-Z\s]{5,}$/,
    "Name must be at least 5 characters long"
  );
  const isEmailValid = validateField(
    emailInput,
    /^\S+@\S+\.\S+$/,
    "Invalid email address"
  );
  const isSubjectValid = validateField(
    subjectInput,
    /^.{15,}$/,
    "Subject must be at least 15 characters long"
  );
  const isMessageValid = validateField(
    messageInput,
    /^.{25,}$/,
    "Message must be at least 25 characters long"
  );

  if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    // Form submission logic
    submitForm(name, email, subject, message);
    form.reset();
  }
}

function validateField(field, regex, errorMessage) {
  const value = field.value.trim();
  const errorElement = document.getElementById(`${field.id}-error`);

  if (regex.test(value)) {
    field.classList.remove("error");
    errorElement.textContent = "";
    return true;
  } else {
    field.classList.add("error");
    errorElement.textContent = errorMessage;
    return false;
  }
}

function submitForm(name, email, subject, message) {
  // Your form submission logic here
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);
}
