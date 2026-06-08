# Khedun Digital Website Recreation Guide

This document captures how the current Khedun Digital website is assembled so future teams can recreate it, fork it into niche-specific sub-company websites, or use it as the baseline for a more scalable static-site system.

## 1. Current Website Snapshot

Khedun Digital is a static, multi-page marketing website for a digital solutions company. The current brand message is **“Where intelligent systems meet elegant design”**, supported by four primary service pillars:

1. **Web & UX Design** — websites, interfaces, prototypes, and design systems.
2. **Data-Driven Marketing** — SEO, advertising packages, analytics, and campaign visibility.
3. **Artificial Intelligence** — custom GPT-powered assistants, knowledge retrieval, and business workflow support.
4. **Process Automation** — Docker/n8n-style workflow automation, offline-first deployments, and privacy-sensitive operational systems.

The main site acts as a parent brand landing page. Each service pillar has a dedicated service page under `pages/`, and duplicate pages currently exist under `src/pages/` for testing/build compatibility.

## 2. Repository Map

```text
.
├── index.html                         # Parent brand landing page
├── pages/                             # Public service landing pages
│   ├── ai.html
│   ├── automation.html
│   ├── marketing.html
│   └── web.html
├── src/pages/                         # Duplicate service pages used by current tests
├── assets/images/                     # Public page image assets
├── src/assets/images/                 # Source image assets used by optimization script
├── styles/                            # Main CSS architecture
│   ├── main.css                       # Tokens, base styles, utilities, buttons, cards
│   ├── components.css                 # Navbar, hero, service cards, carousels, footer
│   ├── animations.css                 # Reveal, stagger, glow, float, reduced-motion support
│   ├── galaxy.css                     # Galaxy/orb visual styling
│   ├── prism.css                      # Prism visual styling
│   └── prismatic-burst.css            # Burst visual styling
├── scripts/main.js                    # Main interaction layer
├── src/js/                            # Experimental/alternate visual effects
├── tests/run-tests.js                 # Basic structural and pricing-regression checks
├── package.json                       # npm scripts, dependencies, project metadata
├── tailwind.config.js                 # Tailwind token extension
└── postcss.config.js                  # CSS build pipeline
```

## 3. Technology Stack

### Runtime

- **HTML5** for static page structure.
- **CSS3** with custom properties, component files, responsive media queries, and animation utilities.
- **Vanilla JavaScript** for navigation, scroll behavior, reveal animations, lazy-loading helpers, and accessibility enhancements.
- **CDN Tailwind classes** appear on service pages, while the project also contains a PostCSS/Tailwind build configuration.

### npm Tooling

- `npm run dev` / `npm start` starts `live-server` on port `3000`.
- `npm run build` runs CSS compilation, JS minification, and image optimization into `public/`.
- `npm test` runs a Cheerio-based page sanity check.
- `npm run lint` currently targets `public/*.html`, so it is only useful after a production build creates `public` HTML files or after the lint script is updated.

## 4. Page Inventory and Content Model

### 4.1 Parent Landing Page: `index.html`

Purpose: Position Khedun Digital as the umbrella company and route visitors to the best service line.

Recommended section model:

1. **Navigation**
   - Parent logo.
   - Anchor links: Home, Services, About, Contact.
   - Mobile menu button with `id="menu-btn"` and menu with `id="mobile-menu"`.
2. **Hero**
   - Core parent-brand promise.
   - Short value proposition.
   - Primary CTA: explore solutions.
   - Secondary CTA: book consultation.
3. **Services**
   - Four cards, one for each pillar.
   - Each card includes logo, title, proof-oriented description, tags, and a service-page CTA.
4. **About**
   - Founder/company positioning.
   - Why technical systems plus design matter.
5. **Testimonials / Social Proof**
   - Current testimonials are placeholders and should be replaced with verified client proof before high-intent campaigns.
6. **Contact**
   - Phone, email, headquarters, and CTA copy.
7. **Footer**
   - Copyright and basic brand closure.

### 4.2 Web & UX Page: `pages/web.html`

Purpose: Sell design and website delivery.

Current positioning: “Interfaces built for elegance and function.”

Recommended content model:

