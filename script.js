// Mobile menu toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after navigation
            const menu = document.getElementById('mobile-menu');
            if (!menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
            }
        }
    });
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            link.style.color = targetId === current 
                ? 'var(--color-cobalt)' 
                : 'var(--text-secondary)';
        }
    });
});

// Intersection Observer for fade-in effects
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should fade in
document.querySelectorAll('.group').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        const yPos = -(scrolled * 0.5);
        hero.style.backgroundPosition = `50% ${yPos}px`;
    }
});

// Add scroll progress to navigation
const scrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'fixed top-0 left-0 h-1 bg-[#0F3A6B] z-[60]';
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 0.1s ease';
        progressBar.classList.add('scroll-progress');
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = `${progress}%`;
};

// Debounce scroll progress
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            scrollProgress();
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial scroll check
    scrollProgress();
});

// Clean up progress bar on page unload
window.addEventListener('beforeunload', () => {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.remove();
    }
});
