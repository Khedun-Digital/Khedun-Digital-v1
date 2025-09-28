
import { createOrbAnimator } from '../orb-particle-engine.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
            width: var(--hero-orb-size, 400px);
            height: var(--hero-orb-size, 400px);
            position: relative;
        }

        canvas {
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 50%;
        }
    </style>
    <canvas part="canvas"></canvas>
`;

class KdHeroOrb extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this._canvas = shadowRoot.querySelector('canvas');
        this._controller = null;
    }

    static get observedAttributes() {
        return ['spin-speed', 'twinkle', 'size'];
    }

    connectedCallback() {
        this._ensureAnimator();
    }

    disconnectedCallback() {
        this._destroyAnimator();
    }

    attributeChangedCallback() {
        if (this.isConnected) {
            this._destroyAnimator();
            this._ensureAnimator();
        }
    }

    _ensureAnimator() {
        if (this._controller) {
            return;
        }
        const { hostSize, spinSpeed, twinkle } = this._collectOptions();
        if (hostSize) {
            this.style.setProperty('--hero-orb-size', `${hostSize}px`);
        }
        this._controller = createOrbAnimator(this._canvas, {
            spinSpeed,
            twinkle,
            resizeTarget: this
        });
    }

    _destroyAnimator() {
        if (this._controller) {
            this._controller.destroy();
            this._controller = null;
        }
    }

    _collectOptions() {
        const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const sizeAttr = parseFloat(this.getAttribute('size'));
        const hostSize = Number.isFinite(sizeAttr) && sizeAttr > 0 ? sizeAttr : null;
        const spinAttr = parseFloat(this.getAttribute('spin-speed'));
        const twinkleAttr = parseFloat(this.getAttribute('twinkle'));

        return {
            hostSize,
            spinSpeed: Number.isFinite(spinAttr) ? spinAttr : (coarsePointer ? 0.008 : 0.011),
            twinkle: Number.isFinite(twinkleAttr) ? twinkleAttr : (coarsePointer ? 0.45 : 0.55)
        };
    }
}

customElements.define('kd-hero-orb', KdHeroOrb);
