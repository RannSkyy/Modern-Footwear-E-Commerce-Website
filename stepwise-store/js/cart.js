// ===========================
// STEPWISE — CART MODULE
// ===========================

let cart = JSON.parse(localStorage.getItem('stepwise-cart') || '[]');

function saveCart() {
  localStorage.setItem('stepwise-cart', JSON.stringify(cart));
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  el.textContent = total;
  el.classList.toggle('visible', total > 0);
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (!cart.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <span>🛒</span>
        <p>Keranjang masih kosong</p>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name} <small style="color:var(--c-muted)">Sz.${item.size}</small></div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id},'${item.size}',-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},'${item.size}',1)">+</button>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id},'${item.size}')">Hapus</button>
        </div>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = formatPrice(total);
  footer.style.display = 'block';
}

function addToCart(productId, size) {
  if (!size) {
    showToast('Pilih ukuran terlebih dahulu!');
    return false;
  }
  const product = products.find(p => p.id === productId);
  if (!product) return false;

  const key = `${productId}-${size}`;
  const existing = cart.find(i => i.id === productId && i.size === size);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      size: size,
      qty: 1
    });
  }

  saveCart();
  updateCartCount();
  renderCart();
  return true;
}

function removeFromCart(id, size) {
  cart = cart.filter(i => !(i.id === id && i.size === size));
  saveCart();
  updateCartCount();
  renderCart();
}

function changeQty(id, size, delta) {
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartCount();
  renderCart();
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  renderCart();
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

function checkout() {
  showToast('🎉 Pesanan berhasil dibuat! Terima kasih.');
  cart = [];
  saveCart();
  updateCartCount();
  renderCart();
  closeCart();
}

updateCartCount();