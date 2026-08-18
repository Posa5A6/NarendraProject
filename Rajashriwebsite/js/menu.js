/* menu.js — static regular pure-vegetarian menu data and rendering.
 * Source of truth: regular-menu-handwritten.jpeg (assets/images/).
 * When the backend is ready, this array can be replaced by a fetch() call to a Django API.
 */

const MENU_CURRENCY = '₹';

/*
  Handwritten menu transcription from regular-menu-handwritten.jpeg.
  Items/prices marked with "(verify)" are genuinely unclear in the handwritten
  image and must be confirmed by the client before going live.
*/
const menuData = [
  {
    category: 'Paneer Specialties',
    items: [
      { name: 'Pudina Paneer', price: 385, description: 'Paneer in fresh mint-based gravy', image: null },
      { name: 'Paneer Shahi Kaju', price: 385, description: 'Paneer and cashew in royal gravy', image: null },
      { name: 'Paneer Bhurji', price: 385, description: 'Scrambled paneer with spices', image: null },
      { name: 'Paneer Kofta', price: 406, description: 'Paneer dumplings in rich gravy', image: null },
      { name: 'Paneer Mutter', price: 406, description: 'Paneer and green peas curry', image: null },
      { name: 'Kaju Paneer', price: 406, description: 'Paneer and cashew nut curry', image: null },
      { name: 'Kadai Paneer', price: 406, description: 'Paneer tossed with kadai spices and capsicum', image: null },
      { name: 'Achari Paneer', price: 406, description: 'Paneer in tangy pickle-spiced gravy', image: null }
    ]
  },
  {
    category: 'Vegetable Curries',
    items: [
      { name: 'Green Peas Masala', price: 385, description: 'Green peas in spiced masala gravy', image: null },
      { name: 'Capsicum Masala', price: 385, description: 'Capsicum in aromatic masala', image: null },
      { name: 'Veg Kolhapuri', price: 385, description: 'Mixed vegetables in spicy Kolhapuri gravy', image: null },
      { name: 'Veg Vaghareli', price: 364, description: 'Gujarati-style tempered vegetable curry', image: null },
      { name: 'Veg Shahi Kaju', price: 385, description: 'Mixed vegetables with cashew in royal gravy', image: null },
      { name: 'Veg Kadai', price: 406, description: 'Mixed vegetables cooked in kadai masala', image: null },
      { name: 'Methi Chaman', price: 385, description: 'Fenugreek and paneer delicacy', image: null },
      { name: 'Mat Masala (verify)', price: 365, description: 'Handwriting unclear; please confirm exact name and price', image: null }
    ]
  },
  {
    category: 'Kaju & Mushroom Specialties',
    items: [
      { name: 'Kaju Exotic', price: 406, description: 'Cashew-based special curry', image: null },
      { name: 'Kaju Korma (verify)', price: 406, description: 'Handwriting shows "Kaju Korma"; please confirm exact spelling', image: null },
      { name: 'Kaju Mushroom', price: 406, description: 'Cashew and mushroom curry', image: null },
      { name: 'Mushroom Handi', price: 406, description: 'Mushroom curry cooked in handi style', image: null },
      { name: 'Kadai Mushroom', price: 406, description: 'Mushroom tossed with kadai spices', image: null }
    ]
  },
  {
    category: 'Mixed Veg, Handi & Rolls',
    items: [
      { name: 'Mix Veg Roll', price: 336, description: 'Mixed vegetable roll', image: null },
      { name: 'Pulao Pav', price: 376, description: 'Pav served with pulao-style gravy', image: null },
      { name: 'Aloo Kaju', price: 385, description: 'Potato and cashew nut curry', image: null },
      { name: 'PBM Masala (verify)', price: 364, description: 'Handwriting shows "PBM Masala"; please confirm full name (likely Paneer Butter Masala)', image: null },
      { name: 'PVR Handi (verify)', price: 406, description: 'Handwriting shows "PVR Handi"; please confirm exact name and price', image: null }
    ]
  },
  {
    category: 'Pav & Breads',
    items: [
      { name: 'Pav (verify)', price: null, description: 'Listed as "Pav" with no visible price; please confirm', image: null }
    ]
  },
  {
    category: 'Curd / Raita',
    items: [
      { name: 'Mix Raita', price: 84, description: 'Yogurt with mixed vegetables', image: null },
      { name: 'Aloo Raita', price: 84, description: 'Yogurt with potato', image: null },
      { name: 'Tomato Raita', price: 84, description: 'Yogurt with tomato', image: null }
    ]
  },
  {
    category: 'Rice Items',
    items: [
      { name: 'Plain Rice', price: 56, description: 'Steamed basmati rice', image: null },
      { name: 'Curd Rice', price: 70, description: 'Rice tempered with yogurt', image: null },
      { name: 'Spl Curd Rice', price: 84, description: 'Special curd rice', image: null },
      { name: 'Tomato Rice', price: 196, description: 'Tomato-flavoured rice', image: null },
      { name: 'Veg Pulav', price: 196, description: 'Aromatic rice with mixed vegetables', image: null },
      { name: 'Peas Pulav', price: 210, description: 'Rice with green peas', image: null },
      { name: 'Veg Biryani', price: 224, description: 'Aromatic vegetable biryani', image: null },
      { name: 'Ghee Rice', price: 224, description: 'Basmati rice flavoured with ghee', image: null },
      { name: 'Zeera Rice', price: 224, description: 'Rice tempered with cumin', image: null },
      { name: 'Paneer Pulav', price: 294, description: 'Rice with paneer and spices', image: null },
      { name: 'Hyderabad Biryani', price: 294, description: 'Hyderabadi-style vegetable biryani', image: null },
      { name: 'Mushroom Pulav', price: 294, description: 'Rice with mushrooms and spices', image: null },
      { name: 'Handi Pulav', price: 294, description: 'Rice cooked in handi style', image: null },
      { name: 'Dal Kichidi', price: 294, description: 'Lentil and rice khichdi', image: null }
    ]
  },
  {
    category: 'Fried Rice',
    items: [
      { name: 'Veg Fried Rice', price: 252, description: 'Rice tossed with fresh vegetables', image: null },
      { name: 'Mix Fried Rice', price: 294, description: 'Mixed vegetable fried rice', image: null },
      { name: 'Gobi Fried Rice', price: 294, description: 'Cauliflower fried rice', image: null },
      { name: 'Mushroom Fried Rice', price: 294, description: 'Mushroom fried rice', image: null },
      { name: 'Paneer Fried Rice', price: 294, description: 'Paneer fried rice', image: null },
      { name: 'Spl Fried Rice', price: 336, description: 'Special fried rice', image: null },
      { name: 'Kaju Fried Rice', price: 350, description: 'Cashew fried rice', image: null },
      { name: 'Noodles with Fried Rice', price: 252, description: 'Fried rice with noodles', image: null }
    ]
  },
  {
    category: 'Noodles',
    items: [
      { name: 'Veg Soft Noodle', price: 182, description: 'Soft vegetable noodles', image: null },
      { name: 'Veg Hakka Noodles', price: 210, description: 'Hakka-style vegetable noodles', image: null },
      { name: 'Chilly Garlic Noodles', price: 266, description: 'Spicy garlic noodles', image: null }
    ]
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Gulab Jamun', price: 49, description: 'Milk dumplings in sugar syrup', image: null },
      { name: 'Basundi', price: 49, description: 'Sweetened thickened milk dessert', image: null }
    ]
  }
];

