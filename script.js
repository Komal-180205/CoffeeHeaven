const products = [
  // 🔥 Hot Coffees
  { id: 1, name: "Espresso", price: 120, image: "espresso.png", category: "Hot", rating:4.5 },
  { id: 2, name: "Americano", price: 130, image: "americano4.jpeg", category: "Hot" ,rating:4},
  { id: 3, name: "Cappuccino", price: 150, image: "cappuccino.png", category: "Hot",rating:4.5 },
  { id: 4, name: "Latte", price: 160, image: "latte1.jpg" , category: "Hot",rating:4.5 },
  { id: 5, name: "Mocha", price: 170, image: "mocha.jpg", category: "Hot",rating:4},

  // 🧊 Iced Coffees
  { id: 6, name: "Iced Latte", price: 160, image: "icedlatte1.jpeg", category: "Iced" ,rating:4.5},
  { id: 7, name: "Cold Brew", price: 180, image: "coldbrew2.jpg", category: "Iced" ,rating:4},
  { id: 8, name: "Frappuccino", price: 190, image: "frappuccino2.jpeg", category: "Iced",rating:4.5 },
  { id: 9, name: "Vietnamese Iced Coffee", price: 175, image: "vietnameseiced.jpeg", category: "Iced" ,rating:4.5},

  // 🌟 Special Coffees
  { id: 10, name: "Affogato", price: 200, image: "affogato.jpeg", category: "Special",rating:5 },
  { id: 11, name: "Turkish Coffee", price: 160, image: "turkishcoffee.jpg", category: "Special",rating:3.5 },
  { id: 12, name: "Irish Coffee", price: 220, image: "IrishCoffee3.jpeg", category: "Special" ,rating:5},
  { id: 13, name: "Café Bombón", price: 160, image: "cafebambon.jpg", category: "Special" ,rating:4}
];

const cart = [];

function showProducts() {
  const hot = document.getElementById("hot");
  const iced = document.getElementById("iced");
  const special = document.getElementById("special");

  hot.innerHTML = '';
  iced.innerHTML = '';
  special.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" class="coffee-img">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button class="add-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    if (product.category === "Hot") hot.appendChild(card);
    else if (product.category === "Iced") iced.appendChild(card);
    else if (product.category === "Special") special.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1 // ✅ FIX: quantity must start at 1
    });
  }

  updateCart();
  showPopup();
}

function showPopup() {
  const popup = document.getElementById("popup-message");
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const totalPrice = document.getElementById('totalPrice');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div style="margin-bottom: 10px;">
        <strong>${item.name}</strong> – ₹${item.price}
        <div class="qty-controls">
          <button onclick="removeFromCart(${index})" class="trash">🗑️</button>
          <button onclick="changeQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>
      </div>
    `;

    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  totalPrice.textContent = total;
}
function changeQuantity(index, delta) {
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // remove item if quantity is 0 or less
  }

  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}


document.getElementById('cartBtn').addEventListener('click', () => {
  document.getElementById('cart').classList.toggle('hidden');
});

function checkout() {
  alert("Thanks for your order!");
  cart.length = 0;
  updateCart();
}

showProducts();