
const form = document.getElementById("registration");


// =================================================== 1. Registration Form - Username Validation: ====================================================
const username = form.elements.username; // Get the username input
const usernameError = document.getElementById("usernameError"); // Error message element

console.log(username);

username.addEventListener("input", function(e){
    //* reset error message
    usernameError.textContent = "";
    
    //* Get the username value and trim whitespace using .trim()
    const usernameValue = e.target.value.trim();
    console.log(usernameValue);
    
    //* Check for at least two unique characters
    const uniqueChars = new Set(usernameValue).size;
    if (uniqueChars < 2) {
        usernameError.textContent = "Username must have at least two unique characters.";
        return;
    }

    //* Check for valid length (at least 4 alphanumeric characters)
    if (!/^[a-zA-Z0-9]{4,}$/.test(usernameValue)) { // test() is used to validate that the username contains no special characters or spaces, ensuring that only alphanumeric characters are allowed.
        usernameError.textContent = "Username must be at least 4 alphanumeric characters.";
        return;
    }
    
    // if all validations pass, clear any previous error message
    usernameError.textContent = "";
})



// =================================================== 2. Registration Form - Email Validation: ======================================================
//* The email must be a valid email address.
//* The email must not be from the domain "example.com."

const emailInput = form.elements.email;
const emailError = document.getElementById("emailError");

emailInput.addEventListener("input", function (e) {
    emailError.textContent = ""; // reset error message
    
    const emailValue = e.target.value.trim();
    
    //* 1. check if the email is a valid format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
        return;
    }
    
    //* 2. check for the restricted "example.com" domain
    if (emailValue.endsWith("@example.com")) {
        emailError.textContent = "Emails from 'example.com' are not allowed.";
    }
    
})



// =================================================== 3. Registration Form - Password Validation: ======================================================

const passwordInput = form.elements.password;
const passwordCheckInput = form.elements.passwordCheck;
const passwordError = document.getElementById("passwordError");
const passwordCheckError = document.getElementById("passwordCheckError");


passwordInput.addEventListener("input", function (e) {
    
    const passwordValue = e.target.value.trim();
    const usernameValue = form.elements.username.value.trim();

    passwordError.textContent = "";
    
    //* 1. Passwords must be at least 12 characters long.
    if (passwordValue.length < 12) {
        passwordError.textContent = "Password must be at least 12 characters long.";
        return;
    }
    
    //* 2. Passwords must have at least one uppercase and one lowercase letter.
    if (!/[a-z]/.test(passwordValue) || !/[A-Z]/.test(passwordValue)) {
        passwordError.textContent = "Password must have at least one uppercase and one lowercase letter.";
        return;
    }
    
    //* 3. Password must contain at least one number
    if (!/\d/.test(passwordValue)) {
        passwordError.textContent = "Password must contain at least one number.";
        return;
    }
    
    //* 4. Passwords must contain at least one special character.
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
        passwordError.textContent = "Password must contain at least one special character.";
        return;
    }
    
    //* 5. Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
    if (/password/i.test(passwordValue)) {
        passwordError.textContent = "Password cannot contain the word 'password'.";
        return;
    }
    
    //* 6. Passwords cannot contain the username.
    if (passwordValue.toLowerCase().includes(usernameValue.toLowerCase())) {
        passwordError.textContent = "Password cannot contain the username.";
        return;
    }
    
    
    // if all validations pass, clear the error message
    passwordError.textContent = "";    
})

passwordCheckInput.addEventListener("input", function (e) {
    // passwordCheckError.textContent = "";

    const passwordCheckValue = e.target.value.trim();

    //* Both passwords must match.
    if (passwordInput.value.trim() !== passwordCheckValue) {
        passwordCheckError.textContent = "Passwords must match.";
        return;
    }

    // if all validations pass, clear the error message
    passwordCheckError.textContent = ""; 
})



// =================================================== 4. Registration Form - Terms and Conditions: ======================================================
//* The terms and conditions must be accepted.
const termsCheckBox = form.elements.terms;
const termsError = document.querySelector("#termsError");

