const STAR_COUNT = 220;
const STAR_COLORS = [
  '#FFD700',
  '#FFE08A',
  '#FFA94D',
  '#FFB347',
  '#FFD1AA'
];

function createStarfield(ctx, width, height) {
  const stars = [];
  for (let i = 0; i < STAR_COUNT; i += 1) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      depth: Math.random() * 0.6 + 0.4,
      twinkle: Math.random() * Math.PI * 2
    });
  }
  return stars;
}

function initGalaxy() {
  const container = document.querySelector('.galaxy-container');
  if (!container) {
    console.warn('[galaxy] .galaxy-container not found');
    return;
  }

  let canvas = container.querySelector('#galaxy-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'galaxy-canvas';
    container.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('[galaxy] Canvas context unavailable – using CSS fallback only');
    return;
  }

  const nebulaLayer = document.createElement('div');
  nebulaLayer.className = 'galaxy-background';
  nebulaLayer.innerHTML = `
    <div class="star-layer star-layer-1"></div>
    <div class="star-layer star-layer-2"></div>
    <div class="star-layer star-layer-3"></div>
    <div class="nebula-layer nebula-1"></div>
    <div class="nebula-layer nebula-2"></div>
    <div class="nebula-layer nebula-3"></div>
    <div class="galaxy-core"></div>
  `;
  container.appendChild(nebulaLayer);

  const state = {
    stars: [],
    width: 0,
    height: 0,
    mouse: { x: 0.5, y: 0.5 },
    targetMouse: { x: 0.5, y: 0.5 },
    lastTimestamp: performance.now()
  };

  const resize = () => {
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.width = rect.width;
    state.height = rect.height;
    state.stars = createStarfield(ctx, rect.width, rect.height);
  };

  const onMouseMove = (event) => {
    const rect = container.getBoundingClientRect();
    state.targetMouse.x = (event.clientX - rect.left) / rect.width;
    state.targetMouse.y = (event.clientY - rect.top) / rect.height;
    container.style.setProperty('--mouse-x', `${state.targetMouse.x * 100}%`);
    container.style.setProperty('--mouse-y', `${state.targetMouse.y * 100}%`);
  };

  const onMouseLeave = () => {
    state.targetMouse.x = 0.5;
    state.targetMouse.y = 0.5;
  };

  const render = (timestamp) => {
    const delta = Math.min((timestamp - state.lastTimestamp) / 1000, 0.1);
    state.lastTimestamp = timestamp || performance.now();

    state.mouse.x += (state.targetMouse.x - state.mouse.x) * 0.065;
    state.mouse.y += (state.targetMouse.y - state.mouse.y) * 0.065;

    ctx.clearRect(0, 0, state.width, state.height);

    for (const star of state.stars) {
      const parallaxX = (state.mouse.x - 0.5) * star.depth * 15;
      const parallaxY = (state.mouse.y - 0.5) * star.depth * 15;
      star.twinkle += delta * (0.75 + star.depth);
      const twinkle = (Math.sin(star.twinkle) + 1) * 0.25 + 0.45;

      ctx.beginPath();
      ctx.fillStyle = star.color;
      ctx.globalAlpha = Math.min(1, twinkle * star.depth + 0.25);
      ctx.arc(star.x + parallaxX, star.y + parallaxY, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(render);
  };

  resize();
  render(performance.now());

  window.addEventListener('resize', resize);
  container.addEventListener('mousemove', onMouseMove, { passive: true });
  container.addEventListener('mouseleave', onMouseLeave, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGalaxy);
} else {
  initGalaxy();
}

export { initGalaxy };
