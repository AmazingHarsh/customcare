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

  // Booking form -> open WhatsApp
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const phoneEl = form.querySelector('#phone');
      const nameEl = form.querySelector('#name');
      const appEl = form.querySelector('#appliance');
      const issueEl = form.querySelector('#issue');
      const timeEl = form.querySelector('#time');
      const areaEl = form.querySelector('#area');

      const userPhone = (phoneEl?.value || '').replace(/\D/g, '');
      const customerName = (nameEl?.value || '').trim();
      if (!customerName || userPhone.length !== 10) {
        alert('Please enter your name and a valid 10-digit mobile number.');
        return;
      }

      const appliance = appEl?.value || '';
      const issue = (issueEl?.value || '').trim();
      const prefTime = timeEl?.value || 'Anytime';
      const area = (areaEl?.value || '').trim();

      const lines = [
        `Name: ${customerName}`,
        `Mobile: +91 ${userPhone}`,
        `Appliance: ${appliance}`,
        issue ? `Issue: ${issue}` : null,
        `Preferred time: ${prefTime}`,
        area ? `Area: ${area}` : null,
        `City: Pune`
      ].filter(Boolean);

      const msg = `Hi PrimeFix,%0A%0A${lines.join('%0A')}%0A%0APlease confirm the visit.`;
      const businessPhone = form.getAttribute('data-phone') || DEFAULT_WHATSAPP_PHONE;
      const link = `https://wa.me/${businessPhone}?text=${msg}`;
      window.open(link, '_blank');
    });
  }

  // Floating WhatsApp CTA dynamic message
  const waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.addEventListener('click', function (e) {
      const message = 'Hi PrimeFix, I need appliance repair service in Pune.';
      const link = buildWhatsAppLink(DEFAULT_WHATSAPP_PHONE, message);
      waFloat.setAttribute('href', link);
    });
  }

  // Hero CTA -> focus contact section
  const heroWa = document.getElementById('hero-wa-cta');
  if (heroWa) {
    heroWa.addEventListener('click', (e) => {
      const formEl = document.getElementById('booking-form');
      if (formEl) {
        e.preventDefault();
        const top = formEl.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('name');
          nameInput && nameInput.focus();
        }, 600);
      }
    });
  }
})();
