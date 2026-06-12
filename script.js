// ===================================
// Floating Particles Generator
// ===================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 25;
    const colors = [
        'rgba(91, 163, 217, 0.3)',
        'rgba(130, 196, 240, 0.25)',
        'rgba(167, 216, 245, 0.2)',
        'rgba(212, 237, 251, 0.35)',
        'rgba(58, 127, 194, 0.15)',
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 8 + 3;
        const left = Math.random() * 100;
        const duration = Math.random() * 12 + 8;
        const delay = Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.background = color;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

// ===================================
// Mouse parallax on the card
// ===================================
function initParallax() {
    const card = document.getElementById('mainCard');
    if (!card) return;

    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 60;

        // Only apply subtle tilt if not hovering the card directly
        card.style.transform = `translateY(0) scale(1) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateY(0) rotateX(0)';
    });

    // Add perspective to parent
    card.parentElement.style.perspective = '1000px';
}

// ===================================
// CTA button ripple effect
// ===================================
function initRipple() {
    const btn = document.getElementById('ctaButton');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 2;
        `;

        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    // Inject ripple keyframe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// Init
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initParallax();
    initRipple();
});
