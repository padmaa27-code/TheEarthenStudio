/* ============================================================
   The Earthen Studio — site behaviour
   Cart state is held in memory only. Nothing is stored in the
   browser and nothing is sent anywhere. Demonstration site.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- photo placeholders ------------------------------------
     Until real photographs are dropped into /images, each <img> fails
     and is removed, revealing the captioned clay-textured placeholder
     underneath. Handles images that already errored before this ran. */
  function dropBrokenImage(img) { img.remove(); }
  Array.prototype.forEach.call(document.querySelectorAll('.shot img'), function (img) {
    img.addEventListener('error', function () { dropBrokenImage(img); });
    if (img.complete && img.naturalWidth === 0) dropBrokenImage(img);
  });

  /* ---------- mobile navigation ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.textContent = open ? 'Close' : 'Menu';
    });
  }

  /* ---------- scroll reveal ---------- */
  var risers = document.querySelectorAll('.rise');
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(risers, function (t) { t.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px' });
    Array.prototype.forEach.call(risers, function (t) { io.observe(t); });
    /* failsafe: nothing stays invisible, whatever the observer does */
    setTimeout(function () {
      Array.prototype.forEach.call(risers, function (t) { t.classList.add('is-in'); });
    }, 4000);
  }

  /* ---------- modals ---------- */
  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.add('is-on');
    document.body.style.overflow = 'hidden';
    var f = m.querySelector('input, select, button');
    if (f) f.focus();
  }
  function closeModal(m) {
    if (!m) return;
    m.classList.remove('is-on');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-modal-open]');
    if (opener) { e.preventDefault(); openModal(opener.getAttribute('data-modal-open')); return; }
    var closer = e.target.closest('[data-modal-close]');
    if (closer) { closeModal(closer.closest('.modal')); return; }
    if (e.target.classList.contains('modal')) closeModal(e.target);
  });

  /* ---------- enquiry and booking forms (demonstration only) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-fakesubmit]'), function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('data-fakesubmit'));
      var form = btn.closest('[data-formbody]');
      if (form) form.hidden = true;
      if (panel) { panel.hidden = false; panel.setAttribute('tabindex', '-1'); panel.focus(); }
    });
  });

  /* ============================================================
     SHOP — crate and checkout
     ============================================================ */
  var drawer = document.getElementById('drawer');
  var shopGrid = document.querySelector('.shopgrid');
  var closeDrawer = null;

  if (drawer && shopGrid && !shopGrid.classList.contains('preview')) {
    var cart = [];
    var RUPEE = '\u20B9';
    var scrim = document.getElementById('scrim');
    var body = document.getElementById('cartBody');
    var foot = document.getElementById('cartFoot');
    var count = document.getElementById('cartCount');

    var money = function (n) { return RUPEE + n.toLocaleString('en-IN'); };
    var units = function () { return cart.reduce(function (a, i) { return a + i.qty; }, 0); };
    var subtotal = function () { return cart.reduce(function (a, i) { return a + i.price * i.qty; }, 0); };

    var setDrawer = function (on) {
      drawer.classList.toggle('is-on', on);
      drawer.setAttribute('aria-hidden', on ? 'false' : 'true');
      /* inert as well as aria-hidden: without it the buttons inside a
         closed drawer are still reachable by keyboard, which is both an
         accessibility failure and a Lighthouse flag. */
      if (on) { drawer.removeAttribute('inert'); } else { drawer.setAttribute('inert', ''); }
      scrim.classList.toggle('is-on', on);
      document.body.style.overflow = on ? 'hidden' : '';
    };
    closeDrawer = function () { setDrawer(false); };

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }

    function render() {
      count.textContent = units();

      if (!cart.length) {
        body.innerHTML = '<p class="empty">Nothing in the crate yet.</p>';
        foot.innerHTML = '<p class="note">Pieces are packed in straw and dispatched within five working days.</p>';
        return;
      }

      body.innerHTML = cart.map(function (i, idx) {
        var n = escapeHtml(i.name);
        return '<div class="line">' +
            '<figure class="shot" data-shot="' + n + '"></figure>' +
            '<div><p class="line__name">' + n + '</p>' +
              '<div class="qty">' +
                '<button type="button" aria-label="Remove one ' + n + '" data-step="-1" data-i="' + idx + '">&minus;</button>' +
                '<span>' + i.qty + '</span>' +
                '<button type="button" aria-label="Add one ' + n + '" data-step="1" data-i="' + idx + '">+</button>' +
              '</div></div>' +
            '<p class="line__price">' + money(i.price * i.qty) + '</p>' +
          '</div>';
      }).join('');

      var ship = subtotal() >= 3000 ? 0 : 180;
      foot.innerHTML =
        '<div class="sum"><span>Subtotal</span><span>' + money(subtotal()) + '</span></div>' +
        '<div class="sum"><span>Packing &amp; delivery</span><span>' + (ship ? money(ship) : 'Free') + '</span></div>' +
        '<div class="sum sum--total"><span>Total</span><span>' + money(subtotal() + ship) + '</span></div>' +
        '<button type="button" class="btn checkoutbtn" id="goCheckout">Go to checkout</button>';

      document.getElementById('goCheckout').addEventListener('click', function () {
        setDrawer(false);
        document.getElementById('checkoutTotal').textContent = money(subtotal() + ship);
        openModal('checkout');
      });
    }

    shopGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('.add');
      if (!btn) return;
      var item = btn.closest('.item');
      var id = item.getAttribute('data-id');
      var found = cart.filter(function (i) { return i.id === id; })[0];

      if (found) {
        found.qty += 1;
      } else {
        cart.push({
          id: id,
          name: item.getAttribute('data-name'),
          price: parseInt(item.getAttribute('data-price'), 10),
          qty: 1
        });
      }
      /* Deliberately does not open the drawer: opening on every add
         blocks the next add behind the scrim. The header count and the
         button state carry the feedback instead. */
      var label = btn.querySelector('.add__l');
      btn.classList.add('is-added');
      if (label) label.textContent = 'Added';
      var openBtn = document.getElementById('openCart');
      openBtn.classList.remove('pulse');
      void openBtn.offsetWidth;
      openBtn.classList.add('pulse');
      setTimeout(function () {
        btn.classList.remove('is-added');
        if (label) label.textContent = 'Add';
      }, 1100);
      render();
    });

    body.addEventListener('click', function (e) {
      var b = e.target.closest('[data-step]');
      if (!b) return;
      var i = parseInt(b.getAttribute('data-i'), 10);
      cart[i].qty += parseInt(b.getAttribute('data-step'), 10);
      if (cart[i].qty < 1) cart.splice(i, 1);
      render();
    });

    document.getElementById('openCart').addEventListener('click', function () { setDrawer(true); });
    document.getElementById('closeCart').addEventListener('click', function () { setDrawer(false); });
    scrim.addEventListener('click', function () { setDrawer(false); });

    document.getElementById('placeOrder').addEventListener('click', function () {
      document.getElementById('checkoutForm').hidden = true;
      document.getElementById('orderDone').hidden = false;
      document.getElementById('orderNo').textContent = 'TES-' + (Math.floor(Math.random() * 9000) + 1000);
      cart = [];
      render();
    });

    render();
  }

  /* ---------- escape closes whatever is open ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.modal.is-on');
    if (open) { closeModal(open); return; }
    if (closeDrawer && drawer && drawer.classList.contains('is-on')) closeDrawer();
    if (nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.textContent = 'Menu';
    }
  });
})();
