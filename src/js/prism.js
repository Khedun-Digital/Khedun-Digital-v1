let OGLModule = null;

async function loadOGL() {
  if (OGLModule) return OGLModule;

  const cdns = [
    'https://unpkg.com/ogl@0.0.84/dist/ogl.mjs',
    'https://cdn.jsdelivr.net/npm/ogl@0.0.84/dist/ogl.mjs',
    'https://esm.sh/ogl@0.0.84'
  ];

  for (const url of cdns) {
    try {
      console.info(`[prism] Loading OGL from ${url}`);
      // eslint-disable-next-line no-await-in-loop
      OGLModule = await import(url);
      console.info('[prism] OGL loaded successfully');
      break;
    } catch (error) {
      console.warn(`[prism] Failed to load ${url}`, error);
    }
  }

  if (!OGLModule) {
    throw new Error('Unable to load OGL from any CDN');
  }

  return OGLModule;
}

function createCSSFallback() {
  const host = document.querySelector('[data-prism]');
  if (!host) {
    console.warn('[prism] No [data-prism] host found for fallback');
    return;
  }

  const fallback = document.createElement('div');
  fallback.className = 'prism-fallback';
  fallback.style.background = `
    radial-gradient(circle at 25% 30%, rgba(255, 215, 0, 0.12) 0%, transparent 55%),
    radial-gradient(circle at 70% 65%, rgba(233, 90, 12, 0.1) 0%, transparent 45%),
    radial-gradient(circle at 50% 50%, rgba(255, 153, 51, 0.08) 0%, transparent 65%)
  `;
  fallback.style.animation = 'prismGlow 6s ease-in-out infinite alternate';

  if (!document.getElementById('prism-fallback-keyframes')) {
    const style = document.createElement('style');
    style.id = 'prism-fallback-keyframes';
    style.textContent = `
      @keyframes prismGlow {
        0% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.03); }
        100% { opacity: 0.6; transform: scale(1.01); }
      }
    `;
    document.head.appendChild(style);
  }

  host.appendChild(fallback);
  console.info('[prism] CSS fallback initialised');
}

async function initPrism(options = {}) {
  try {
    const ogl = await loadOGL();
    console.info('[prism] OGL available – you can implement advanced shader logic here', ogl, options);
  } catch (error) {
    console.error('[prism] Falling back to CSS-only background', error);
    createCSSFallback();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initPrism());
} else {
  initPrism();
}

export { initPrism, loadOGL };
