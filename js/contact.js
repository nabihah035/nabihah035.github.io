// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("e1EjoIFUn54Q4AJwT");
})();

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data with validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate inputs
            if (!name || !email || !message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            console.log('Form Data:', { name, email, message });
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare template parameters
            const templateParams = {
                name: name,
                from_name: name,
                from_email: email,
                message: message,
                reply_to: email,
                date: new Date().toLocaleString()
            };
            
            console.log('EmailJS Template Params:', templateParams);
            
            // Send email using EmailJS
            emailjs.send('service_2yhpvv6', 'template_yf34ymb', templateParams)
                .then(function(response) {
                    console.log('EmailJS Success:', response);
                    showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS Error Details:', error);
                    showMessage('Failed to send message. Please try again or email me directly.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});