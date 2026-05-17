// ===========================
// STEPWISE — PRODUCTS MODULE
// ===========================

let activeFilter = 'semua';
let selectedSize = null;
let modalProduct = null;

function renderProducts(filter = 'semua') {
  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'semua' ? products : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card reveal reveal-delay-${(i % 4) + 1}"
         onclick="openModal(${p.id})"
         style="animation-delay:${i * 0.08}s">
      <div class="product-img" style="background:${p.bg}">
        ${p.badge ? `<div class="product-badge badge-${p.badge}">${p.badgeLabel}</div>` : ''}
        <span style="font-size:5rem;z-index:1;position:relative;animation:floatShoe ${3 + i * 0.3}s ease-in-out infinite">${p.emoji}</span>
        <div class="product-actions-overlay" onclick="event.stopPropagation()">
          <button onclick="quickAddToCart(${p.id})">+ Keranjang</button>
          <button class="btn-wish" onclick="toggleWish(this, ${p.id})">🤍</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.categoryLabel}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars-small">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}</span>
          <span class="rating-count">(${p.reviewCount})</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-price-old">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Trigger reveal animations
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 50);
}

function filterProducts(cat) {
  activeFilter = cat;

  // Update tab buttons
  document.querySelectorAll('.filter-tab').forEach(btn => btn.classList.remove('active'));
  const tabs = document.querySelectorAll('.filter-tab');
  const labels = ['semua','pria','wanita','sport','anak'];
  tabs[labels.indexOf(cat)]?.classList.add('active');

  // Animate out / in
  const grid = document.getElementById('productsGrid');
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(20px)';
  setTimeout(() => {
    renderProducts(cat);
    grid.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 250);

  // Scroll to products
  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function quickAddToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const defaultSize = product.sizes[2] || product.sizes[0];
  if (addToCart(id, defaultSize)) {
    showToast(`✓ ${product.name} ditambahkan ke keranjang!`);
  }
}

function toggleWish(btn, id) {
  const wished = btn.textContent === '❤️';
  btn.textContent = wished ? '🤍' : '❤️';
  showToast(wished ? 'Dihapus dari wishlist' : '❤️ Ditambahkan ke wishlist!');
}

// Product Modal
function openModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  modalProduct = product;
  selectedSize = null;

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-inner">
      <div class="modal-img" style="background:${product.bg}">
        <span style="filter:drop-shadow(0 20px 40px rgba(0,0,0,0.5));animation:floatShoe 4s ease-in-out infinite">${product.emoji}</span>
      </div>
      <div class="modal-details">
        <div class="modal-category">${product.categoryLabel}</div>
        <div class="modal-name">${product.name}</div>
        <div class="modal-price">${formatPrice(product.price)}${product.oldPrice ? ` <small style="font-size:0.8rem;color:var(--c-muted);text-decoration:line-through;font-family:var(--ff-body)">${formatPrice(product.oldPrice)}</small>` : ''}</div>
        <div class="modal-desc">${product.desc}</div>
        <div class="modal-sizes">
          <label>Pilih Ukuran</label>
          <div class="size-options">
            ${product.sizes.map(s => `<button class="size-btn" onclick="selectSize(this, ${s})">${s}</button>`).join('')}
          </div>
        </div>
        <button class="btn-primary modal-add" onclick="modalAddToCart()">Tambah ke Keranjang</button>
      </div>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('productModal').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('productModal').classList.remove('open');
}

function selectSize(btn, size) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedSize = size;
}

function modalAddToCart() {
  if (!selectedSize) {
    showToast('⚠️ Pilih ukuran terlebih dahulu!');
    return;
  }
  if (addToCart(modalProduct.id, selectedSize)) {
    showToast(`✓ ${modalProduct.name} (Sz.${selectedSize}) ditambahkan!`);
    closeModal();
  }
}

// Search
function searchProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const results = document.getElementById('searchResults');

  if (!query) { results.innerHTML = ''; return; }

  const matches = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.categoryLabel.toLowerCase().includes(query)
  );

  results.innerHTML = matches.length
    ? matches.map(p => `
      <div class="search-result-item" onclick="openModalFromSearch(${p.id})">
        <div class="search-result-img" style="background:${p.bg}">${p.emoji}</div>
        <div>
          <div class="search-result-name">${p.name}</div>
          <div class="search-result-price">${formatPrice(p.price)}</div>
        </div>
      </div>
    `).join('')
    : '<p style="color:var(--c-muted);font-size:0.9rem;padding:20px 0">Tidak ditemukan hasil untuk "<strong>' + query + '</strong>"</p>';
}

function openModalFromSearch(id) {
  toggleSearch();
  setTimeout(() => openModal(id), 300);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('semua');
});