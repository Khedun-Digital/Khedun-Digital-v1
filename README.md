# Khedun Digital v2.0

Where intelligent systems meet elegant design. A comprehensive digital solutions provider specializing in Web Development, Automation, AI, and Marketing.

## 🚀 Features

- **Modern Architecture**: Component-based structure with modular CSS and JavaScript
- **Advanced Animations**: Smooth scroll effects, intersection observers, and micro-interactions
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **Accessibility First**: WCAG compliant with screen reader support
- **Mobile Responsive**: Fully responsive design with touch-friendly interactions
- **SEO Optimized**: Structured data, meta tags, and semantic HTML

## 📁 Project Structure

```
khedun-digital/
├── index.html                 # Main entry point
├── package.json              # Project configuration & scripts
├── README.md                # Documentation
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .gitignore              # Git ignore rules
├── assets/                 # Static assets
│   └── images/            # Images and media files
├── styles/                # CSS architecture
│   ├── main.css          # Base styles and utilities
│   ├── components.css    # Component styles
│   └── animations.css    # Animation definitions
├── scripts/              # JavaScript modules
│   └── main.js          # Main application logic
├── components/           # Reusable HTML components
├── pages/               # Service-specific pages
│   ├── web.html        # Web development services
│   ├── ai.html         # AI solutions
│   ├── automation.html # Process automation
│   └── marketing.html  # Digital marketing
├── config/             # Configuration files
└── public/            # Build output directory
    ├── css/           # Minified CSS files
    ├── js/            # Minified JavaScript files
    └── images/        # Optimized images
```

## 🛠️ Technologies Used

### Frontend Framework
- **HTML5**: Semantic markup with modern standards
- **CSS3**: Advanced styling with custom properties and animations
- **Vanilla JavaScript**: Modern ES6+ with class-based architecture

### Build Tools & Processors
- **PostCSS**: CSS processing and optimization
- **TailwindCSS**: Utility-first CSS framework
- **Terser**: JavaScript minification
- **ImageMin**: Image optimization
- **Live Server**: Development server

### Libraries & Dependencies
- **AOS (Animate On Scroll)**: Scroll-triggered animations
- **GSAP**: Advanced animation library
- **Three.js**: 3D graphics and effects
- **Particles.js**: Particle system effects


## 📚 Strategic Documentation

The repository now includes planning documents for recreating the website and adapting it into niche-specific sub-company brands:

- [`docs/WEBSITE_RECREATION_GUIDE.md`](docs/WEBSITE_RECREATION_GUIDE.md) - current architecture, page inventory, styling system, assets, and a step-by-step recreation checklist.
- [`docs/NICHE_SUBCOMPANY_STRATEGY_AND_IMPROVEMENTS.md`](docs/NICHE_SUBCOMPANY_STRATEGY_AND_IMPROVEMENTS.md) - sub-company brand strategy, niche content templates, positioning examples, and a detailed improvement roadmap.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Khedun-Digital/Khedun-Digital-v1.git
   cd khedun-digital
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   This will start a local server at `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm run dev` - Start development server with auto-open
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linting on HTML/CSS/JS
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## 🎨 Customization

### Colors
The color palette is defined in `tailwind.config.js` and uses CSS custom properties in `styles/main.css`:

```css
:root {
  --color-primary: #FFD700;    /* Gold */
  --color-secondary: #E95A0C;  /* Burnt Orange */
  --color-accent: #FF6B35;     /* Accent Orange */
  --color-dark: #1A1A1A;       /* Charcoal */
  --color-darker: #0F0F0F;     /* Dark Background */
}
```

### Typography
- **Headings**: Montserrat (Google Fonts)
- **Body**: Raleway (Google Fonts)

### Animations
Custom animations are defined in `styles/animations.css` and can be extended in `tailwind.config.js`.

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- ARIA labels and attributes
- Keyboard navigation support
- Screen reader optimized
- Reduced motion support

## 🔧 Development

### Code Quality
- ESLint for JavaScript linting
- Prettier for code formatting
- HTMLHint for HTML validation
- Stylelint for CSS validation

### Performance
- Lazy loading for images
- Code splitting for JavaScript
- CSS and JS minification
- Image optimization
- Gzip compression ready

## 🚀 Deployment

### GitHub Pages
The site is configured for GitHub Pages deployment. Simply push to the `main` branch:

```bash
git add .
git commit -m "Update site"
git push origin main
```

### Custom Domain
To use a custom domain, create a `CNAME` file in the root directory with your domain name.

## 📊 Performance Metrics

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

ISC © Kyle Khedun

## 📞 Contact

- **Website**: https://khedun.digital
- **Email**: kylekhedun@gmail.com
- **Phone**: +27 73 037 2160
- **Address**: Chase Valley, Pietermaritzburg, KZN, South Africa

---

**Built with ❤️ by Khedun Digital**
