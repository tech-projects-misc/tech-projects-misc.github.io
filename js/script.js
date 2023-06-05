const blogContainer = document.querySelector('.blog__container');
const blogModal = document.querySelector(".blog__modal__body");

// a function for creating a new card
const newCard = ({
    id,
    imageUrl,
    blogTitle,
    blogType,
    blogDescription
}) => `<div class="col-lg-4 col-md-6" id=${id}>
<div class="card m-2">
  <div class="card-header d-flex justify-content-end gap-2">
    
    <button type="button" class="btn btn-outline-danger" id="${id}" onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash-alt" id="${id}" onclick="deleteCard.apply(this, arguments)"></i></button>
  </div>
  <img
    src=${imageUrl}
    class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${blogTitle}</h5>
    <p class="card-text">${blogDescription}</p>
    <span class="badge bg-primary">${blogType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" id="${id}" class="btn btn-outline-primary float-end" data-bs-toggle="modal"
    data-bs-target="#showblog" onclick="openBlog.apply(this, arguments)">Open Blog</button>
  </div>
</div>
</div>`;


const loadData = async () => {

    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "login.html"
    }

    var cards = [];

    await fetch("http://localhost:4000/api/getAllBlogs", {
        method: "GET"
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === "success") {
                cards = data.data;
                cards.map((blogObject) => {
                    const createNewBlog = newCard(blogObject);
                    blogContainer.insertAdjacentHTML("beforeend", createNewBlog);
                    //globalStore.push(blogObject);
                });
            }
        });
};

const saveChanges = async () => {
    var id = `${Date.now()}`;
    var imageUrl = document.getElementById('imageurl').value;
    var blogTitle = document.getElementById('title').value;
    var blogType = document.getElementById('type').value;
    var blogDescription = document.getElementById('description').value;

    await fetch("http://localhost:4000/api/createBlog", {
        method: "POST",
        body: JSON.stringify({ id, imageUrl, blogTitle, blogType, blogDescription }),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === "success") {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Something went wrong");
        });

    document.getElementById("imageurl").value = "";
    document.getElementById("title").value = "";
    document.getElementById("type").value = "";
    document.getElementById("description").value = "";

    location.reload();
};

const closeAndClear = () => {
    document.getElementById("imageurl").value = "";
    document.getElementById("title").value = "";
    document.getElementById("type").value = "";
    document.getElementById("description").value = "";
}

// function for deleting a card -------------------

const deleteCard = async (event) => {
    // id
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName; // BUTTON OR I

    //console.log(targetID);

    await fetch("http://localhost:4000/api/deleteBlog", {
        method: "DELETE",
        body: JSON.stringify({ id: targetID }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === "success") {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Something went wrong");
        });

    location.reload();
};

// function for editing

const htmlModalContent = ({
    id,
    blogTitle,
    blogDescription,
    imageUrl,
    blogType
}) => {
    const date = new Date(parseInt(id));
    return ` <div id=${id}>
   <img
   src=${imageUrl}
   alt="bg image"
   class="img-fluid place__holder__image mb-3 p-4"
   />
   <div class="text-sm text-muted ">Created on ${date.toDateString()}</div>
   <h2 class="my-5 mt-5" style="display:inline;">${blogTitle}</h2>
   <span class="badge bg-primary">${blogType}</span>
   <p class="lead mt-2">
   ${blogDescription}
   </p></div>`;
};

const openBlog = async (event) => {

    event = window.event;
    const targetID = event.target.id;

    console.log(targetID);

    await fetch("http://localhost:4000/api/getBlog", {
        method: "POST",
        body: JSON.stringify({ id: targetID }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === "success") {
                blogModal.innerHTML = htmlModalContent(data.data[0]);
            }
        });
};

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}