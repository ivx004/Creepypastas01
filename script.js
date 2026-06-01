// ============ SCROLL PROGRESS INDICATOR ============
class ScrollIndicator {
    constructor() {
        this.indicator = document.querySelector('.scroll-indicator');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        this.indicator.style.width = scrolled + '%';
    }
}

// ============ SMOOTH SCROLL NAVIGATION ============
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('nav a');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Highlight animation
            this.highlightElement(targetElement);
        }
    }

    highlightElement(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = '';
        }, 10);
    }
}

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
class AnimationObserver {
    constructor() {
        this.articles = document.querySelectorAll('article');
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.articles.forEach(article => observer.observe(article));
    }
}

// ============ ARTICLE INTERACTIONS ============
class ArticleInteractions {
    constructor() {
        this.articles = document.querySelectorAll('article');
        this.init();
    }

    init() {
        this.articles.forEach(article => {
            article.addEventListener('mouseenter', () => this.handleEnter(article));
            article.addEventListener('mouseleave', () => this.handleLeave(article));
        });
    }

    handleEnter(article) {
        article.style.borderLeftColor = '#f39c12';
        const listItems = article.querySelectorAll('li');
        listItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }

    handleLeave(article) {
        article.style.borderLeftColor = '#e74c3c';
    }
}

// ============ SEARCH FUNCTIONALITY ============
class SearchFeature {
    constructor() {
        this.init();
    }

    init() {
        const mainElement = document.querySelector('main');
        const searchContainer = this.createSearchContainer();
        mainElement.parentNode.insertBefore(searchContainer, mainElement);

        this.setupSearchBox();
    }

    createSearchContainer() {
        const container = document.createElement('div');
        container.className = 'search-container';
        container.innerHTML = `
            <input 
                type="text" 
                id="search-box" 
                placeholder="🔍 Buscar creepypasta..." 
                aria-label="Buscar creepypasta"
            >
        `;
        return container;
    }

    setupSearchBox() {
        const searchBox = document.getElementById('search-box');

        searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            this.filterArticles(searchTerm);
        });

        searchBox.addEventListener('focus', () => {
            searchBox.style.borderColor = '#f39c12';
        });

        searchBox.addEventListener('blur', () => {
            searchBox.style.borderColor = '#e74c3c';
        });
    }

    filterArticles(searchTerm) {
        const articles = document.querySelectorAll('article');
        let visibleCount = 0;

        articles.forEach(article => {
            const text = article.textContent.toLowerCase();
            const isVisible = !searchTerm || text.includes(searchTerm);

            if (isVisible) {
                article.style.display = 'block';
                article.style.animation = 'slideInUp 0.3s ease-out';
                visibleCount++;
            } else {
                article.style.display = 'none';
            }
        });

        // Mostrar mensaje si no hay resultados
        this.handleNoResults(visibleCount, searchTerm);
    }

    handleNoResults(visibleCount, searchTerm) {
        let noResultsMsg = document.getElementById('no-results-msg');

        if (visibleCount === 0 && searchTerm) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-msg';
                noResultsMsg.style.cssText = `
                    text-align: center;
                    padding: 3rem 2rem;
                    color: #bdc3c7;
                    font-size: 1.2rem;
                    animation: fadeInUp 0.3s ease-out;
                `;
                document.querySelector('main').appendChild(noResultsMsg);
            }
            noResultsMsg.textContent = `No se encontraron resultados para "${searchTerm}"`;
            noResultsMsg.style.display = 'block';
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
}

// ============ SCROLL TO TOP BUTTON ============
class ScrollToTop {
    constructor() {
        this.button = null;
        this.threshold = 300;
        this.init();
    }

    init() {
        this.createButton();
        this.setupEventListeners();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.id = 'scroll-to-top';
        this.button.setAttribute('aria-label', 'Volver al inicio');
        this.button.innerHTML = '↑';
        document.body.appendChild(this.button);
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.button.addEventListener('click', () => this.scrollToTop());
        this.button.addEventListener('mouseenter', () => this.handleHover(true));
        this.button.addEventListener('mouseleave', () => this.handleHover(false));
    }

    handleScroll() {
        const isVisible = window.scrollY > this.threshold;
        this.button.style.display = isVisible ? 'flex' : 'none';
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    handleHover(isHovering) {
        if (isHovering) {
            this.button.style.transform = 'translateY(-5px) scale(1.1)';
        } else {
            this.button.style.transform = 'translateY(0) scale(1)';
        }
    }
}

// ============ ARTICLE COUNTER ============
class ArticleCounter {
    constructor() {
        this.init();
    }

    init() {
        const footer = document.querySelector('footer');
        const articles = document.querySelectorAll('article');
        const counter = document.createElement('p');

        counter.id = 'article-counter';
        counter.style.cssText = `
            color: #f39c12;
            font-weight: bold;
            margin-top: 1rem;
            font-size: 1.05rem;
            letter-spacing: 0.5px;
        `;
        counter.innerHTML = `📚 Total de creepypastas: <strong>${articles.length}</strong>`;

        footer.insertBefore(counter, footer.firstChild);
    }
}

// ============ KEYBOARD SHORTCUTS ============
class KeyboardShortcuts {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleKeydown(e) {
        // Ctrl/Cmd + K para enfocar la búsqueda
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchBox = document.getElementById('search-box');
            if (searchBox) {
                searchBox.focus();
            }
        }

        // Esc para limpiar la búsqueda
        if (e.key === 'Escape') {
            const searchBox = document.getElementById('search-box');
            if (searchBox && document.activeElement === searchBox) {
                searchBox.value = '';
                searchBox.dispatchEvent(new Event('input'));
            }
        }
    }
}

// ============ PAGE LOADER ============
class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }
}

// ============ PRINT STYLES INFO ============
class PrintInfo {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('beforeprint', () => {
            const articles = document.querySelectorAll('article');
            articles.forEach(article => {
                article.style.pageBreakInside = 'avoid';
            });
        });
    }
}

// ============ THEME MANAGER (Dark/Light Mode) ============
class ThemeManager {
    constructor() {
        this.theme = 'dark';
        this.init();
    }

    init() {
        // Sistema de temas (preparado para futuros cambios)
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.theme = theme;
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// ============ MAIN INITIALIZATION ============
class App {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🎃 Initializing Creepypastas App...');

            // Instanciar todos los módulos
            new PageLoader();
            new ScrollIndicator();
            new SmoothScroll();
            new AnimationObserver();
            new ArticleInteractions();
            new SearchFeature();
            new ScrollToTop();
            new ArticleCounter();
            new KeyboardShortcuts();
            new PrintInfo();
            new ThemeManager();

            console.log('✓ App initialized successfully!');
        });
    }
}

// Iniciar la aplicación
const app = new App();

// ============ PERFORMANCE MONITORING (Opcional) ============
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`📊 Page load time: ${pageLoadTime}ms`);
    });
}
