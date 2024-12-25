document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "admin@codium.com" && password === "password") {
        alert("Login successful!");
        window.location.href = "chat.html"; // Redirect to chat page
    } else {
        alert("Invalid email or password. Please try again.");
    }
});
