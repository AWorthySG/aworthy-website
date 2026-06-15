// A-Worthy celebration microinteraction — a lightweight, dependency-free
// confetti burst for success moments (form submits, tool completions).
// Exposed as window.aworthyCelebrate(). No-op when the user prefers
// reduced motion. See CLAUDE.md → "game feel" microinteractions.
(function () {
  function celebrate(opts) {
    opts = opts || {};
    try {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    } catch (e) {}

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:200;';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; }
    size();

    // Brand-leaning palette (gold/blue) plus a couple of pops.
    var colors = ['#D4853A', '#E09850', '#2B5A8C', '#4A8C6F', '#B0436A', '#f0b878'];
    var originX = (opts.x != null ? opts.x : innerWidth / 2) * dpr;
    var originY = (opts.y != null ? opts.y : innerHeight * 0.28) * dpr;
    var count = opts.count || 110;
    var parts = [];
    for (var i = 0; i < count; i++) {
      var ang = Math.PI * 2 * (i / count) + (Math.random() - 0.5);
      var speed = (4 + Math.random() * 7) * dpr;
      parts.push({
        x: originX, y: originY,
        vx: Math.cos(ang) * speed * (0.6 + Math.random()),
        vy: Math.sin(ang) * speed - (3 + Math.random() * 4) * dpr,
        size: (4 + Math.random() * 5) * dpr,
        color: colors[(Math.random() * colors.length) | 0],
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
        life: 0
      });
    }

    var gravity = 0.18 * dpr;
    var maxLife = 90; // frames (~1.5s)
    var raf;
    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (p.life > maxLife) continue;
        alive = true;
        p.life++;
        p.vy += gravity;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - p.life / maxLife);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      if (alive) { raf = requestAnimationFrame(frame); }
      else { cancelAnimationFrame(raf); canvas.remove(); }
    }
    raf = requestAnimationFrame(frame);
    // safety cleanup
    setTimeout(function () { try { cancelAnimationFrame(raf); canvas.remove(); } catch (e) {} }, 4000);
  }

  window.aworthyCelebrate = celebrate;
})();
