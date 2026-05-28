// Microsoft Clarity loader. Reads the project ID from <meta name="clarity-id">
// rendered by the BaseLayout when PUBLIC_CLARITY_PROJECT_ID is set at build
// time. No-op otherwise. See CLAUDE.md → "Analytics stack" for setup.
(function (c, l, a, r) {
  var meta = l.querySelector('meta[name="clarity-id"]');
  if (!meta || !meta.content) return;
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  var t = l.createElement(r);
  t.async = 1;
  t.src = 'https://www.clarity.ms/tag/' + meta.content;
  var y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, 'clarity', 'script');
