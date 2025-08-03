// FOUC Prevention
(function() {
  const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.add(theme);
})();

// Initialize AOS
AOS.init({ duration: 800, once: true });

// Loader
window.addEventListener('load', () => {
  document.getElementById('loader').classList.add('hidden');
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const footerThemeToggle = document.getElementById('footer-theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const setTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
  }
  localStorage.setItem('theme', theme);
};
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);
themeToggle.addEventListener('click', () => setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark'));
footerThemeToggle.addEventListener('click', () => setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark'));

// Ripple Effect
document.querySelectorAll('.ripple').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Modal
function openModal(title, country, details, price, city, img) {
  document.getElementById('modal-title').textContent = `${title}, ${country}`;
  document.getElementById('modal-img').src = img;
  document.getElementById('modal-img').alt = `Автомобиль ${title} из ${country}`;
  document.getElementById('modal-details').textContent = details;
  document.getElementById('modal-price').textContent = price;
  document.getElementById('modal-city').textContent = city;
  document.getElementById('modal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

// Gallery Filters
document.getElementById('country-filter').addEventListener('change', filterCars);
document.getElementById('brand-filter').addEventListener('change', filterCars);
document.getElementById('modal-country-filter').addEventListener('change', filterCars);
document.getElementById('modal-brand-filter').addEventListener('change', filterCars);
function filterCars() {
  const country = document.getElementById('country-filter').value || document.getElementById('modal-country-filter').value;
  const brand = document.getElementById('brand-filter').value || document.getElementById('modal-brand-filter').value;
  const cars = document.querySelectorAll('#car-gallery > div');
  cars.forEach(car => {
    const carCountry = car.getAttribute('data-country');
    const carBrand = car.getAttribute('data-brand');
    if ((country === 'all' || country === carCountry) && (brand === 'all' || brand === carBrand)) {
      car.style.display = 'block';
    } else {
      car.style.display = 'none';
    }
  });
}

// Calculator
document.getElementById('calculate').addEventListener('click', () => {
  const country = document.getElementById('country').value;
  const carType = document.getElementById('car-type').value;
  const engineInput = document.getElementById('engine');
  const yearInput = document.getElementById('year');
  let engine = engineInput.value.replace(',', '.');
  let year = parseInt(yearInput.value) || 0;
  let isValid = true;
  if (!engine) {
    engineInput.classList.add('border-red-500');
    isValid = false;
  } else {
    engineInput.classList.remove('border-red-500');
  }
  if (!year || year < 2000 || year > 2025) {
    yearInput.classList.add('border-red-500');
    isValid = false;
  } else {
    yearInput.classList.remove('border-red-500');
  }
  if (!isValid) {
    document.getElementById('calc-result').textContent = 'Пожалуйста, заполните все поля корректно';
    return;
  }
  engine = parseFloat(engine);
  let baseCost = 1000000;
  if (country === 'Япония') baseCost += 200000;
  if (country === 'Германия') baseCost += 500000;
  if (carType === 'Электрокар') baseCost += 300000;
  if (carType === 'Гибрид') baseCost += 150000;
  baseCost += engine * 200000;
  if (year > 2020) baseCost += (year - 2020) * 100000;
  document.getElementById('calc-result').textContent = `Ориентировочная стоимость: ${baseCost.toLocaleString()} ₽`;
  AOS.refresh();
});

// Accordion
document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const isOpen = content.classList.contains('open');
    document.querySelectorAll('.accordion-content').forEach(c => {
      c.classList.remove('open');
      c.previousElementSibling.querySelector('svg').style.transform = 'rotate(0deg)';
    });
    if (!isOpen) {
      content.classList.add('open');
      button.querySelector('svg').style.transform = 'rotate(180deg)';
    }
  });
});

// Question Form
document.getElementById('submit-question').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const question = document.getElementById('question').value;
  let isValid = true;
  if (!name) {
    document.getElementById('name').classList.add('border-red-500');
    isValid = false;
  } else {
    document.getElementById('name').classList.remove('border-red-500');
  }
  if (!phone || !/^\+?\d{10,12}$/.test(phone.replace(/\D/g, ''))) {
    document.getElementById('phone').classList.add('border-red-500');
    isValid = false;
  } else {
    document.getElementById('phone').classList.remove('border-red-500');
  }
  if (!question) {
    document.getElementById('question').classList.add('border-red-500');
    isValid = false;
  } else {
    document.getElementById('question').classList.remove('border-red-500');
  }
  if (isValid) {
    const mailtoLink = `mailto:efanov_pavel21@mail.ru?subject=Вопрос от ${name}&body=Имя: ${name}%0D%0AТелефон: ${phone}%0D%0AВопрос: ${question}`;
    window.location.href = mailtoLink;
    document.getElementById('form-result').textContent = 'Ваш вопрос отправлен! Я свяжусь с вами в ближайшее время.';
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('question').value = '';
  } else {
    document.getElementById('form-result').textContent = 'Пожалуйста, заполните все поля корректно';
  }
});

// Visit Counter
function updateVisitCount() {
  let count = localStorage.getItem('visitCount');
  if (count === null) {
    count = 1;
  } else {
    count = parseInt(count) + 1;
  }
  localStorage.setItem('visitCount', count);
  document.getElementById('visit-count').textContent = count;
}
window.addEventListener('load', updateVisitCount);