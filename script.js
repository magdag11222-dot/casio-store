let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartBtn = document.querySelector('.cart-btn');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartCount.innerText = cart.length;

  if (cart.length > 0) {
    cartBtn.classList.add('cart-has-items');
  } else {
    cartBtn.classList.remove('cart-has-items');
  }

  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ${item.price} ₽ <button style="width:auto; padding:2px 8px; background:#ef4444;" onclick="removeFromCart(${index})">✕</button>`;
    cartItems.appendChild(li);
  });

  cartTotal.innerText = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function checkout() {
  if (cart.length === 0) {
    alert('Ваша корзина пуста!');
    return;
  }
  let message = 'Здравствуйте! Хочу оформить заказ:%0A';
  cart.forEach(item => {
    message += `- ${item.name} (${item.price} ₽)%0A`;
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `%0AИтого: ${total} ₽`;

  window.open(`https://t.me/Hshaha11?text=${message}`, '_blank');
}

// Поиск
function filterProducts() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.product-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const name = card.getAttribute('data-name');
    if (name.includes(searchValue)) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const noResults = document.getElementById('noResults');
  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}
