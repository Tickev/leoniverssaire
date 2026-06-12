// ===================================
// Page 7 — Summary & Confetti
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Retrieve data from sessionStorage
    const selectedFood = sessionStorage.getItem('selectedFood');
    const rendezvousDate = sessionStorage.getItem('rendezvousDate');

    // Mappings for food choices
    const foodMap = {
        'pizza': { name: 'Pizza', emoji: '🍕' },
        'sushi': { name: 'Sushi', emoji: '🍣' },
        'burger': { name: 'Burger', emoji: '🍔' },
        'pates': { name: 'Pâtes', emoji: '🍝' },
        'ramen': { name: 'Ramen', emoji: '🍜' },
        'feeling': { name: 'Au feeling', emoji: '🎲' }
    };

    // 2. Update UI with data
    if (selectedFood && foodMap[selectedFood]) {
        document.getElementById('foodName').textContent = foodMap[selectedFood].name;
        document.getElementById('foodEmoji').textContent = foodMap[selectedFood].emoji;
    } else {
        document.getElementById('foodName').textContent = 'Surprise !';
        document.getElementById('foodEmoji').textContent = '🎁';
    }

    if (rendezvousDate) {
        // Format date to French locale (e.g. "12 juin 2026")
        const dateObj = new Date(rendezvousDate);
        if (!isNaN(dateObj)) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = dateObj.toLocaleDateString('fr-FR', options);
            // Capitalize first letter
            document.getElementById('dateValue').textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        } else {
            document.getElementById('dateValue').textContent = rendezvousDate;
        }
    } else {
        document.getElementById('dateValue').textContent = 'À définir';
    }

    // 3. Fire Confetti
    // We wait a bit so the card animations finish
    setTimeout(() => {
        const duration = 3000;
        const end = Date.now() + duration;

        // Uses canvas-confetti library
        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: ['#5ba3d9', '#a7d8f5', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: ['#5ba3d9', '#a7d8f5', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, 1200); // Fire after 1.2 seconds
});
