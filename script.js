// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Parallax effect for section numbers
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

    document.querySelectorAll('.section-number').forEach(number => {
        const rect = number.getBoundingClientRect();
        const scrollPercent = rect.top / window.innerHeight;

        // Subtle parallax effect
        const translateY = (scrollPercent - 0.5) * -20;
        number.style.transform = `translateY(${translateY}px)`;

        // Fade effect based on scroll
        const opacity = Math.max(0.1, 1 - Math.abs(scrollPercent - 0.5));
        number.style.opacity = opacity;
    });

    lastScrollTop = scrollTop;
});

// Add stagger animation to timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Hover effect for philosophy items
const philosophyItems = document.querySelectorAll('.philosophy-item');
philosophyItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.icon');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add typing effect to hero title (on load)
const heroLines = document.querySelectorAll('.hero-title .line');
heroLines.forEach((line, index) => {
    const text = line.textContent;
    line.textContent = '';
    line.style.opacity = '1';

    setTimeout(() => {
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                line.textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
    }, 300 + (index * 400));
});

// Add click ripple effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = ctaButton.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        ctaButton.style.position = 'relative';
        ctaButton.style.overflow = 'hidden';
        ctaButton.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

// Add CSS for ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Track scroll progress
const scrollProgress = document.createElement('div');
scrollProgress.style.position = 'fixed';
scrollProgress.style.top = '0';
scrollProgress.style.left = 'var(--sidebar-width)';
scrollProgress.style.right = '0';
scrollProgress.style.height = '3px';
scrollProgress.style.background = 'linear-gradient(90deg, var(--color-accent), var(--color-accent-alt))';
scrollProgress.style.transformOrigin = 'left';
scrollProgress.style.transform = 'scaleX(0)';
scrollProgress.style.zIndex = '9999';
scrollProgress.style.transition = 'transform 0.1s ease-out';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = winScroll / height;
    scrollProgress.style.transform = `scaleX(${scrolled})`;
});

// Add entrance animations to cards
const cards = document.querySelectorAll('.link-card, .skill-category, .speaking-item');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';

        const easterEgg = document.createElement('div');
        easterEgg.style.position = 'fixed';
        easterEgg.style.top = '50%';
        easterEgg.style.left = '50%';
        easterEgg.style.transform = 'translate(-50%, -50%)';
        easterEgg.style.fontSize = '3rem';
        easterEgg.style.zIndex = '10000';
        easterEgg.textContent = '🎉 You found the secret! 🎉';
        easterEgg.style.animation = 'bounce 1s ease infinite';
        document.body.appendChild(easterEgg);

        setTimeout(() => {
            easterEgg.remove();
            document.body.style.animation = '';
        }, 3000);
    }
});

// Add bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(bounceStyle);

console.log('%c👋 Hi there!', 'font-size: 2rem; color: #ff6b35;');
console.log('%cThis site was built with ❤️ using vanilla HTML, CSS, and JavaScript.', 'font-size: 1rem; color: #999;');
console.log('%cTry the Konami code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 0.9rem; color: #f7931e;');
