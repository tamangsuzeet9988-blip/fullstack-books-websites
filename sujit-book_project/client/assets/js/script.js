const API = "http://localhost:5000/api"; // YOUR SERVER URL

// ---------- BOOK LIST ----------
if (document.getElementById("bookList")) {
    loadBooks();
}

async function loadBooks() {
    const res = await fetch(`${API}/books`);
    const books = await res.json();

    const container = document.getElementById("bookList");
    container.innerHTML = books.map(book => `
        <div class="book-card">
            <img src="${book.image}">
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p>$${book.price}</p>
            <a class="btn" href="book-detail.html?id=${book.id}">View</a>
        </div>
    `).join("");
}

// ---------- BOOK DETAILS ----------
if (document.getElementById("bookDetails")) {
    loadBookDetails();
}

async function loadBookDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch(`${API}/books/${id}`);
    const book = await res.json();

    const div = document.getElementById("bookDetails");
    div.innerHTML = `
        <h2>${book.title}</h2>
        <img src="${book.image}" width="200">
        <p><strong>Author:</strong> ${book.author}</p>
        <p>${book.description}</p>
        <p><strong>Price:</strong> $${book.price}</p>
        <button class="btn" onclick="addToCart(${book.id})">Add to Cart</button>
    `;
}

// ---------- CART ----------
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const exist = cart.find(i => i.bookId === id);
    if (exist) exist.qty += 1;
    else cart.push({ bookId: id, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

if (document.getElementById("cartItems")) {
    loadCart();
}

async function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.length === 0) {
        document.getElementById("cartItems").innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    // send to server to calculate
    const res = await fetch(`${API}/cart/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart })
    });
    const data = await res.json();

    let html = "";
    data.items.forEach(item => {
        html += `
            <p>${item.title} (x${item.qty}) - $${item.lineTotal.toFixed(2)}</p>
        `;
    });

    document.getElementById("cartItems").innerHTML = html;
    document.getElementById("cartTotal").innerText = "Total: $" + data.total.toFixed(2);

    document.getElementById("checkoutBtn").onclick = () => checkout(cart, data.total);
}

// ----- CHECKOUT -----
async function checkout(items, total) {
    const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total })
    });

    const order = await res.json();
    alert("Order placed! ID: " + order.orderId);

    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
