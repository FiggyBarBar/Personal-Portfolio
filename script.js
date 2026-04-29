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
    el.style.transitionDelay = (Math.min(i, 4) * 0.07) + 's';
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

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('hamburger').addEventListener('click', toggleMenu);
  initScrollAnimations();
  initContactForm();
});
