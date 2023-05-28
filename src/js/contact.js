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
    modal.showModal();
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

async function sendFormData(name, email, subject, message) {
  const formData = {
    "your-name": name,
    "your-email": email,
    "your-subject": subject,
    "your-message": message,
  };

  try {
    const sendForm = await fetch(
      `https://slow-mo.flywheelsites.com/wp-json/contact-form-7/v1/contact-forms/142/feedback`,
      { formData },
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("sendForm", sendForm);
  } catch (error) {
    console.log("Error fetching posts:", error);
  }
}

function submitForm(name, email, subject, message) {
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);

  sendFormData(name, email, subject, message);
}

const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openButton.addEventListener("submit", () => {
  modal.showModal();
});
closeButton.addEventListener("click", () => {
  modal.close();
});
