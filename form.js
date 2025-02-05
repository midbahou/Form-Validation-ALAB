
const form = document.getElementById("registration");
const username = form.elements.username; // Get the username input
const usernameError = document.getElementById("usernameError"); // Error message element

console.log(username);

username.addEventListener("change", function(e){
    e.preventDefault(); // Prevent default behavior (optional for "change" event)

    // reset error message
    usernameError.textContent = "";

    // Get the username value and trim whitespace using .trim()
    const usernameValue = e.target.value.trim();
    console.log(usernameValue);

    // Check for at least two unique characters
    const uniqueChars = new Set(usernameValue).size;
    if (uniqueChars < 2) {
        usernameError.textContent = "Username must have at least two unique characters."
        return;
    }

    // if all validations pass, clear any previous error message
    usernameError.textContent = "";
})
