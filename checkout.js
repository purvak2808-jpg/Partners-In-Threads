```javascript
// ======================================
// DISPLAY CHECKOUT ITEMS
// ======================================

function displayCheckoutItems() {
    const checkoutCart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");

    if (!checkoutItems || !checkoutTotal) return;

    if (checkoutCart.length === 0) {
        checkoutItems.innerHTML = `
            <div class="empty">
                <h3>Your cart is empty</h3>
                <p>Please add products before checkout.</p>
                <a href="products.html" class="btn primary">
                    Browse Products
                </a>
            </div>
        `;

        checkoutTotal.textContent = "₹0";
        return;
    }

    let total = 0;

    checkoutItems.innerHTML = checkoutCart.map(function(item) {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const itemTotal = price * quantity;

        total += itemTotal;

        return `
            <div class="checkout-item">
                <div class="checkout-item-image">
                    <img
                        src="${item.image || ""}"
                        alt="${item.name || "Crochet product"}"
                    >
                </div>

                <div class="checkout-item-info">
                    <h3>${item.name || "Crochet product"}</h3>
                    <p>₹${price} × ${quantity}</p>
                </div>

                <strong>₹${itemTotal}</strong>
            </div>
        `;
    }).join("");

    checkoutTotal.textContent = "₹" + total;
}


// ======================================
// PAYMENT OPTIONS
// ======================================

function setupPaymentOptions() {
    const paymentOptions =
        document.querySelectorAll('input[name="payment"]');

    const upiBox =
        document.getElementById("upi-payment-box");

    const upiConfirmation =
        document.getElementById("upi-confirmation");

    if (!upiBox) return;

    function updatePaymentDisplay() {
        const selectedPayment =
            document.querySelector('input[name="payment"]:checked');

        const isUpi =
            selectedPayment && selectedPayment.value === "upi";

        upiBox.style.display = isUpi ? "block" : "none";

        if (upiConfirmation) {
            upiConfirmation.required = Boolean(isUpi);
        }
    }

    paymentOptions.forEach(function(option) {
        option.addEventListener("change", updatePaymentDisplay);
    });

    updatePaymentDisplay();
}


// ======================================
// PLACE ORDER
// ======================================

function placeOrder(event) {
    event.preventDefault();

    const checkoutCart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (checkoutCart.length === 0) {
        alert("Your cart is empty! Please add products first.");
        return;
    }

    const name =
        document.getElementById("customer-name").value.trim();

    const phone =
        document.getElementById("customer-phone").value.trim();

    const email =
        document.getElementById("customer-email").value.trim();

    const address =
        document.getElementById("customer-address").value.trim();

    const city =
        document.getElementById("customer-city").value.trim();

    const pincode =
        document.getElementById("customer-pincode").value.trim();

    const paymentElement =
        document.querySelector('input[name="payment"]:checked');

    if (!paymentElement) {
        alert("Please select a payment method.");
        return;
    }

    const paymentMethod = paymentElement.value;

    // Confirm UPI payment selection.
    // This checkbox does not independently verify a real payment.
    if (paymentMethod === "upi") {
        const upiConfirmation =
            document.getElementById("upi-confirmation");

        if (!upiConfirmation || !upiConfirmation.checked) {
            alert("Please confirm your UPI payment before continuing.");
            return;
        }
    }

    // Calculate order total.
    const total = checkoutCart.reduce(function(sum, item) {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;

        return sum + price * quantity;
    }, 0);

    // Generate order ID.
    const orderId =
        "PIT" + Date.now().toString().slice(-8);

    // Create order details.
    const order = {
        orderId: orderId,
        date: new Date().toLocaleString(),

        customer: {
            name: name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            pincode: pincode
        },

        paymentMethod: paymentMethod,

        paymentStatus: paymentMethod === "cod"
            ? "Cash on Delivery — unpaid"
            : "UPI confirmation provided by customer — unverified",

        items: checkoutCart,
        total: total
    };

    // Save the latest order in this browser.
    try {
        localStorage.setItem("lastOrder", JSON.stringify(order));
    } catch (error) {
        alert("Unable to save your order in this browser. Please try again.");
        return;
    }

    // Clear cart after saving the order.
    localStorage.removeItem("cart");

    // Redirect to order confirmation page.
    window.location.href = "order-success.html";
}


// ======================================
// PAGE INITIALIZATION
// ======================================

document.addEventListener("DOMContentLoaded", function() {
    displayCheckoutItems();
    setupPaymentOptions();

    const checkoutForm =
        document.getElementById("checkout-form");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", placeOrder);
    }
});
```
