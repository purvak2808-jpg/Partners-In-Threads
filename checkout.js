function displayCheckoutItems() {

    const checkoutCart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");

    if (!checkoutItems || !checkoutTotal) {
        return;
    }

    if (checkoutCart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Please add products before checkout.</p>
            </div>
        `;

        checkoutTotal.textContent = "₹0";
        return;
    }

    let total = 0;

    checkoutItems.innerHTML = checkoutCart.map(function(item) {

        const price = Number(item.price);
        const quantity = Number(item.quantity) || 1;
        const itemTotal = price * quantity;

        total += itemTotal;

        return `
            <div class="checkout-item">

                <div class="checkout-item-image">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >
                </div>

                <div class="checkout-item-info">
                    <h3>${item.name}</h3>
                    <p>₹${price} × ${quantity}</p>
                </div>

                <strong>₹${itemTotal}</strong>

            </div>
        `;

    }).join("");

    checkoutTotal.textContent = "₹" + total;
}


// PAYMENT METHOD

function setupPaymentOptions() {

    const paymentOptions =
        document.querySelectorAll('input[name="payment"]');

    const upiBox =
        document.getElementById("upi-payment-box");

    if (!upiBox) {
        return;
    }

    paymentOptions.forEach(function(option) {

        option.addEventListener("change", function() {

            if (this.value === "upi") {
                upiBox.style.display = "block";
            } else {
                upiBox.style.display = "none";
            }

        });

    });
}


// PLACE ORDER

function placeOrder(event) {

    event.preventDefault();

    const checkoutCart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (checkoutCart.length === 0) {
        alert("Your cart is empty!");
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

    const paymentMethod =
        paymentElement.value;


    // UPI CONFIRMATION

    if (paymentMethod === "upi") {

        const upiConfirmation =
            document.getElementById("upi-confirmation");

        if (!upiConfirmation || !upiConfirmation.checked) {

            alert(
                "Please confirm that you have completed the UPI payment."
            );

            return;
        }
    }


    // CALCULATE TOTAL

    const total = checkoutCart.reduce(
        function(sum, item) {

            return sum +
                Number(item.price) *
                Number(item.quantity);

        },
        0
    );


    // GENERATE ORDER ID

    const orderId =
        "PIT" +
        Date.now().toString().slice(-8);


    // CREATE ORDER

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

        paymentStatus:
            paymentMethod === "cod"
                ? "Cash on Delivery"
                : "UPI payment confirmed by customer",

        items: checkoutCart,

        total: total
    };


    // SAVE ORDER

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    // REMOVE CART

    localStorage.removeItem("cart");


    // OPEN SUCCESS PAGE

    window.location.href =
        "order-success.html";
}


// PAGE LOAD

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCheckoutItems();

        setupPaymentOptions();

        const checkoutForm =
            document.getElementById("checkout-form");

        if (checkoutForm) {

            checkoutForm.addEventListener(
                "submit",
                placeOrder
            );

        }

    }
);