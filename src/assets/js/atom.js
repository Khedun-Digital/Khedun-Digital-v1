/**
 * Khedun Digital - Modern Profile Card Components
 * Inspired by reactbits.dev ProfileCard
 */

// Profile Card Factory for Service Listings
class KDProfileCard {
    static createServiceCard(options = {}) {
        const { avatar, name, description, tags = [] } = options;

        const card = document.createElement('div');
        card.className = 'kd-profile-card';

        const avatarHtml = avatar ?
            `<div class="kd-profile-avatar"><img src="${avatar}" alt="${name}"></div>` :
            `<div class="kd-profile-avatar"><div class="w-full h-full bg-gradient-to-br from-gold to-burntorange flex items-center justify-center rounded-lg"><span class="text-2xl font-bold text-charcoal">${name.charAt(0)}</span></div></div>`;

        const tagsHtml = tags.length > 0 ?
            `<div class="kd-profile-tags">${tags.map(tag => `<span class="kd-profile-tag">${tag}</span>`).join('')}</div>` :
            '';

        card.innerHTML = `
            ${avatarHtml}
            <div class="kd-profile-name">${name}</div>
            <div class="kd-profile-description">${description}</div>
            ${tagsHtml}
        `;

        return card;
    }
}

// Minimal Hero Card Component
class KDMinimalCard {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }

        this.options = {
            avatar: options.avatar || 'assets/images/khedun_digital_logo.png',
            name: options.name || 'Khedun Digital',
            interactive: options.interactive !== false,
            ...options
        };

        this.init();
    }

    init() {
        this.createStructure();
        this.setupEventListeners();
        console.log('KD Minimal Card initialized successfully');
    }

    createStructure() {
        this.container.innerHTML = '';

        const card = document.createElement('div');
        card.className = 'kd-minimal-card';

        card.innerHTML = `
            <div class="kd-minimal-avatar">
                <img src="${this.options.avatar}" alt="${this.options.name} Logo" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRDcwMDtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNFRTk1QTBDc3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHRleHQgeD0iNTAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxQTFBMSIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPktEPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSI2NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjRkZGRkZGIiBmb250LXdlaWdodD0ibm9ybWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ESUdJVEFMPC90ZXh0Pjwvc3ZnPg=='">
            </div>
            <div class="kd-minimal-name">${this.options.name}</div>
        `;

        this.container.appendChild(card);
    }

    setupEventListeners() {
        if (!this.options.interactive) return;

        const card = this.container.querySelector('.kd-minimal-card');

        if (card) {
            // Mouse tracking for subtle glow effect
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.removeProperty('--mouse-x');
                card.style.removeProperty('--mouse-y');
            });
        }
    }
}

// Global functions for easy initialization
window.KDProfileCard = KDProfileCard;
window.KDMinimalCard = KDMinimalCard;