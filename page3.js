// ===================================
// Page 3 — Escaping "Non" Button
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btnNo');
    const card = document.getElementById('inviteCard');
    const escapeMessage = document.getElementById('escapeMessage');

    if (!btnNo || !card || !escapeMessage) return;

    let escapeCount = 0;
    let isAbsolute = false;
    let lastMsgIndex = -1;

    // Funny messages that appear below the "Avec plaisir !" button
    const funnyMessages = [
        'T\'as du te tromper non ? 👀',
        'Ce bouton ne marche pas, désolé...',
        'T\'as cru ? 😂',
        'Mais laisse le tranquille lui !',
        'Essaie encore pour voir 🫣',
        'Jamais de la vie !',
        'Abandonne, tu n\'as pas le choix',
        'Clique sur l\'autre, c\'est plus simple !',
        'Non c\'est non... enfin SI c\'est oui 🏃‍♂️💨',
        'LEONIE TU ARRETES OU QUOI',
        'Nan mais tu lis vraiment tout ?',
        'Tu veux vraiment pas ? 🥹',
        'Je dois être vraiment horrible...',
        'Il court vite ce bouton'
    ];

    function escapeButton() {
        escapeCount++;

        const btnWidth = btnNo.offsetWidth;
        const btnHeight = btnNo.offsetHeight;

        // On first escape, move to card for accurate absolute positioning
        if (!isAbsolute) {
            isAbsolute = true;

            // Calculate current visual position relative to the card
            const btnRect = btnNo.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const currentLeft = btnRect.left - cardRect.left;
            const currentTop = btnRect.top - cardRect.top;

            // Move button to card level
            card.appendChild(btnNo);

            btnNo.style.position = 'absolute';
            btnNo.style.zIndex = '10';
            btnNo.style.margin = '0';

            // Set position so it doesn't jump
            btnNo.style.left = currentLeft + 'px';
            btnNo.style.top = currentTop + 'px';

            // Force reflow before applying transition
            btnNo.offsetHeight;
            btnNo.style.transition = 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }

        // Get the card's padding to know the usable inner area
        const cardStyle = getComputedStyle(card);
        const padTop = parseFloat(cardStyle.paddingTop);
        const padRight = parseFloat(cardStyle.paddingRight);
        const padBottom = parseFloat(cardStyle.paddingBottom);
        const padLeft = parseFloat(cardStyle.paddingLeft);

        // Usable area: card inner content box
        const minX = padLeft;
        const minY = padTop;
        const maxX = card.offsetWidth - padRight - btnWidth;
        const maxY = card.offsetHeight - padBottom - btnHeight;

        // Generate random position within the safe zone
        const randomX = Math.random() * (maxX - minX) + minX;
        const randomY = Math.random() * (maxY - minY) + minY;

        // Clamp to be safe
        const clampedX = Math.max(minX, Math.min(randomX, maxX));
        const clampedY = Math.max(minY, Math.min(randomY, maxY));

        // Smooth transition to new position
        btnNo.style.left = clampedX + 'px';
        btnNo.style.top = clampedY + 'px';

        // Add a little rotation for fun
        const rotation = (Math.random() - 0.5) * 20;
        const scale = Math.max(0.8, 1 - escapeCount * 0.02);
        btnNo.style.transform = `rotate(${rotation}deg) scale(${scale})`;

        // Get a random message different from the last one
        let nextMsgIndex;
        do {
            nextMsgIndex = Math.floor(Math.random() * funnyMessages.length);
        } while (nextMsgIndex === lastMsgIndex);
        lastMsgIndex = nextMsgIndex;

        // Quick fade-out then fade-in with new text
        escapeMessage.classList.remove('visible');
        setTimeout(() => {
            escapeMessage.textContent = funnyMessages[nextMsgIndex];
            escapeMessage.classList.add('visible');
        }, 150);
    }

    // Escape on hover
    btnNo.addEventListener('mouseenter', escapeButton);

    // Also escape on touch for mobile
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        escapeButton();
    });

    // Prevent click
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        escapeButton();
    });
});
