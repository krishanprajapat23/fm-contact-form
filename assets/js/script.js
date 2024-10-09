// input elements
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const general = document.getElementById('general');
const support = document.getElementById('support');
const message = document.getElementById('message');
const consent = document.getElementById('checkConsent');
const submitPopup = document.getElementById('submitPopup');

const radioInputs = document.querySelectorAll('.form-check-input[type=radio]');

// error elements
const errorFirstName = document.getElementById('error-FirstName');
const errorLastName = document.getElementById('error-lastName');
const errorEmail = document.getElementById('error-Email');
const errorQuery = document.getElementById('error-Query');
const errorMessage = document.getElementById('error-Message');
const errorConsent = document.getElementById('error-Consent');


radioInputs.forEach((radio) => {
    const radioParent = radio.closest('.form-check');
    
    radio.addEventListener('change', (e) => {
        if (e.target.checked) {
            // Remove 'active' class from all radio button parents
            radioInputs.forEach((input) => {
                const parent = input.closest('.form-check');
                parent.classList.remove('active');
            });
            // Add 'active' class to the current radio button's parent
            radioParent.classList.add('active');
            console.log('Radio button changed:', e.target.value);
        } 
    });
});



document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();

    // Reset error states
    resetErrors([firstName, lastName, email, message, consent]);

    // Validate fields
    let isValid = true;

    if (firstName.value.trim() === '') {
        showError(firstName, errorFirstName);
        isValid = false;
    }

    if (lastName.value.trim() === '') {
        showError(lastName, errorLastName);
        isValid = false;
    }

    if (email.value.trim() === '') {
        errorEmail.textContent = "This field is required";
        showError(email, errorEmail);
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        errorEmail.textContent = "Enter a valid email";
        showError(email, errorEmail);
        isValid = false;
    }

    if (!general.checked && !support.checked) {
        showError(null, errorQuery);
        isValid = false;
    }

    if (message.value.trim() === '') {
        showError(message, errorMessage);
        isValid = false;
    }

    if (!consent.checked) {
        showError(consent, errorConsent);
        isValid = false;
    }

    if (isValid) {
        //Show success message and clear form
        submitPopup.classList.remove('hidden');
        setTimeout(function(){
            submitPopup.classList.add('hidden');
        }, 3000)
        clearForm();
    }
});


function clearForm() {
    // Clear text inputs
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    message.value = '';
    // Clear radio buttons
    general.checked = false;
    support.checked = false;
    // Clear checkbox
    consent.checked = false;

    radioInputs.forEach((radio) => {
        const radioParent = radio.closest('.form-check');
        radioParent.classList.remove('active');
    })
}

function resetErrors(inputs) {
    // Hide error, submitted box, outline on the input box, and error text
    const errorMessages = document.querySelectorAll('div[id^="error-"]');
    errorMessages.forEach(message => message.classList.add('hidden'));
    inputs.forEach(input => {
        if (input) {
            input.classList.remove('invalid');
        }
    });
    submitPopup.classList.add('hidden');
}


function showError(input, errorText) {
    if (input) {
        input.classList.add('invalid');
    }
    errorText.classList.remove('hidden');
}

function isValidEmail(emailVal) {
    // validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailVal);
}