// ===================================
// Page 2 — Letter Animation Orchestrator
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelopeIntro');
    const letter = document.getElementById('letter');

    if (!envelope || !letter) return;

    // Step 1: Envelope appears (handled by CSS, 0.3s delay + 0.8s anim)
    // Step 2: After envelope animation, fade it out
    setTimeout(() => {
        envelope.classList.add('fade-out');
    }, 1600);

    // Step 3: After envelope fades, trigger letter slide-in from the right
    setTimeout(() => {
        envelope.style.display = 'none';
        letter.classList.add('slide-in');
    }, 2200);
});
