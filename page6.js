// ===================================
// Page 6 — Date Selection
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('rendezvousDate');
    const submitBtn = document.getElementById('submitDate');
    
    if (!dateInput || !submitBtn) return;

    // Set minimum date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    
    dateInput.setAttribute('min', minDate);

    // Enable button when a date is selected
    dateInput.addEventListener('change', () => {
        if (dateInput.value) {
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.setAttribute('disabled', 'true');
        }
    });

    // Handle submit
    submitBtn.addEventListener('click', () => {
        if (dateInput.value) {
            // Save the choice
            sessionStorage.setItem('rendezvousDate', dateInput.value);
            
            const selectedFood = sessionStorage.getItem('selectedFood') || 'Surprise';
            const selectedDate = dateInput.value;

            // Change button text and disable to show loading state
            submitBtn.setAttribute('disabled', 'true');
            submitBtn.querySelector('span').textContent = 'Envoi...';

            // Initialisation de EmailJS
            emailjs.init('MXStQnrIGTLqDC6aH');

            // Format date nicely
            const dateObj = new Date(selectedDate);
            let formattedDate = selectedDate;
            if (!isNaN(dateObj)) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                formattedDate = dateObj.toLocaleDateString('fr-FR', options);
                formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
            }

            // Beautiful HTML Template
            const htmlContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e0e6ed;">
                <div style="background: linear-gradient(135deg, #5ba3d9, #82c4f0); padding: 40px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px;">Nouveau Rendez-vous ! ✨</h1>
                </div>
                <div style="padding: 40px 30px; background: #fafcff;">
                    <p style="color: #5a6f82; font-size: 16px; line-height: 1.6; margin-top: 0;">Léonie a fait ses choix pour votre sortie. Voici le récapitulatif de ce qui a été validé :</p>
                    <div style="background: #ffffff; border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid #eef2f6; box-shadow: 0 2px 10px rgba(91,163,217,0.05);">
                        <div style="margin-bottom: 20px;">
                            <p style="text-transform: uppercase; font-size: 12px; font-weight: bold; color: #8ea4b8; letter-spacing: 1px; margin: 0 0 5px 0;">Lieu</p>
                            <p style="font-size: 18px; color: #2c3e50; font-weight: 600; margin: 0;">🗼 Paris</p>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <p style="text-transform: uppercase; font-size: 12px; font-weight: bold; color: #8ea4b8; letter-spacing: 1px; margin: 0 0 5px 0;">Au menu</p>
                            <p style="font-size: 18px; color: #2c3e50; font-weight: 600; margin: 0; text-transform: capitalize;">🍽️ ${selectedFood}</p>
                        </div>
                        <div>
                            <p style="text-transform: uppercase; font-size: 12px; font-weight: bold; color: #8ea4b8; letter-spacing: 1px; margin: 0 0 5px 0;">Date</p>
                            <p style="font-size: 18px; color: #5ba3d9; font-weight: bold; margin: 0;">📅 ${formattedDate}</p>
                        </div>
                    </div>
                    <p style="color: #8ea4b8; font-size: 14px; text-align: center; font-style: italic;">Préparez-vous bien ! 🎉</p>
                </div>
            </div>
            `;

            const templateParams = {
                html_message: htmlContent,
                reply_to: "francois.titouan2003@gmail.com"
            };

            // Envoi via EmailJS
            emailjs.send('service_z2tlxfj', 'template_mbwkmjf', templateParams)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    window.location.href = 'page7.html';
                }, (error) => {
                    console.error('FAILED...', error);
                    window.location.href = 'page7.html';
                });
        }
    });
});
