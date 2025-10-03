// Minimal enhancements and WhatsApp integration (no frameworks)
(function () {
  const DEFAULT_WHATSAPP_PHONE = '919876543210'; // Replace with your number (country code + number)

  // Init AOS animations when loaded
  window.addEventListener('load', function () {
    if (window.AOS) {
      window.AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
    }
  });

  // Header year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navList.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      navList.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Smooth scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length === 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Construct WhatsApp link
  function buildWhatsAppLink(phone, message) {
    const number = (phone || '').replace(/\D/g, '') || DEFAULT_WHATSAPP_PHONE;
    const text = encodeURIComponent(message || 'Hi, I need appliance repair service in Pune.');
    return `https://wa.me/${number}?text=${text}`;
  }

  // No booking form: hero CTA scroll now targets contact panel

  // Floating WhatsApp CTA dynamic message
  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.addEventListener('click', function (e) {
      const message = 'Hi PrimeFix, I need appliance repair service in Pune.';
      const link = buildWhatsAppLink(DEFAULT_WHATSAPP_PHONE, message);
      waFloat.setAttribute('href', link);
    });
  }

  // Image fallback handler for stock photos
  function addImageFallbacks() {
    document.querySelectorAll('img[data-fallback]')
      .forEach((img) => {
        const primary = img.getAttribute('src');
        const fallback = img.getAttribute('data-fallback');
        const fallback2 = img.getAttribute('data-fallback2');
        let triedFallback = false;
        img.addEventListener('error', () => {
          if (!triedFallback && fallback) {
            triedFallback = true;
            img.src = fallback;
          } else if (fallback2) {
            img.src = fallback2;
          }
        }, { once: false });
      });
  }
  addImageFallbacks();

  // Hero CTA -> focus contact section
  const heroWa = document.getElementById('hero-wa-cta');
  if (heroWa) {
    heroWa.addEventListener('click', (e) => {
      const contactPanel = document.querySelector('#contact .contact-panel');
      if (contactPanel) {
        e.preventDefault();
        const top = contactPanel.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }
})();
