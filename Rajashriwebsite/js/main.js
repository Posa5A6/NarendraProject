/* main.js — shared behavior for Hotel Rajshri site */

const SITE_DATA = {
  brand: 'Hotel Rajshri',
  tagline: 'Shruthi Pure Veg. AC Restaurant',
  phone: 'Phone number will be updated soon',
  whatsapp: 'WhatsApp number will be updated soon',
  email: 'Email address will be updated soon',
  address: 'Address will be updated soon',
  hours: 'Opening hours will be updated soon',
  mapsUrl: 'https://maps.app.goo.gl/SzLeYBXX1wdb878n8?g_st=aw'
};

const NAV_LINKS = [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'Menu', href: 'menu.html' },
  { label: 'Gallery', href: 'gallery.html' },
  { label: 'Contact', href: 'contact.html' }
];

function renderNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = NAV_LINKS.map(link => {
    const isActive = (link.href === currentPage || (currentPage === '' && link.href === 'index.html')) ? 'active' : '';
    return `<a class="nav-link ${isActive}" href="${link.href}">${link.label}</a>`;
  }).join('');

  header.innerHTML = `
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          Hotel Rajshri
          <span>Shruthi Pure Veg. AC Restaurant</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#rajshriNavbar" aria-controls="rajshriNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="rajshriNavbar">
          <div class="navbar-nav ms-auto align-items-lg-center">
            ${navItems}
            <a class="btn-order-nav" href="order.html"><i class="fa-solid fa-utensils me-1"></i> Order Food</a>
          </div>
        </div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-6">
            <div class="footer-brand">${SITE_DATA.brand}</div>
            <div class="footer-tagline">${SITE_DATA.tagline}</div>
            <p class="mt-3 text-white-50">
              Fresh, pure vegetarian food for local guests, travellers, and train passengers.
            </p>
            <div class="social-links">
              <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
          <div class="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="menu.html">Menu</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="order.html">Order Food</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5>Contact</h5>
            <div class="footer-contact">
              <p><i class="fa-solid fa-phone me-2"></i> ${SITE_DATA.phone}</p>
              <p><i class="fa-brands fa-whatsapp me-2"></i> ${SITE_DATA.whatsapp}</p>
              <p><i class="fa-solid fa-envelope me-2"></i> ${SITE_DATA.email}</p>
              <p><i class="fa-regular fa-clock me-2"></i> ${SITE_DATA.hours}</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5>Location</h5>
            <p class="text-white-50">${SITE_DATA.address}</p>
            <a class="btn btn-sm btn-outline-light rounded-pill mt-2" href="${SITE_DATA.mapsUrl}" target="_blank" rel="noopener noreferrer">
              <i class="fa-solid fa-location-dot me-1"></i> Get Directions
            </a>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="mb-0">&copy; ${new Date().getFullYear()} ${SITE_DATA.brand}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
  }

  const toastEl = document.createElement('div');
  toastEl.className = `toast align-items-center text-white bg-${type === 'info' ? 'primary-green' : type} border-0`;
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  container.appendChild(toastEl);

  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();

  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

function initComingSoonButtons() {
  document.body.addEventListener('click', e => {
    const target = e.target.closest('[data-coming-soon]');
    if (target) {
      e.preventDefault();
      showToast(target.dataset.comingSoon || 'Coming soon!', 'info');
    }
  });
}

function initCustomStyles() {
  // Add a dynamic style for Bootstrap's bg-primary-green since it's custom
  const style = document.createElement('style');
  style.textContent = `.bg-primary-green { background-color: var(--primary-green) !important; color: #fff; }`;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  handleNavbarScroll();
  initScrollReveal();
  initComingSoonButtons();
  initCustomStyles();

  window.addEventListener('scroll', handleNavbarScroll);
});
