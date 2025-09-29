document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        setTimeout(() => {
            const nameElement = document.getElementById('name-display');
            if (nameElement) {
                setTimeout(() => {
                    typeText(nameElement, 'Ígor José Rodrigues', 100);
                }, 1000);
            }
        }, 800);
    }, 100);
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.social-links, .about-me, .projects, .footer');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                const link = this.querySelector('.project-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });
});

function typeText(element, text, speed = 50, callback = null) {
    const cursor = element.querySelector('.typing-cursor');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            const currentText = text.substring(0, i + 1);
            if (cursor) {
                element.innerHTML = currentText + '<span class="typing-cursor">_</span>';
            } else {
                element.innerHTML = currentText;
            }
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.social-link, .project-link, .tech-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 15px var(--terminal-green-glow), 0 0 25px var(--terminal-green-glow)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 0 8px var(--terminal-green-glow)';
        });
    });
});