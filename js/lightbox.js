(function () {
  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';

  const img = document.createElement('img');
  img.id = 'lb-img';

  const btn = document.createElement('button');
  btn.id = 'lb-close';
  btn.setAttribute('aria-label', 'Close');
  btn.innerHTML = '&times;';

  overlay.appendChild(btn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function openLb(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    img.src = '';
  }

  btn.addEventListener('click', closeLb);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLb();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLb();
  });

  document.querySelectorAll('.artwork-card img').forEach(function (el) {
    el.addEventListener('click', function () {
      openLb(el.src, el.alt);
    });
  });
})();
