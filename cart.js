let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ADD PRODUCT TO CART
function addToCart(name, price, image) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}


// UPDATE CART COUNT
function updateCartCount() {

    const count = cart.reduce(function(total, item) {
        return total + Number(item.quantity);
    }, 0);

    document.querySelectorAll(".cart-count").forEach(function(element) {
        element.textContent = count;
    });
}


// DISPLAY CART
function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) {
        return;
    }

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some beautiful handmade products!</p>
            </div>
        `;

        if (cartTotal) {
            cartTotal.textContent = "₹0";
        }

        return;
    }

    let total = 0;

    cartItems.innerHTML = cart.map(function(item, index) {

        const price = Number(item.price);
        const quantity = Number(item.quantity);
        const itemTotal = price * quantity;

        total += itemTotal;

        return `
            <div class="cart-item">

                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>₹${price}</p>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>${quantity}</span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <div class="cart-item-right">

                    <strong>₹${itemTotal}</strong>

                    <button onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

            </div>
        `;

    }).join("");

    if (cartTotal) {
        cartTotal.textContent = "₹" + total;
    }
}


// CHANGE QUANTITY
function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    displayCart();
}


// REMOVE PRODUCT
function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    displayCart();
}


// GO TO CHECKOUT
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "checkout.html";
}


// RUN WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();
    displayCart();

});