function formatPrice(price) {
  if (price === null || price === undefined || price === '') {
    return `<span class="text-muted">Verify price</span>`;
  }
  return `${MENU_CURRENCY}${price}`;
}

function getPlaceholderImage(width = 400, height = 300, label = 'Image Coming Soon') {
  return `https://placehold.co/${width}x${height}/0B5D4E/FFF8F0?text=${encodeURIComponent(label)}`;
}

function createMenuCard(item, category) {
  const img = item.image || getPlaceholderImage(400, 250, item.name);
  const price = formatPrice(item.price);

  return `
    <div class="col-md-6 col-lg-4">
      <div class="food-card card-hover h-100">
        <div class="img-hover-zoom">
          <img src="${img}" alt="${item.name}" class="food-card-img" loading="lazy">
        </div>
        <div class="food-card-body d-flex flex-column">
          <span class="category-badge">${category}</span>
          <div class="food-card-title">
            <span>${item.name}</span>
            <span class="food-card-price">${price}</span>
          </div>
          <p class="food-card-desc">${item.description}</p>
          <div class="mt-auto d-flex align-items-center justify-content-between">
            <span class="veg-badge"><span class="veg-dot"></span> Pure Veg</span>
            <button class="btn btn-sm btn-primary-custom" data-coming-soon="Online ordering coming soon!">
              <i class="fa-solid fa-plus me-1"></i> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderMenu(filter = 'all') {
  const container = document.getElementById('menu-container');
  if (!container) return;

  if (filter === 'jain') {
    container.innerHTML = `
      <div class="text-center py-5 reveal">
        <div class="coming-soon-icon">
          <i class="fa-solid fa-leaf"></i>
        </div>
        <h3 class="text-green mb-3">Jain Menu Coming Soon</h3>
        <p class="text-muted mx-auto" style="max-width: 600px;">
          We are preparing a dedicated Jain menu with strict no-onion, no-garlic, no-root-vegetable options.
          Please check back shortly or contact us for current Jain-friendly choices.
        </p>
        <a href="contact.html" class="btn btn-primary-custom mt-3">Contact Restaurant</a>
      </div>
    `;
    return;
  }

  let html = '';
  menuData.forEach(group => {
    const itemsHtml = group.items.map(item => createMenuCard(item, group.category)).join('');
    html += `
      <div class="menu-category reveal">
        <h3 class="menu-category-title">${group.category}</h3>
        <div class="row g-4">
          ${itemsHtml}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const container = document.getElementById('menu-container');
  if (!tabs.length || !container) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMenu(tab.dataset.filter);

      // Re-trigger reveal animations for newly added content
      setTimeout(() => {
        const reveals = container.querySelectorAll('.reveal');
        reveals.forEach(el => el.classList.add('active'));
      }, 50);
    });
  });
}

function renderFeaturedItems() {
  const container = document.getElementById('featured-items');
  if (!container) return;

  // Pick a few representative items from different categories
  const featured = [
    { item: menuData[0].items[0], category: menuData[0].category },
    { item: menuData[0].items[4], category: menuData[0].category },
    { item: menuData[2].items[1], category: menuData[2].category },
    { item: menuData[6].items[6], category: menuData[6].category },
    { item: menuData[8].items[1], category: menuData[8].category },
    { item: menuData[9].items[0], category: menuData[9].category }
  ];

  container.innerHTML = featured.map(({ item, category }) => createMenuCard(item, category)).join('');
}

function activateMenuTab(filter) {
  const tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.filter === filter);
  });
}

function getUrlFilter() {
  const params = new URLSearchParams(window.location.search);
  return params.get('filter');
}

document.addEventListener('DOMContentLoaded', () => {
  const urlFilter = getUrlFilter();
  const initialFilter = (urlFilter === 'jain' || urlFilter === 'regular') ? urlFilter : 'all';

  activateMenuTab(initialFilter);
  renderMenu(initialFilter);
  initMenuTabs();
  renderFeaturedItems();
});
