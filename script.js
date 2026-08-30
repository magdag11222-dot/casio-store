let cart = [];
let activeCategory = 'all';

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartCount.innerText = cart.length;
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ${item.price} ₽ <button onclick="removeFromCart(${index})" style="border:none; background:none; cursor:pointer; color:red;">✕</button>`;
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

function scrollToProducts() {
  document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
}

function filterCategory(category, btnElement) {
  activeCategory = category;
  document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  filterProducts();
}

function filterProducts() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const name = card.getAttribute('data-name');
    const category = card.getAttribute('data-category');

    const matchesSearch = name.includes(searchValue);
    const matchesCategory = activeCategory === 'all' || category === activeCategory;

    if (matchesSearch && matchesCategory) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Функция смены фото при клике на миниатюру
function changeModalPhoto(element) {
  document.getElementById('modal-main-img').src = element.src;
  document.querySelectorAll('.modal-thumbs .thumb').forEach(img => img.classList.remove('active'));
  element.classList.add('active');
}

// Открытие и закрытие окна
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('product-modal');
  const closeBtn = document.querySelector('.close-modal');

  // Вешаем клик на все карточки товаров
  const cards = document.querySelectorAll('.card, .product-card, [class*="card"]');
  
  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
      // Если нажимают на саму кнопку "В корзину", окно не открывается
      if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
        return;
      }
      
      // Открываем модальное окно
      if (modal) {
        modal.classList.add('active');
      }
    });
  });

  // Закрытие по крестику
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.classList.remove('active');
    });
  }

  // Закрытие по клику мимо окна
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});
