// PEPCOKE Website Script

// Button action
const button = document.querySelector("button");

if (button) {
    button.addEventListener("click", function () {
        alert("Welcome to PEPCOKE! Your journey starts here.");
    });
}

// Current year in footer
const footer = document.querySelector("footer p");

if (footer) {
    footer.innerHTML =
        "© " + new Date().getFullYear() + " PEPCOKE. All Rights Reserved.";
}

// Login
async function loginUser() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;


    try {

        const response = await fetch(
            "https://22411b5c-070d-4ace-baf5-1cd9c737da6c-00-dpewii9evv7.spock.replit.dev/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        if(response.ok){

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successful!");

            window.location.href = "dashboard.html";

        } else {

            alert(data.error || "Login failed");

        }


    } catch(error){

        alert("Cannot connect to PEPCOKE server");
        console.log(error);

    }

}

// Register
async function registerUser() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    try {

        const response = await fetch(
            "https://22411b5c-070d-4ace-baf5-1cd9c737da6c-00-dpewii9evv7.spock.replit.dev/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Registration successful!");

            window.location.href = "dashboard.html";

        } else {

            alert(data.error || "Registration failed");

        }

    } catch (error) {

        alert("Cannot connect to PEPCOKE server");
        console.log(error);

    }

    return false;
}

// Mobile Menu
function toggleMenu() {

    let menu = document.getElementById("navMenu");

    if (menu) {
        menu.classList.toggle("active");
    }

}document.getElementById("registerForm")?.addEventListener("submit", function(e){
    e.preventDefault();
    registerUser();
});document.getElementById("loginForm")?.addEventListener("submit", function(e){
    e.preventDefault();
    loginUser();
});// Dashboard user display

document.addEventListener("DOMContentLoaded", () => {

    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {

        let name = document.getElementById("userName");

        if (name) {
            name.innerHTML = user.name;
        }

    }

});