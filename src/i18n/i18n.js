import { zh } from './zh.js';

const originals = new Map();

function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
  localStorage.setItem('lang', lang);

  // Translate text content and innerHTML
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (!originals.has(el)) {
      originals.set(el, {
        content: el.hasAttribute('data-i18n-html') ? el.innerHTML : el.textContent
      });
    }
    if (lang === 'zh' && zh[key]) {
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = zh[key];
      else el.textContent = zh[key];
    } else {
      var orig = originals.get(el);
      if (orig) {
        if (el.hasAttribute('data-i18n-html')) el.innerHTML = orig.content;
        else el.textContent = orig.content;
      }
    }
  });

  // Translate placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-placeholder');
    var mapKey = 'placeholder:' + key;
    if (!originals.has(mapKey)) originals.set(mapKey, el.getAttribute('placeholder'));
    if (lang === 'zh' && zh[key]) el.setAttribute('placeholder', zh[key]);
    else el.setAttribute('placeholder', originals.get(mapKey));
  });

  // Update toggle button labels
  document.querySelectorAll('.lang-toggle').forEach(function (btn) {
    btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
  });

  // Remove FOUC hide after first translation pass
  document.documentElement.classList.add('i18n-ready');
}

// Initialize
var currentLang = document.documentElement.getAttribute('data-lang') || 'en';
if (currentLang === 'zh') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { applyLang('zh'); });
  } else {
    applyLang('zh');
  }
}

// Toggle handler — bind to all .lang-toggle buttons (desktop + mobile)
document.querySelectorAll('.lang-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-lang') || 'en';
    applyLang(current === 'zh' ? 'en' : 'zh');
  });
});
