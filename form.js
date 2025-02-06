
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

passwordInput.addEventListener("input", function (e) {
    passwordError.textContent = "";
    
    const passwordValue = e.target.value.trim();
    const usernameValue = form.elements.username.value.trim();
    
    //* 1. Passwords must be at least 12 characters long.
    if (passwordValue.length < 12) {
        passwordError.textContent = "Password must be at least 12 characters long.";
        return;
    }
    
    //* 2. Passwords must have at least one uppercase and one lowercase letter.
    else if (!/[a-z]/.test(passwordValue) || !/[A-Z]/.test(passwordValue)) {
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
    
    //* Both passwords must match.
    if (passwordValue !== passwordCheckInput.value.trim()) {
        passwordError.textContent = "Passwords must match.";
        return;
    }

    // if all validations pass, clear the error message
    passwordError.textContent = "";

})