1. Hero with web logo, promise, and project CTA.
2. Core offerings: UI/UX Design, Web Development, Design Prototyping.
3. Tool credibility: Figma, TailwindCSS, Framer, Vercel.
4. Packages: Starter and Starter+ with custom pricing.
5. Portfolio carousel/live previews.
6. Client testimonials.
7. Consultation CTA.

### 4.3 Marketing Page: `pages/marketing.html`

Purpose: Sell AI-assisted marketing execution and reporting.

Current positioning: “Leverage AI and analytics to grow your business with targeted, intelligent campaigns.”

Recommended content model:

1. Hero with growth promise and immediate CTA.
2. Campaign value section.
3. Core packages: Smart Business and Smart Business+.
4. Standalone advertising packages: Advertising +, ++, +++.
5. CTA focused on booking a consult.

### 4.4 AI Assistants Page: `pages/ai.html`

Purpose: Sell internal AI assistants connected to business knowledge and workflows.

Current positioning: “Your Business Brain, Supercharged by AI.”

Recommended content model:

1. Hero with demo CTA.
2. Product explanation: ChatUI connected to Google Workspace and internal knowledge.
3. Served audiences: medical, legal, agencies, operations-heavy teams, support-heavy providers.
4. Feature list: dashboards, document retrieval, email/calendar support, SOP interpretation, voice assistant, reports, local RAG.
5. Assistant packages.
6. Add-ons.
7. Performance-based model CTA.
8. Contact and quote options.

### 4.5 Automation Page: `pages/automation.html`

Purpose: Sell workflow deployment, operational automation, and privacy-sensitive offline-first systems.

Current positioning: “Offline-first. Secure. Built for every industry.”

Recommended content model:

1. Hero with audit CTA.
2. Audience list: clinics, small businesses, legal/financial firms, operations teams, privacy-sensitive sectors.
3. Feature overview.
4. Automation packages and standard plans.
5. Shared add-ons.
6. Specialized add-ons.
7. Results-based payment option.
8. Timelines and contractual terms.
9. Audit/deployment booking CTAs.
10. FAQ.

## 5. Styling System

### 5.1 Brand Tokens

The global design system starts in `styles/main.css` using CSS custom properties. The current primary palette is:

```css
--color-primary: #FFD700;    /* Gold */
--color-secondary: #E95A0C;  /* Burnt Orange */
--color-accent: #FF6B35;     /* Accent Orange */
--color-dark: #1A1A1A;       /* Charcoal */
--color-darker: #0F0F0F;     /* Dark Background */
--color-light: #2A2A2A;      /* Card/section surface */
```

Typography uses:

- **Montserrat** for headings.
- **Raleway** for body copy.

When recreating a site for a sub-company, keep the spacing, layout, and component semantics stable, then swap only the token layer first. This makes the new brand feel distinct without rebuilding the entire site.

### 5.2 Component Layers

- `styles/main.css`: global reset, tokens, base typography, layout helpers, buttons, cards, focus states, print styles, and effect utilities.
- `styles/components.css`: navbar, hero, service cards, carousels, section headers, footer, and responsive component behavior.
- `styles/animations.css`: reveal/stagger effects and motion utilities.
- `styles/galaxy.css`, `styles/prism.css`, `styles/prismatic-burst.css`: decorative visual systems.

### 5.3 Rebrand Workflow

For a niche sub-company:

1. Duplicate the HTML page set into a new folder or branch.
2. Replace assets in `assets/images/` with niche-specific logos and proof images.
3. Create a niche token file, such as `styles/brands/medical.css`, and load it after `styles/main.css`.
4. Override only the variables needed for the niche.
5. Replace service copy, offers, proof, testimonials, and CTAs.
6. Run `npm test` to catch accidental raw currency prices and missing navigation.
7. Preview with `npm run dev` before publishing.

Example niche token override:

```css
:root {
  --color-primary: #2DD4BF;
  --color-secondary: #0F766E;
  --color-accent: #67E8F9;
  --color-dark: #0F172A;
  --color-darker: #020617;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Raleway', sans-serif;
}
```

## 6. JavaScript Behavior

`scripts/main.js` defines a `KhedunDigital` class that initializes the common interaction layer.

Current behavior includes:

