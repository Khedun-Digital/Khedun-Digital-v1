/**
 * Khedun Digital - Interactive Profile Card Component
 * Professional company profile showcase with animations
 */

class KDAtom {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }

        this.options = {
            interactive: options.interactive !== false,
            enableTilt: options.enableTilt !== false,
            enableMobileTilt: options.enableMobileTilt !== false,
            ...options
        };

        this.companyInfo = {
            name: "Khedun Digital",
            title: "Digital Innovation Agency",
            handle: "@khedundigital",
            status: "Available",
            description: "Transforming businesses through AI, automation, web development, and intelligent digital marketing solutions.",
            contactText: "Get Started",
            avatarUrl: "assets/images/khedun_digital_logo.png"
        };

        this.init();
    }

    init() {
        this.createStructure();
        this.setupEventListeners();
        console.log('KD Profile Card initialized successfully');
    }

    createStructure() {
        this.container.innerHTML = '';

        // Create profile card container
        const cardContainer = document.createElement('div');
        cardContainer.className = 'kd-profile-card';

        // Create main profile card
        const profileCard = document.createElement('div');
        profileCard.className = 'kd-profile-main';

        profileCard.innerHTML = `
            <div class="kd-profile-avatar">
                <img src="${this.companyInfo.avatarUrl}" alt="${this.companyInfo.name} Logo" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRDcwMDtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNFRTk1QTBDc3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHRleHQgeD0iNTAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxQTFBMSIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPktEPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSI2NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjRkZGRkZGIiBmb250LXdlaWdodD0ibm9ybWFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ESUdJVEFMPC90ZXh0Pjwvc3ZnPg=='">
            </div>
            <div class="kd-profile-name">${this.companyInfo.name}</div>
            <div class="kd-profile-title">${this.companyInfo.title}</div>
            <div class="kd-profile-status">
                <span>${this.companyInfo.status}</span>
            </div>
            <div class="kd-profile-description">${this.companyInfo.description}</div>
            <button class="kd-profile-contact" type="button">${this.companyInfo.contactText}</button>
        `;

        // Assemble the structure
        cardContainer.appendChild(profileCard);
        this.container.appendChild(cardContainer);
    }

    setupEventListeners() {
        if (!this.options.interactive) return;

        const profileCard = this.container.querySelector('.kd-profile-main');
        const contactBtn = this.container.querySelector('.kd-profile-contact');

        if (profileCard) {
            // Mouse tracking for interactive glow effect
            profileCard.addEventListener('mouseenter', (e) => {
                const rect = profileCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                profileCard.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                profileCard.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
            });

            profileCard.addEventListener('mousemove', (e) => {
                const rect = profileCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                profileCard.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                profileCard.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
            });

            profileCard.addEventListener('mouseleave', () => {
                profileCard.style.removeProperty('--mouse-x');
                profileCard.style.removeProperty('--mouse-y');
            });
        }

        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                console.log('Contact Khedun Digital clicked');
                // Scroll to contact section or open modal
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    updateInfo(updates) {
        this.companyInfo = { ...this.companyInfo, ...updates };
        this.createStructure();
        this.setupEventListeners();
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Global function for easy initialization
window.KDAtom = KDAtom;