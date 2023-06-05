document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form field values
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    fetch("http://localhost:4000/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === "success") {
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'index.html';
            }
            else {
                alert(data.message);
            }
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