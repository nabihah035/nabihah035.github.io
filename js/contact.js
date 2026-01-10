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
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // CORRECTED: Template parameters must match EmailJS template variables
            const templateParams = {
                from_name: name,      // Changed from 'name' to 'from_name'
                from_email: email,    // Changed from 'email' to 'from_email'
                message: message,     // This stays 'message'
                reply_to: email,      // This stays 'reply_to'
                date: new Date().toLocaleString()
            };
            
            console.log('Sending EmailJS with params:', templateParams);
            
            // Send email using EmailJS
            emailjs.send('service_2yhpvv6', 'template_yf34ymb', templateParams)
                .then(function(response) {
                    console.log('EmailJS Success:', response);
                    showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS Error Details:', error);
                    // More detailed error message
                    if (error.text) {
                        showMessage(`Failed to send: ${error.text}`, 'error');
                    } else {
                        showMessage('Failed to send message. Please try again or email me directly.', 'error');
                    }
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});

// Message display function (add this if not already in script.js)
function showMessage(message, type) {
    // Remove existing messages
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Insert after the form or at the top
    const form = document.querySelector('.contact-form');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
    }
    
    // Auto remove after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}