- Mobile menu toggling.
- `aria-controls` and `aria-expanded` setup for the mobile menu button.
- Body scroll lock while the mobile menu is open.
- Smooth scrolling to anchor links with navbar offset.
- Navbar background changes after scrolling.
- Parallax behavior for `.hero-visual` on pointer-fine devices when reduced motion is not requested.
- Reveal animations using Intersection Observer.
- Lazy-loading/performance helpers.
- Accessibility helpers.

Recreation rule: preserve the `menu-btn`, `mobile-menu`, `nav`, and anchor-link conventions unless you also update `scripts/main.js`.

## 7. Assets

### Current logo assets

- `assets/images/khedun_digital_logo.png`
- `assets/images/khedun_digital_nav_icon.png`
- `assets/images/khedun_digital_web_logo.png`
- `assets/images/khedun_digital_marketing_logo.png`
- `assets/images/khedun_digital_ai_logo.png`
- `assets/images/khedun_digital_automation_logo.png`

### Current marketing imagery

- `assets/images/marketingpromo_1.jpeg` through `marketingpromo_7.jpeg/png`
- External devicon/CDN images are used on the Web & UX page for some technology logos.

### Rebrand asset checklist

For each niche site, prepare:

- Primary logo.
- Navigation/favicon icon.
- Service-specific logo or mark.
- Hero visual or abstract brand visual.
- 3-6 proof images, screenshots, or case-study visuals.
- Social preview image (`og:image`).
- Optional portrait/team images if the niche sells trust-heavy services.

## 8. How to Recreate the Website Locally

1. Install Node.js 16+.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start a development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.
5. Edit HTML in `index.html` and `pages/*.html`.
6. Edit global CSS in `styles/main.css` and component CSS in `styles/components.css`.
7. Edit interactions in `scripts/main.js`.
8. Run tests:

   ```bash
   npm test
   ```

9. Build production assets:

   ```bash
   npm run build
   ```

10. Preview the generated `public/` folder:

    ```bash
    npm run preview
    ```

## 9. Deployment Notes

The current site is static and can be deployed on GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any conventional static host.

Recommended production flow:

1. Decide whether the deploy target serves root files directly or the generated `public/` directory.
2. If serving root files directly, make sure all relative paths work from the deployed domain.
3. If serving `public/`, update the build pipeline so HTML files and non-image assets are copied into `public/`, not only CSS/JS/images.
4. Add a custom domain per sub-company, such as:
   - `medical.khedun.digital`
   - `legal.khedun.digital`
   - `automation.khedun.digital`
   - `studios.khedun.digital`
5. Configure analytics, conversion tracking, and form destinations per brand.

## 10. Recreation Checklist

Use this checklist when creating a new branded website from this codebase.

### Strategy

- [ ] Define niche and buyer persona.
- [ ] Define core pain points.
- [ ] Define one primary offer and one fallback offer.
- [ ] Define the sales CTA: audit, demo, consult, quote, or WhatsApp.
- [ ] Define proof requirements: case studies, before/after, testimonials, screenshots, numbers.

### Brand

- [ ] Choose niche-specific name.
- [ ] Choose brand promise.
- [ ] Choose palette and typography.
- [ ] Create logo and icon set.
- [ ] Create hero visual direction.

### Content

- [ ] Rewrite hero headline for the niche.
- [ ] Rewrite service cards for niche outcomes.
- [ ] Rewrite packages around buying triggers.
- [ ] Add FAQ objections for that market.
- [ ] Add testimonials or case-study placeholders clearly marked for replacement.
- [ ] Add compliant claims and disclaimers if relevant.

### Build

- [ ] Duplicate pages or create a new branch.
- [ ] Replace image assets.
- [ ] Override brand tokens.
- [ ] Update navigation links and metadata.
- [ ] Run `npm test`.
- [ ] Preview responsive behavior.
- [ ] Deploy to staging.

### Sales Readiness

- [ ] Add tracking pixels and analytics.
- [ ] Connect forms to CRM/email.
- [ ] Test phone, email, WhatsApp, and calendar links.
- [ ] Prepare pitch deck or one-page proposal matching the landing page.
- [ ] Create outreach copy tailored to the niche.
