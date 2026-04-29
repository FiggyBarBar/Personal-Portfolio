/*
Name: TyVaughn Yazzie
File Name: script.js
Date: 4/28/2026
*/

function toggleMenu() {
  var nav = document.querySelector('nav');
  var hamburger = document.getElementById('hamburger');
  var isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!isExpanded));
  nav.classList.toggle('nav-open');
}

function initScrollAnimations() {
  var elements = document.querySelectorAll('section, .card, aside');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  elements.forEach(function (el, i) {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = (Math.min(i, 5) * 0.07) + 's';
    observer.observe(el);
  });
}

function initContactForm() {
  var forms = document.querySelectorAll('.contact-form');
  if (!forms.length) return;

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('.submit-btn');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      var data = {
        name:    (form.querySelector('[name="name"]')    || {}).value || '',
        email:   (form.querySelector('[name="email"]')   || {}).value || '',
        subject: (form.querySelector('[name="subject"]') || {}).value || '',
        message: (form.querySelector('[name="message"]') || {}).value || ''
      };

      fetch('https://formsubmit.co/ajax/tyvyaz_e@icloud.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function () {
          showFormResult(form, true);
          form.reset();
          btn.textContent = 'Sent';
        })
        .catch(function () {
          showFormResult(form, false);
          btn.textContent = 'Send Message';
          btn.disabled = false;
        });
    });
  });
}

function showFormResult(form, success) {
  var existing = form.querySelector('.form-result');
  if (existing) existing.remove();

  var msg = document.createElement('p');
  msg.className = 'form-result ' + (success ? 'form-result--success' : 'form-result--error');
  msg.textContent = success
    ? "Message sent. I'll get back to you soon."
    : 'Something went wrong. Please try again.';
  form.appendChild(msg);
}

function initScrollProgress() {
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', function () {
    var total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  }, { passive: true });
}

function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  var glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  document.addEventListener('mousemove', function (e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

function initActiveNav() {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

function initBackToTop() {
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '&#8593;';
  btn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(btn);

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
}

function initSkillBars() {
  var fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.pct;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  fills.forEach(function (el) { obs.observe(el); });
}

document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.getElementById('hamburger');
  if (hamburger) hamburger.addEventListener('click', toggleMenu);

  initScrollProgress();
  initCursorGlow();
  initActiveNav();
  initBackToTop();
  initScrollAnimations();
  initSkillBars();
  initContactForm();
});
