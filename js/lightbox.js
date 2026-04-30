(function () {
  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';

  const img = document.createElement('img');
  img.id = 'lb-img';

  const closeBtn = document.createElement('button');
  closeBtn.id = 'lb-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&times;';

  const prevBtn = document.createElement('button');
  prevBtn.id = 'lb-prev';
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = '&#8592;';

  const nextBtn = document.createElement('button');
  nextBtn.id = 'lb-next';
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = '&#8594;';

  overlay.appendChild(closeBtn);
  overlay.appendChild(prevBtn);
  overlay.appendChild(img);
  overlay.appendChild(nextBtn);
  document.body.appendChild(overlay);

  let groupImages = [];
  let currentIndex = 0;

  function showNav(visible) {
    prevBtn.style.display = visible ? 'flex' : 'none';
    nextBtn.style.display = visible ? 'flex' : 'none';
  }

  function openLb(src, alt, group, index) {
    if (group) {
      groupImages = Array.from(document.querySelectorAll('[data-lb-group="' + group + '"]'));
      currentIndex = index;
      showNav(true);
    } else {
      groupImages = [];
      currentIndex = 0;
      showNav(false);
    }
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

  function navigate(dir) {
    if (!groupImages.length) return;
    currentIndex = (currentIndex + dir + groupImages.length) % groupImages.length;
    var el = groupImages[currentIndex];
    img.src = el.src;
    img.alt = el.alt || '';
  }

  closeBtn.addEventListener('click', closeLb);
  prevBtn.addEventListener('click', function (e) { e.stopPropagation(); navigate(-1); });
  nextBtn.addEventListener('click', function (e) { e.stopPropagation(); navigate(1); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLb();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  document.querySelectorAll('.artwork-card img').forEach(function (el) {
    el.addEventListener('click', function () {
      var group = el.getAttribute('data-lb-group');
      var index = group ? parseInt(el.getAttribute('data-lb-index') || '0', 10) : 0;
      openLb(el.src, el.alt, group, index);
    });
  });
})();
