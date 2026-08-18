/* gallery.js — gallery grid and lightbox for Hotel Rajshri */

const GALLERY_IMAGES = [
  {
    src: 'assets/images/exterior-signboard.jpeg',
    thumb: 'assets/images/exterior-signboard.jpeg',
    caption: 'Hotel Rajshri Signboard'
  },
  {
    src: 'assets/images/interior-name-sign.jpeg',
    thumb: 'assets/images/interior-name-sign.jpeg',
    caption: 'Hotel Rajshri Interior Name Sign'
  },
  {
    src: 'assets/images/dining-area-customers.jpeg',
    thumb: 'assets/images/dining-area-customers.jpeg',
    caption: 'Dining Area'
  },
  {
    src: 'assets/images/interior-seating-booths.jpeg',
    thumb: 'assets/images/interior-seating-booths.jpeg',
    caption: 'Comfortable Seating'
  },
  {
    src: 'assets/images/sweets-display-counter.jpeg',
    thumb: 'assets/images/sweets-display-counter.jpeg',
    caption: 'Food & Sweets Display Counter'
  },
  {
    src: 'assets/images/regular-menu-handwritten.jpeg',
    thumb: 'assets/images/regular-menu-handwritten.jpeg',
    caption: 'Regular Pure Veg Menu'
  }
];

let currentImageIndex = 0;

function renderGallery(containerId, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const images = limit ? GALLERY_IMAGES.slice(0, limit) : GALLERY_IMAGES;

  container.innerHTML = images.map((img, index) => `
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="gallery-item img-hover-zoom" data-index="${index}" data-caption="${img.caption}" data-src="${img.src}">
        <img src="${img.thumb}" alt="${img.caption}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-overlay-text"><i class="fa-solid fa-expand me-2"></i>${img.caption}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openLightbox(index) {
  currentImageIndex = index;
  updateLightboxImage();

  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function updateLightboxImage() {
  const img = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const image = GALLERY_IMAGES[currentImageIndex];

  if (img) img.src = image.src;
  if (caption) caption.textContent = image.caption;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % GALLERY_IMAGES.length;
  updateLightboxImage();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  updateLightboxImage();
}

function initLightbox() {
  const modal = document.createElement('div');
  modal.id = 'lightbox-modal';
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <button class="lightbox-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    <button class="lightbox-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
    <img id="lightbox-image" class="lightbox-img" src="" alt="Gallery Image">
    <p id="lightbox-caption" class="text-white mt-3 text-center position-absolute bottom-0 mb-4"></p>
    <button class="lightbox-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  modal.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
  modal.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
  modal.addEventListener('click', (e) => { if (e.target === modal) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

function initGalleryClicks() {
  document.body.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      const index = parseInt(item.dataset.index, 10);
      openLightbox(index);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initGalleryClicks();
});
