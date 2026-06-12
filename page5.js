// ===================================
// Page 5 — Food Selection
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const radioInputs = document.querySelectorAll('input[name="food"]');
    const submitBtn = document.getElementById('submitFood');
    
    if (!radioInputs.length || !submitBtn) return;

    // Enable button when a choice is made
    radioInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (document.querySelector('input[name="food"]:checked')) {
                submitBtn.removeAttribute('disabled');
            }
        });
    });

    // Handle submit
    submitBtn.addEventListener('click', () => {
        const selectedFood = document.querySelector('input[name="food"]:checked');
        if (selectedFood) {
            // Save the choice in localStorage or sessionStorage if needed for the next page
            sessionStorage.setItem('selectedFood', selectedFood.value);
            
            // For now, redirect to the next page (page6.html)
            // You can replace this with whatever behavior you want
            window.location.href = 'page6.html';
        }
    });
});
