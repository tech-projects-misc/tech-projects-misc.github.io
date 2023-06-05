document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form field values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    localStorage.setItem('isLoggedIn', true);

    fetch("http://localhost:4000/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.log(error);
            alert("Something went wrong");
        });

    // Redirect to index.html
    //window.location.href = 'index.html';
});

(() => {
    if (localStorage.getItem("isLoggedIn")) {
        window.location.href = "index.html"
    }
})()