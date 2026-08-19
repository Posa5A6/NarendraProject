(() => {
  const reader = document.getElementById('menu-reader');
  if (!reader) return;

  const shell = document.getElementById('reader-book');
  const left = document.getElementById('reader-left');
  const right = document.getElementById('reader-right');
  const title = document.getElementById('reader-title');
  const page = document.getElementById('reader-page');
  const total = document.getElementById('reader-total');
  const prev = document.getElementById('reader-prev');
  const next = document.getElementById('reader-next');
  const search = document.getElementById('reader-search');
  const searchClear = document.getElementById('reader-search-clear');
  const searchResults = document.getElementById('reader-search-results');
  const readerTabs = document.getElementById('reader-tabs');

  const sources = { main: 'data/menu-main.json', jain: 'data/menu-jain.json' };
  const books = {};
  const layouts = {};
  const isMobile = () => window.matchMedia('(max-width: 780px)').matches;
  const activeLayout = () => {
    const set = layouts[active];
    return set ? (isMobile() ? set.mobile : set.desktop) : null;
  };
  let currentSpread = 0;
  let active = 'main';
  let busy = false;
  let searchTimer = 0;
  let selectedSearchTerm = '';
  let searchSelectionLocked = false;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[c]));

  async function loadBook(bookKey) {
    const url = sources[bookKey];
    if (!url) throw new Error(`Unknown menu book: ${bookKey}`);

    // Add a small version query while the menu is being developed so an old
    // cached Jain JSON file cannot silently win over the newly supplied file.
    const response = await fetch(`${url}?v=4`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`${bookKey} menu returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.book !== bookKey) {
      throw new Error(`${bookKey} menu contains the wrong book key: ${data.book || 'missing'}`);
    }
    if (!Array.isArray(data.categories)) {
      throw new Error(`${bookKey} menu has no categories array`);
    }

    books[bookKey] = data;
    layouts[bookKey] = { desktop: buildLayout(data, 8), mobile: buildLayout(data, 5) };
    return data;
  }

  async function loadBooks() {
    // Load the two books independently. A problem with Jain must never
    // prevent the Main menu from opening, and vice versa.
    const results = await Promise.allSettled(
      Object.keys(sources).map(key => loadBook(key))
    );

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const key = Object.keys(sources)[index];
        console.error(`Failed to load ${key} menu:`, result.reason);
      }
    });

    if (!books.main && !books.jain) {
      throw new Error('Neither menu book could be loaded. Check the data/ folder and serve the site through HTTP.');
    }
  }

  // Keep pages comfortably readable. A page is never internally scrolled.
  // Long categories are split into multiple physical-looking pages.
  function buildLayout(book, pageSize) {
    const pages = [];
    const firstSpreadByCategory = {};
    const firstPageByCategory = {};

    (book.categories || []).forEach((category, categoryIndex) => {
      const items = category.items || [];
      const chunks = [];
      for (let i = 0; i < items.length; i += pageSize) {
        chunks.push(items.slice(i, i + pageSize));
      }
      if (!chunks.length) chunks.push([]);

      firstPageByCategory[category.id] = pages.length;
      firstSpreadByCategory[category.id] = Math.floor(pages.length / 2);
      chunks.forEach((chunk, chunkIndex) => {
        pages.push({ category, categoryIndex, items: chunk, chunkIndex, chunkTotal: chunks.length, pageSize });
      });
    });

    const spreads = [];
    for (let i = 0; i < pages.length; i += 2) {
      spreads.push({ left: pages[i], right: pages[i + 1] || null });
    }

    return { pages, spreads, firstSpreadByCategory, firstPageByCategory };
  }

  function pageMarkup(data, side) {
    if (!data) {
      return `<div class="page-content ${side} empty-page">
        <div class="page-head"><span>THE END</span><i></i></div>
        <h3 class="serif">More coming soon.</h3>
        <p class="demo-note">The restaurant's final menu will be added here.</p>
        <div class="page-footer"><span>HOTEL RAJSHRI</span><span>PURE VEG. · A/C</span></div>
      </div>`;
    }

    const { category, items, chunkIndex, chunkTotal } = data;
    const start = chunkIndex * (data.pageSize || 8) + 1;
    const end = Math.min(start + items.length - 1, category.items.length);
    const range = chunkTotal > 1 ? `<small class="page-range">${start}–${end}</small>` : '';

    return `<div class="page-content ${side}" data-category="${esc(category.id)}">
      <div class="page-head">
        <span>${esc(category.title)}</span><i></i>
        <small class="page-timing">${esc(category.timing || '')}</small>
      </div>
      <div class="page-title-row">
        <h3 class="serif">${esc(category.title)}</h3>${range}
      </div>
      <div class="demo-items">
        ${items.map(item => `
          <div class="demo-item" data-search="${esc(`${category.title} ${item.name}`.toLowerCase())}">
            <span>${esc(item.name)}</span><b>${esc(item.price || '₹—')}</b>
          </div>`).join('')}
      </div>
      ${chunkTotal > 1 ? `<div class="page-chunk">${chunkIndex + 1} / ${chunkTotal} · ${esc(category.title)}</div>` : ''}
      <div class="page-footer"><span>HOTEL RAJSHRI</span><span>PURE VEG. · A/C</span></div>
    </div>`;
  }

  function renderCategoryTabs(bookKey) {
    const book = books[bookKey];
    readerTabs.innerHTML = (book?.categories || []).map((category, index) => `
      <button class="folder-tab ${index % 2 ? 'alt' : ''}" type="button"
        data-category-index="${index}" title="Open ${esc(category.title)}">
        <span>${esc(category.title)}</span>
      </button>`).join('');

    readerTabs.querySelectorAll('[data-category-index]').forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation();
        jumpToCategory(Number(button.dataset.categoryIndex));
      });
    });
  }

  function render() {
    const book = books[active];
    const layout = activeLayout();
    if (!book || !layout) return;

    if (isMobile()) {
      const item = layout.pages[currentSpread] || layout.pages[0];
      title.textContent = book.title;
      total.textContent = String(layout.pages.length).padStart(2, '0');
      page.textContent = String(currentSpread + 1).padStart(2, '0');
      left.innerHTML = '';
      right.innerHTML = pageMarkup(item, 'right');
      prev.disabled = currentSpread === 0;
      next.disabled = currentSpread >= layout.pages.length - 1;
    } else {
      const spread = layout.spreads[currentSpread] || layout.spreads[0];
      title.textContent = book.title;
      total.textContent = String(layout.spreads.length).padStart(2, '0');
      page.textContent = String(currentSpread + 1).padStart(2, '0');
      left.innerHTML = pageMarkup(spread.left, 'left');
      right.innerHTML = pageMarkup(spread.right, 'right');
      prev.disabled = currentSpread === 0;
      next.disabled = currentSpread >= layout.spreads.length - 1;
    }
    updateActiveTabs();
  }

  function updateActiveTabs() {
    const layout = activeLayout();
    const visible = isMobile() ? layout?.pages[currentSpread] : layout?.spreads[currentSpread];
    const ids = new Set((isMobile() ? [visible?.category?.id] : [visible?.left?.category?.id, visible?.right?.category?.id]).filter(Boolean));
    readerTabs.querySelectorAll('.folder-tab').forEach(button => {
      const category = books[active]?.categories?.[Number(button.dataset.categoryIndex)];
      button.classList.toggle('active', !!category && ids.has(category.id));
    });
  }

  function showSearchResults(query) {
    const term = query.trim().toLowerCase();
    if (searchSelectionLocked && term === selectedSearchTerm) return;
    if (!term) {
      searchSelectionLocked = false;
      selectedSearchTerm = '';
      searchResults.hidden = true;
      searchResults.innerHTML = '';
      return;
    }

    const book = books[active];
    const layout = activeLayout();
    const matches = [];

    (book?.categories || []).forEach(category => {
      (category.items || []).forEach(item => {
        const haystack = `${category.title} ${item.name}`.toLowerCase();
        if (haystack.includes(term)) {
          matches.push({ item, category, spread: isMobile() ? (layout.firstPageByCategory[category.id] || 0) : (layout.firstSpreadByCategory[category.id] || 0) });
        }
      });
      if (category.title.toLowerCase().includes(term)) {
        matches.push({ item: { name: category.title, price: 'Browse' }, category, spread: isMobile() ? (layout.firstPageByCategory[category.id] || 0) : (layout.firstSpreadByCategory[category.id] || 0) });
      }
    });

    if (!matches.length) {
      searchResults.innerHTML = `<div class="search-result"><strong>No dish found</strong><span>Try another word</span></div>`;
      searchResults.hidden = false;
      return;
    }

    searchResults.innerHTML = matches.slice(0, 12).map(m => `
      <button class="search-result" type="button" data-spread="${m.spread}">
        <span><strong>${esc(m.item.name)}</strong><br><span>${esc(m.category.title)}</span></span>
        <b>${esc(m.item.price || 'View')}</b>
      </button>`).join('');
    searchResults.hidden = false;
  }

  function jumpToCategory(categoryIndex) {
    const category = books[active]?.categories?.[categoryIndex];
    if (!category) return;
    const layout = activeLayout();
    const target = isMobile() ? (layout.firstPageByCategory[category.id] || 0) : (layout.firstSpreadByCategory[category.id] || 0);
    if (target === currentSpread) {
      updateActiveTabs();
      return;
    }
    turnTo(target);
  }

  function jumpToSpread(index) {
    const layout = activeLayout();
    const max = isMobile() ? layout.pages.length : layout.spreads.length;
    if (index < 0 || index >= max) return;
    if (index === currentSpread) return;
    turnTo(index);
  }

  async function open(bookName, spreadIndex = 0) {
    try {
      if (!books[bookName]) {
        await loadBook(bookName);
      }
    } catch (error) {
      console.error(`Unable to open ${bookName} menu:`, error);
      const note = document.querySelector('.menu-book-note');
      if (note) {
        note.innerHTML = `<span></span> ${esc(bookName === 'jain' ? 'Jain menu could not be loaded.' : 'Menu could not be loaded.')} Check that the JSON file is inside <code>data/</code>.`;
      }
      return;
    }

    active = bookName;
    const layout = activeLayout();
    currentSpread = Math.max(0, Math.min(spreadIndex, isMobile() ? layout.pages.length - 1 : layout.spreads.length - 1));
    if (search) search.value = '';
    renderCategoryTabs(active);
    render();
    searchResults.hidden = true;
    reader.classList.add('is-open');
    reader.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    window.setTimeout(() => reader.querySelector('.reader-close')?.focus(), 80);
  }

  function close() {
    reader.classList.remove('is-open');
    reader.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  function createTurningSheet(direction, html) {
    const sheet = document.createElement('div');
    sheet.className = `turning-page ${direction > 0 ? 'turning-next' : 'turning-prev'}`;
    sheet.innerHTML = html;
    shell.appendChild(sheet);
    return sheet;
  }

  function turn(direction) {
    const layout = activeLayout();

    if (!layout) return;

    const target = currentSpread + direction;

    const max = isMobile()
        ? (layout.pages?.length ?? 0)
        : (layout.spreads?.length ?? 0);

    // Stop at first/last page
    if (
        busy ||
        max === 0 ||
        target < 0 ||
        target >= max
    ) {
        return;
    }

    turnTo(target);
}

function turnTo(target) {
    const layout = activeLayout();

    if (!layout) return;

    const max = isMobile()
        ? (layout.pages?.length ?? 0)
        : (layout.spreads?.length ?? 0);

    if (
        busy ||
        target < 0 ||
        target >= max ||
        target === currentSpread
    ) {
        return;
    }

    busy = true;

    const direction = target > currentSpread ? 1 : -1;

    const oldHtml = isMobile()
        ? right.innerHTML
        : (
            direction > 0
                ? right.innerHTML
                : left.innerHTML
        );

    currentSpread = target;

    render();

    const sheet = createTurningSheet(direction, oldHtml);

    shell.classList.add('is-turning');

    requestAnimationFrame(() => {
        sheet.classList.add('play');
    });

    window.setTimeout(() => {
        sheet.remove();
        shell.classList.remove('is-turning');
        busy = false;
    }, 430);
}

  // Subtle cover movement only. No continuous animation and no heavy effects.
  if (!window.matchMedia('(pointer: coarse)').matches) {
    document.querySelectorAll('.menu-book-card').forEach(card => {
      const object = card.querySelector('.book-object');
      let raf = 0;
      let targetX = 0, targetY = 0, curX = 0, curY = 0;
      const animate = () => {
        curX += (targetX - curX) * 0.16;
        curY += (targetY - curY) * 0.16;
        object.style.transform = `translate3d(0,-${card.classList.contains('is-hover') ? 10 : 0}px,0) rotateX(${curY}deg) rotateY(${curX}deg)`;
        if (Math.abs(targetX-curX)+Math.abs(targetY-curY) > .04) raf = requestAnimationFrame(animate);
        else raf = 0;
      };
      card.addEventListener('pointerenter', () => { card.classList.add('is-hover'); if (!raf) raf = requestAnimationFrame(animate); });
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        targetX = ((e.clientX - r.left) / r.width - .5) * -2.8;
        targetY = ((e.clientY - r.top) / r.height - .5) * 1.8;
        if (!raf) raf = requestAnimationFrame(animate);
      });
      card.addEventListener('pointerleave', () => { card.classList.remove('is-hover'); targetX = 0; targetY = 0; if (!raf) raf = requestAnimationFrame(animate); });
      card.addEventListener('click', () => open(card.dataset.book));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card.dataset.book); } });
    });
  } else {
    document.querySelectorAll('.menu-book-card').forEach(card => card.addEventListener('click', () => open(card.dataset.book)));
  }

  document.querySelector('.reader-close')?.addEventListener('click', close);
  document.querySelector('[data-close-reader]')?.addEventListener('click', close);
  prev.addEventListener('click', () => turn(-1));
  next.addEventListener('click', () => turn(1));
  left.addEventListener('click', () => turn(-1));
  right.addEventListener('click', () => turn(1));

  search?.addEventListener('input', () => {
    if (searchSelectionLocked && search.value.trim().toLowerCase() !== selectedSearchTerm) {
      searchSelectionLocked = false;
      selectedSearchTerm = '';
    }
    if (searchSelectionLocked) return;
    clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => showSearchResults(search.value), 90);
  });
  searchClear?.addEventListener('click', () => {
    search.value = '';
    searchSelectionLocked = false;
    selectedSearchTerm = '';
    showSearchResults('');
    search.focus();
  });
  searchResults.addEventListener('click', e => {
    const button = e.target.closest('[data-spread]');
    if (button) {
      selectedSearchTerm = search.value.trim().toLowerCase();
      searchSelectionLocked = true;
      searchResults.hidden = true;
      searchResults.innerHTML = '';
      jumpToSpread(Number(button.dataset.spread));
    }
  });

  document.addEventListener('keydown', e => {
    if (!reader.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') turn(1);
    if (e.key === 'ArrowLeft') turn(-1);
  });

  let lastMobile = isMobile();
  window.addEventListener('resize', () => {
    const nowMobile = isMobile();
    if (nowMobile === lastMobile || !reader.classList.contains('is-open')) return;
    lastMobile = nowMobile;
    const layout = activeLayout();
    if (!layout) return;
    const max = nowMobile ? layout.pages.length : layout.spreads.length;
    currentSpread = Math.min(currentSpread, Math.max(0, max - 1));
    renderCategoryTabs(active);
    render();
  }, { passive: true });

  const booksReady = loadBooks().catch(error => {
    console.error(error);
    const note = document.querySelector('.menu-book-note');
    if (note) note.innerHTML = '<span></span> Menu data could not be loaded. Serve this folder through a local web server.';
  });

  // Keep deep links working, including a direct landing category from the home page.
  booksReady.then(() => {
    const params = new URLSearchParams(location.search);
    const requested = (params.get('book') || '').toLowerCase();
    const requestedCategory = (params.get('category') || '').toLowerCase();
    if (requested === 'main' || requested === 'jain') {
      const layout = isMobile() ? layouts[requested]?.mobile : layouts[requested]?.desktop;
      const category = books[requested]?.categories?.find(item => item.id === requestedCategory);
      const spread = category
        ? (isMobile() ? layout.firstPageByCategory[category.id] : layout.firstSpreadByCategory[category.id])
        : 0;
      window.setTimeout(() => open(requested, spread), 120);
    }
  });
})();
