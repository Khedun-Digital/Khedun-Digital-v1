
/**
 * Khedun Digital hero orb particle engine.
 * Creates a self-contained particle animation bound to a canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {Partial<OrbSettings>} overrides
 * @returns {{ destroy(): void, settings: OrbSettings }}
 */
export function createOrbAnimator(canvas, overrides = {}) {
    if (!(canvas instanceof HTMLCanvasElement)) {
        console.warn('createOrbAnimator expects a canvas element.');
        return { destroy() {}, settings: {} };
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.warn('Unable to acquire 2D context for hero orb.');
        return { destroy() {}, settings: {} };
    }

    const settings = {
        particleCount: 1800,
        radius: 1.52,
        baseSize: 1.4,
        twinkle: 0.55,
        spinSpeed: 0.011,
        yawFactor: 0.26,
        tiltAmplitude: 0.55,
        tiltFrequency: 0.5,
        projectionScale: 0.294,
        perspective: 3.5,
        shadowColor: 'rgba(255, 200, 120, 0.35)',
            resizeTarget: null
    };
    Object.assign(settings, overrides);

    const particles = new Array(settings.particleCount);

    const makeParticle = () => {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);

        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        const radius = settings.radius;

        const x = radius * sinPhi * Math.cos(theta);
        const y = radius * cosPhi;
        const z = radius * sinPhi * Math.sin(theta);

        const hue = 32 + Math.random() * 18;
        const saturation = 65 + Math.random() * 25;
        const lightness = 42 + Math.random() * 25;

        return {
            base: { x, y, z },
            color: `hsla(${hue}, ${saturation}%, ${lightness}%, 0.9)`,
            size: settings.baseSize * (0.45 + Math.random() * 0.55),
            phase: Math.random() * Math.PI * 2
        };
    };

    for (let i = 0; i < settings.particleCount; i += 1) {
        particles[i] = makeParticle();
    }

    let viewWidth = 0;
    let viewHeight = 0;
    let deviceRatio = 1;

    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        viewWidth = rect.width;
        viewHeight = rect.height;
        if (!viewWidth || !viewHeight) {
            return;
        }

        deviceRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = viewWidth * deviceRatio;
        canvas.height = viewHeight * deviceRatio;
        ctx.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);
    };

    const rotateY = (point, angle) => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
            x: point.x * cos - point.z * sin,
            y: point.y,
            z: point.x * sin + point.z * cos
        };
    };

    const rotateX = (point, angle) => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
            x: point.x,
            y: point.y * cos - point.z * sin,
            z: point.y * sin + point.z * cos
        };
    };

    const project = (point) => {
        const perspective = settings.perspective;
        const depth = perspective / (perspective - point.z);
        return {
            x: point.x * depth * viewWidth * settings.projectionScale + viewWidth / 2,
            y: point.y * depth * viewHeight * settings.projectionScale + viewHeight / 2,
            scale: depth
        };
    };

    resize();

    let animationFrame = 0;
    let time = 0;

    const render = () => {
        animationFrame = window.requestAnimationFrame(render);
        if (!viewWidth || !viewHeight) {
            return;
        }

        time += settings.spinSpeed;
        ctx.clearRect(0, 0, viewWidth, viewHeight);

        const rotationY = time * settings.yawFactor;
        const rotationX = Math.sin(time * settings.tiltFrequency) * settings.tiltAmplitude;

        for (let i = 0; i < particles.length; i += 1) {
            const particle = particles[i];
            const twinkle = 1 + Math.sin(time * 2.2 + particle.phase) * settings.twinkle * 0.2;

            const rotatedY = rotateY(particle.base, rotationY);
            const rotated = rotateX(rotatedY, rotationX);
            const projected = project(rotated);

            const size = particle.size * projected.scale * twinkle;
            const depthFade = Math.max(0.2, Math.min(1, projected.scale * 0.65));

            ctx.beginPath();
            ctx.fillStyle = particle.color.replace('0.9', (0.45 + depthFade * 0.55).toFixed(2));
            ctx.shadowColor = settings.shadowColor;
            ctx.shadowBlur = size * 1.8;
            ctx.globalAlpha = depthFade;
            ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1;
    };

    render();

    window.addEventListener('resize', resize);
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas.parentElement || canvas);
    }

    return {
        destroy() {
            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
            }
            window.removeEventListener('resize', resize);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        },
        settings
    };
}
