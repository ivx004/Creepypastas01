// Scroll Progress Indicator
document.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
});

// Smooth Scroll para navegación
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight del artículo
            targetElement.style.animation = 'none';
            setTimeout(() => {
                targetElement.style.animation = '';
            }, 10);
        }
    });
});

// Efecto de aparición al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('article').forEach(article => {
    observer.observe(article);
});

// Efecto de hover en artículos
document.querySelectorAll('article').forEach(article => {
    article.addEventListener('mouseenter', function() {
        this.style.borderLeftColor = '#ff6b6b';
    });
    
    article.addEventListener('mouseleave', function() {
        this.style.borderLeftColor = 'var(--accent-color)';
    });
});

// Búsqueda/Filtrado de creepypastas
function initializeSearch() {
    const searchInput = document.createElement('div');
    searchInput.className = 'search-container';
    searchInput.innerHTML = `
        <div style="display: flex; justify-content: center; margin: 2rem 0; padding: 0 2rem;">
            <input 
                type="text" 
                id="search-box" 
                placeholder="Buscar creepypasta..." 
                style="
                    width: 100%;
                    max-width: 400px;
                    padding: 0.8rem 1.2rem;
                    border: 2px solid #e74c3c;
                    background: #1a1a2e;
                    color: #ecf0f1;
                    border-radius: 25px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.2);
                "
            >
        </div>
    `;
    
    const mainElement = document.querySelector('main');
    mainElement.parentNode.insertBefore(searchInput, mainElement);
    
    const searchBox = document.getElementById('search-box');
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        document.querySelectorAll('article').forEach(article => {
            const text = article.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                article.style.display = 'block';
                article.style.animation = 'fadeInUp 0.4s ease-out';
            } else {
                article.style.display = 'none';
            }
        });
    });
    
    searchBox.addEventListener('focus', function() {
        this.style.borderColor = '#f39c12';
        this.style.boxShadow = '0 5px 20px rgba(243, 156, 18, 0.3)';
    });
    
    searchBox.addEventListener('blur', function() {
        this.style.borderColor = '#e74c3c';
        this.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.2)';
    });
}

// Crear contador de artículos
function initializeCounter() {
    const footer = document.querySelector('footer');
    const articleCount = document.querySelectorAll('article').length;
    const counter = document.createElement('p');
    counter.style.color = '#f39c12';
    counter.style.fontWeight = 'bold';
    counter.style.marginTop = '1rem';
    counter.innerHTML = `📚 Total de creepypastas: <strong>${articleCount}</strong>`;
    footer.insertBefore(counter, footer.firstChild);
}

// Scroll al tope
function initializeScrollToTop() {
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #e74c3c;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.background = '#c0392b';
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.background = '#e74c3c';
        this.style.transform = 'scale(1)';
    });
}

// Indicador de scroll al tope
function initializeScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollIndicator();
    initializeSearch();
    initializeCounter();
    initializeScrollToTop();
    
    // Efecto de carga
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Animación en hover de los links de navegación
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});