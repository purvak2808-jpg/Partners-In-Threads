 document.addEventListener("DOMContentLoaded", function () {

    const orderData = localStorage.getItem("lastOrder");

    if (!orderData) {
        document.getElementById("success-order-id").textContent =
            "No order found";
        return;
    }

    const order = JSON.parse(orderData);


    // ORDER ID

    document.getElementById("success-order-id").textContent =
        order.orderId;


    // CUSTOMER DETAILS

    const customerBox =
        document.getElementById("success-customer");

    customerBox.innerHTML = `
        <p><strong>Name:</strong> ${order.customer.name}</p>

        <p><strong>Mobile:</strong> ${order.customer.phone}</p>

        <p><strong>Email:</strong> ${order.customer.email}</p>

        <p>
            <strong>Delivery Address:</strong><br>
            ${order.customer.address}<br>
            ${order.customer.city} -
            ${order.customer.pincode}
        </p>

        <p>
            <strong>Payment:</strong>
            ${order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "UPI Payment Selected"}
        </p>
    `;


    // PRODUCTS

    const itemsBox =
        document.getElementById("success-items");

    itemsBox.innerHTML = order.items.map(item => {

        const itemTotal =
            Number(item.price) * Number(item.quantity);

        return `
            <div class="success-item">

                <div class="success-item-image">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >
                </div>

                <div class="success-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                </div>

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>
        `;

    }).join("");


    // TOTAL

    document.getElementById("success-total").textContent =
        "₹" + order.total;

});