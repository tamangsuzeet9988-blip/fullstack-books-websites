let books = [
    {
        id: 1,
        title: "Book One",
        author: "Author One",
        image: "images/book1.png"
    },
    {
        id: 2,
        title: "Book Two",
        author: "Author Two",
        image: "images/book2.png"
    },
    {
        id: 3,
        title: "Book Three",
        author: "Author Three",
        image: "images/book3.png"
    },
    {
        id: 4,
        title: "Book Four",
        author: "Author Four",
        image: "images/book4.png"
    }
];

function loadBooks() {
    let container = document.getElementById("book-list");
    container.innerHTML = "";

    books.forEach(book => {
        container.innerHTML += `
            <div class="book-card">
                <img src="${book.image}" alt="${book.title}">
                <h2>${book.title}</h2>
                <p>${book.author}</p>

                <a href="update.html?id=${book.id}">
                    <button class="update-btn">Update</button>
                </a>

                <button onclick="deleteBook(${book.id})" class="delete-btn">Delete</button>
            </div>
        `;
    });
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    loadBooks();
}

window.onload = loadBooks;