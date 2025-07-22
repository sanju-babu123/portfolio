// Update time display
function updateTime() {
    const now = new Date();
    
    // Get Barcelona time (CET/CEST)
    const barcelonaTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Madrid"}));
    
    // Format time as HH:MM
    const hours = barcelonaTime.getHours().toString().padStart(2, '0');
    const minutes = barcelonaTime.getMinutes().toString().padStart(2, '0');
    
    // Determine timezone offset for GMT representation
    const offsetHours = Math.abs(Math.floor(barcelonaTime.getTimezoneOffset() / -60));
    const offsetMinutes = Math.abs(barcelonaTime.getTimezoneOffset() % 60);
    const sign = barcelonaTime.getTimezoneOffset() <= 0 ? '+' : '-';
    const timezoneString = `GMT${sign}${offsetHours}:${offsetMinutes.toString().padStart(2, '0')}`;
    
    const timeString = `${hours}:${minutes} ${timezoneString}`;
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Smooth scroll for any internal links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add subtle animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Prepare elements for animation
    document.querySelectorAll('.about-section, .experience-section, .projects-section, .skills-section, .contact-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate project cards with staggered delay
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate skill tags with staggered delay
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        tag.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        observer.observe(tag);
    });
}

// Add hover effects for interactive elements
function initHoverEffects() {
    // Profile image hover effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Contact link hover effects
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--accent-color)';
            this.style.borderColor = 'var(--accent-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = 'var(--text-secondary)';
            this.style.borderColor = 'var(--border-color)';
        });
    });
}

// Add CSS class for completed animations
document.addEventListener('DOMContentLoaded', function() {
    // CSS for the animation class
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Initialize everything
    updateTime();
    initSmoothScroll();
    initScrollAnimations();
    initHoverEffects();
    
    // Update time every minute
    setInterval(updateTime, 60000);
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Add any responsive JavaScript adjustments here if needed
});
