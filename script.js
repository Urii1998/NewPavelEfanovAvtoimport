// FOUC Prevention и установка тёмной темы по умолчанию
(function() {
  const theme = 'dark';
  document.documentElement.classList.add(theme);
  localStorage.setItem('theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  themeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';
})();

// Initialize AOS
AOS.init({ duration: 800, once: true });

// Loader
window.addEventListener('load', () => {
  document.getElementById('loader').classList.add('hidden');
  const video = document.getElementById('background-video');
  if (video) {
    video.play().catch(error => {
      console.log('Автозапуск видео заблокирован: ', error);
      setTimeout(() => {
        if (video.paused) {
          video.play().catch(error => console.log('Повторная ошибка: ', error));
        }
      }, 500);
    });
  }
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
document.getElementById('country-filter')?.addEventListener('change', filterCars);
document.getElementById('brand-filter')?.addEventListener('change', filterCars);
document.getElementById('modal-country-filter')?.addEventListener('change', filterCars);
document.getElementById('modal-brand-filter')?.addEventListener('change', filterCars);
function filterCars() {
  const country = document.getElementById('country-filter')?.value || document.getElementById('modal-country-filter')?.value;
  const brand = document.getElementById('brand-filter')?.value || document.getElementById('modal-brand-filter')?.value;
  const cars = document.querySelectorAll('#car-gallery > div');
  cars.forEach(car => {
    const carCountry = car.getAttribute('data-country');
    const carBrand = car.getAttribute('data-brand');
    if ((