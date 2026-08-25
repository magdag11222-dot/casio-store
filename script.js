let cart = [];

function addToCart(title, price) {
  cart.push({ title, price });
  updateCartUI();
  alert('Товар "' + title + '" добавлен в корзину!');
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
  
  const itemsList = document.getElementById('cart-items');
  itemsList.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.title}</span> <span>${item.price} ₽</span>`;
    itemsList.appendChild(li);
  });

  document.getElementById('cart-total').innerText = total;
}

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function checkout() {
  if (cart.length === 0) {
    alert('Корзина пуста!');
    return;
  }
  
  // Замените на ваш юзернейм Telegram (без @)
  const telegramUsername = 'your_username'; 
  
  let text = 'Здравствуйте! Хочу сделать заказ в Casio Store:\n\n';
  cart.forEach((item, index) => {
    text += `${index + 1}. ${item.title} — ${item.price} ₽\n`;
  });
  text += `\nИтого к оплате: ${document.getElementById('cart-total').innerText} ₽`;

  const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}