// Navigation, lightbox, and gentle reveal animations for the static GitHub Pages site.
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');
const modal = document.querySelector('[data-lightbox-modal]');
const modalImage = document.querySelector('[data-lightbox-image]');
const modalCaption = document.querySelector('[data-lightbox-caption]');
const closeModal = document.querySelector('[data-lightbox-close]');

year.textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    modalImage.src = button.dataset.lightbox;
    modalImage.alt = `${button.dataset.title}の拡大画像`;
    modalCaption.textContent = button.dataset.title;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    closeModal.focus();
  });
});

const hideLightbox = () => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
};

closeModal.addEventListener('click', hideLightbox);
modal.addEventListener('click', (event) => {
  if (event.target === modal) hideLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) hideLightbox();
});
