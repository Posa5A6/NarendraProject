const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=v=>`₹${Number(v||0).toFixed(Number(v)%1?2:0)}`;
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function imageFor(item){
  if(!item)return IMAGE_LIBRARY.thali;
  if(item.name==='Gobi Manchurian')return IMAGE_LIBRARY.gobi;
  if(item.imageUrl)return {src:item.imageUrl,link:item.imageSource||item.imageUrl};
  if(typeof item.image==='string' && /^https?:\/\//i.test(item.image))return {src:item.image,link:item.imageSource||item.image};
  return IMAGE_LIBRARY[item.image]||IMAGE_LIBRARY.thali;
}
function header(){
  return `<header class="site-header"><div class="container nav"><a class="brand-wrap" href="index.html" aria-label="Hotel Rajshri home"><img class="brand-logo" src="${SITE.logo}" alt="Hotel Rajshri · Pure Veg A/C Restaurant"></a><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav">☰</button><nav class="nav-links" id="site-nav"><a href="index.html">Home</a><a href="about.html">About</a><a href="menu.html">Menus</a><a href="gallery.html">Gallery</a><a class="nav-order" href="order.html">Order food</a></nav></div></header>`;
}
function footer(){return `<footer><div class="container footer-grid"><div><img class="footer-logo" src="${SITE.logo}" alt="Hotel Rajshri"><p>${SITE.tagline}. Fresh vegetarian food for locals, families, and railway travellers.</p></div><div><strong>Explore</strong><div class="footer-links"><a href="index.html">Home</a><a href="about.html">Our story</a><a href="menu.html">Menus</a><a href="gallery.html">Gallery</a><a href="order.html">Order food</a></div></div><div class="footer-contact"><strong>Contact</strong><p>${SITE.address}</p><p><span>Open daily</span>8:00 AM – 10:30 PM</p><a class="footer-phone" href="tel:+919959461888" aria-label="Call Hotel Rajshri at 099594 61888"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.4 9.5 6.3 7.7 8.8a16.1 16.1 0 0 0 7.5 7.5l2.5-1.8 2.9 2.9-1.8 3.2c-.4.7-1.2 1-1.9.8C9.9 19.4 4.6 14.1 3.6 7.1c-.1-.7.1-1.5.8-1.9l2.2-1.8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg><span>099594 61888</span></a><a class="btn btn-primary" href="${SITE.maps}" target="_blank" rel="noopener">Get directions</a></div></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Hotel Rajshri</span><span>Pure vegetarian dining in Adoni</span></div></footer>`}
function shell(){
  const h=$('#site-header'), f=$('#site-footer');
  if(!document.querySelector('link[rel~="icon"]')){const icon=document.createElement('link');icon.rel='icon';icon.type='image/png';icon.href='assets/logo-cropped.png';document.head.appendChild(icon)}
  if(h)h.innerHTML=header(); if(f)f.innerHTML=footer();
  const toggle=$('.menu-toggle'), nav=$('.nav-links');
  const setNav=open=>{
    nav?.classList.toggle('open',open);
    document.body.classList.toggle('no-scroll',open && matchMedia('(max-width: 950px)').matches);
    toggle?.setAttribute('aria-expanded',String(open));
  };
  toggle?.addEventListener('click',()=>setNav(!nav?.classList.contains('open')));
  $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>setNav(false)));
  addEventListener('resize',()=>{if(!matchMedia('(max-width: 950px)').matches)setNav(false)},{passive:true});
  const current=location.pathname.split('/').pop()||'index.html';
  $$('.nav-links a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active')});
  const dark=$('.luxury-hero,.hero,.feature,.jain-hero,.owner-shell');
  const sync=()=>{if(!h)return;h.classList.toggle('on-dark',!!dark&&scrollY<Math.max(420,(dark.offsetHeight||0)-100))}; sync(); addEventListener('scroll',sync,{passive:true});
}
function reveal(){const els=$$('.reveal');if(!els.length)return;const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -40px'});els.forEach(e=>io.observe(e))}
function toast(msg){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),1800)}
function renderFeatured(){const grid=$('#featured-grid');if(!grid)return;const wanted=['Masala Dosa','Pudina Paneer','Veg Biryani','Gobi Manchurian','Veg Hakka Noodles','Gulab Jamun'];const items=getMenu().filter(x=>wanted.includes(x.name));grid.innerHTML=items.map((x,i)=>{const img=imageFor(x);return `<article class="dish-card reveal delay-${i%3}"><div class="dish-photo"><img loading="lazy" decoding="async" src="${esc(img.src)}" alt="${esc(x.name)}"></div><div class="dish-body"><div class="dish-top"><div class="dish-name">${esc(x.name)}</div><div class="price">${money(x.price)}</div></div><p>${esc(x.category)} · pure vegetarian</p><div class="dish-bottom"><span class="tag">Fresh kitchen</span></div></div></article>`}).join('');reveal()}
function renderMenu(){
  const root=$('#menu-root');if(!root)return;
  const cats=[...new Set(getMenu().map(x=>x.category))];const tabs=$('#cat-tabs');const mealTabs=$('#meal-tabs');
  const mealFor=x=>x.category==='Breakfast'?'breakfast':'lunch-dinner';
  if(mealTabs)mealTabs.innerHTML=`<button class="cat active" data-meal="all">All day</button><button class="cat" data-meal="breakfast">Breakfast · 8–11</button><button class="cat" data-meal="lunch">Lunch · 12:30–3</button><button class="cat" data-meal="dinner">Dinner · 7:30–10</button>`;
  tabs.innerHTML=`<button class="cat active" data-cat="all">All dishes</button>`+cats.map(c=>`<button class="cat" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
  let activeMeal='all';
  const render=(filter='all',query='',meal=activeMeal)=>{
    const q=query.trim().toLowerCase();const data=getMenu().filter(x=>(filter==='all'||x.category===filter)&&(meal==='all'||(meal==='breakfast'?mealFor(x)==='breakfast':mealFor(x)==='lunch-dinner'))&&(!q||x.name.toLowerCase().includes(q)||x.category.toLowerCase().includes(q)));const grouped={};data.forEach(x=>(grouped[x.category]??=[]).push(x));
    root.innerHTML=Object.entries(grouped).map(([cat,items])=>`<section class="menu-section"><div class="menu-section-head"><div><span class="section-index">${String(cats.indexOf(cat)+1).padStart(2,'0')}</span><h2>${esc(cat)}</h2></div><span class="item-count">${items.length} dishes</span></div><div class="menu-list">${items.map(x=>{const img=imageFor(x);return `<article class="menu-row"><div class="menu-thumb"><img loading="lazy" decoding="async" src="${esc(img.src)}" alt="${esc(x.name)}"></div><div class="menu-food"><h3>${esc(x.name)}</h3><p>Pure vegetarian · ${esc(cat)}</p></div><div class="menu-action"><span class="menu-price">${money(x.price)}</span></div></article>`}).join('')}</div></section>`).join('')||`<div class="empty"><h3>No dishes found</h3><p>Try another search or category.</p></div>`;
    reveal();
  };
  tabs.onclick=e=>{const b=e.target.closest('[data-cat]');if(!b)return;$$('[data-cat]',tabs).forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.cat,$('#menu-search').value,activeMeal)};
  mealTabs?.addEventListener('click',e=>{const b=e.target.closest('[data-meal]');if(!b)return;$$('[data-meal]',mealTabs).forEach(x=>x.classList.remove('active'));b.classList.add('active');activeMeal=b.dataset.meal;render($('.cat.active').dataset.cat,$('#menu-search').value,activeMeal)});
  $('#menu-search').oninput=e=>render($('.cat.active').dataset.cat,e.target.value,activeMeal);
  const params=new URLSearchParams(location.search);const cat=params.get('cat'),meal=params.get('meal');
  if(cat&&cats.includes(cat)){$$('[data-cat]',tabs).forEach(x=>x.classList.toggle('active',x.dataset.cat===cat));render(cat,'',activeMeal)}else if(meal&&['breakfast','lunch','dinner'].includes(meal.toLowerCase())){activeMeal=meal.toLowerCase();$$('[data-meal]',mealTabs||document).forEach(x=>x.classList.toggle('active',x.dataset.meal===activeMeal));render('','',activeMeal)}else render();
}
function initMenuChoice(){const dialog=$('#menu-choice-dialog');if(!dialog)return;let selection=null;const close=()=>dialog.close();$$('.menu-path-choice').forEach(button=>button.addEventListener('click',()=>{selection=button;$('#menu-choice-title',dialog).textContent=`Which ${button.dataset.menuLabel} menu would you like?`;dialog.showModal()}));$('.menu-choice-close',dialog)?.addEventListener('click',close);dialog.addEventListener('click',event=>{if(event.target===dialog)close()});$$('[data-menu-choice]',dialog).forEach(button=>button.addEventListener('click',()=>{if(!selection)return;const book=button.dataset.menuChoice;const category=selection.dataset[book==='main'?'mainCategory':'jainCategory'];location.href=`menu.html?book=${book}&category=${encodeURIComponent(category)}`}));}
function init(){shell();reveal();renderFeatured();renderMenu();initMenuChoice();const loader=$('.loader');if(loader)setTimeout(()=>loader.classList.add('hide'),950)}
document.addEventListener('DOMContentLoaded',init);
window.getMenu=getMenu;window.saveMenu=saveMenu;window.resetMenu=resetMenu;