form.addEventListener("submit", e => {
    termsError.textContent = "";
    
    if (!termsCheckBox.checked) {
        e.preventDefault();
        termsError.textContent = "You must accept the terms and conditions.";
    }
})




// =================================================== 5. Registration Form - Form Submission: ======================================================

//* create a success message element to show after successful registration
const successMessage = document.createElement("p");
successMessage.style.color = "green";

//* Add a submit eventListener to the form
form.addEventListener("submit", function (e){
    e.preventDefault(); // prevent default form submission (page reload)
    
    // retrieve and clean up input values (trim whitespaces)
    const usernameValue = username.value.trim().toLowerCase();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
    const passwordCheck = passwordCheckInput.value.trim();
    
    // reset error and clear previous success message if any
    usernameError.textContent = "";
    successMessage.textContent = "";
    
    // Some simple validations before storing the data
    if (!usernameValue || !email || !password) {
        alert("All fields are required!");
        return; // exit the function if any field is empty
    }
    
    if (password !== passwordCheck) {
        alert("Passwords must match!")
        return; // exit the function if password does not match
    }
    
    // Get the existing list of users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // check if the username already exists in the user list using a loop
    for (let i = 0; i < users.length; i++) {
        if (users[i].usernameValue === usernameValue) {
            isUsernameTaken = true; // flag as taken if a match if found
            break; // stop checking once a duplicate is found
        }
    }
    
    // if the username already exist, show an error and stop the form submission
    let isUsernameTaken = false; // define the variable 
    if (isUsernameTaken) {
        usernameError.textContent = "This username is already taken. Please choose another!";
        return;
    }
    
    // Create a user object with the form data
    const newUser = {
    username: usernameValue,
    email: email,
    password: password,
};

// Add the new user to the list of users
users.push(newUser);

// Save the updated user list back to localStorage
localStorage.setItem("users", JSON.stringify(users));

// Clear the form fields after successful registration
form.reset();

// Display a success message after registration
successMessage.textContent = "Registration successful!";
form.appendChild(successMessage); // Append the success message to the form

})




// =================================================== Part 4: Login Form Validation Requirements ======================================================

//* Get forms and forms elements
const loginForm = document.getElementById("login");
const loginUsernameInput = loginForm.elements.username;
const loginPasswordInput = loginForm.elements.password;
const keepMeLoggedInCheckBox = loginForm.elements.persist;
const loginError = document.getElementById("loginError");
const loginSuccessMessage = document.createElement("p");
loginSuccessMessage.style.color = "green";

//* handle for submission
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // reset error and success messages
    loginError.textContent = "";
    loginSuccessMessage.textContent = "";

    const username = loginUsernameInput.value.trim().toLowerCase();
    const password = loginPasswordInput.value.trim();

    // load existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

     //* The username cannot be blank.
    if (!username) {
        loginError.textContent = "Username cannot be blank.";
        return;
    }

    //* performs a search within the users array stored in localStorage to find a user object that matches the provided username.
    const user = users.find(user => user.username === username);

    if (!user) {
        loginError.textContent = "Username does not exist.";
        return;
    }
    
    //* Password validation
    if (!password) {
        loginError.textContent = "Password cannot be blank.";
        return;
    }

    //* The password must be correct (validate against localStorage).
    if (user.password !== password) {
        loginError.textContent = "Incorrect password.";
        return;
    }

    //* If "Keep me logged in" is checked, modify the success message to indicate this (normally, this would be handled by a variety of persistent login tools and technologies).
    // Show success message with "Keep me logged in" condition
    if (keepMeLoggedInCheckBox.checked) {
        loginSuccessMessage.textContent = "Login successful! You will remain logged in.";
    } else {
        loginSuccessMessage.textContent = "Login successful!";
    }
    
    loginForm.appendChild(loginSuccessMessage);

    //* If all validation is successful, clear all form fields and show a success message.
    loginForm.reset();
})