
(function () {
  'use strict';

  // active nav link highlighting
  var path = window.location.pathname;
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href !== '/' && path.startsWith(href)) {
      link.classList.add('active');
    }
  });

  // keyboard shortcut: press 'g h' to go home, 'g l' for log, etc.
  var pending = null;
  var timeout = null;
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'g') {
      pending = 'g';
      timeout = setTimeout(function () { pending = null; }, 1000);
      return;
    }
    if (pending === 'g') {
      clearTimeout(timeout);
      pending = null;
      var routes = { h: '/', l: '/log/', p: '/projects/', c: '/contact/' };
      if (routes[e.key]) window.location.href = routes[e.key];
    }
  });
})();
