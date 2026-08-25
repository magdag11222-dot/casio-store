let cart = [];

function addToCart(title, price) {
  cart.push({ title, price });
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  const cartBtn = document.querySelector('.cart-btn');
  
  cartCount.innerText = cart.length;
  
  // Если в корзине есть товары — включаем подсветку, если пуста — выключаем
  if (cart.length > 0) {
    cartBtn.classList.add('cart-has-items');
  } else {
    cartBtn.classList.remove('cart-has-items');
  }

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
  
  const telegramUsername = 'hshaha11'; 
  
  let text = 'Здравствуйте! Хочу сделать заказ в Casio Store:\n\n';
  cart.forEach((item, index) => {
    text += `${index + 1}. ${item.title} — ${item.price} ₽\n`;
  });
  text += `\nИтого к оплате: ${document.getElementById('cart-total').innerText} ₽`;

  const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// Принудительный запуск видео для Яндекс Браузера
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bgVideo');
  if (video) {
    video.play().catch(() => {
      document.addEventListener('click', () => video.play(), { once: true });
    });
  }
});
