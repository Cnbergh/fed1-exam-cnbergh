document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Get the contact container element
    const contactContainer = document.getElementById("js-contact-container");

    // Create the form HTML dynamically
    const formHTML = `
      <p id="js-message-container" class="error-message"></p>
  
      <form class="c-form" id="js-form" autocomplete="on">
        <div class="form-group">
          <label for="js-name">Name</label>
          <input type="text" id="js-name" required />
          <p class="validation-container" data-id="js-validation-message"></p>
        </div>
  
        <div class="form-group">
          <label for="js-email">Email</label>
          <input type="email" id="js-email" required />
          <p class="validation-container" data-id="js-validation-message"></p>
        </div>
  
        <div class="form-group">
          <label for="js-password">Password</label>
          <input type="password" id="js-password" required />
          <p class="validation-container" data-id="js-validation-message"></p>
        </div>
  
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </form>
    `;

    // Inject the form HTML into the contact container
    contactContainer.innerHTML = formHTML;
  },
  1000
);
