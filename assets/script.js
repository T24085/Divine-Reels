const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const openModal = (selector) => {
    const modal = document.querySelector(selector);
    if (modal) {
        modal.setAttribute('aria-hidden', 'false');
    }
};

const closeModal = (modal) => {
    modal.setAttribute('aria-hidden', 'true');
};

const modalTriggers = document.querySelectorAll('[data-open]');
modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.open));
});

const modals = document.querySelectorAll('.modal');
modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target.matches('[data-close], .modal')) {
            closeModal(modal);
        }
    });
});

const submissionForm = document.querySelector('.submission-form');
const submissionModal = document.getElementById('submissionModal');
const paywallModal = document.getElementById('paywallModal');

if (submissionForm) {
    submissionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const durationInput = submissionForm.querySelector('input[name="duration"]');
        const duration = Number(durationInput?.value || 0);

        if (duration > 60) {
            if (paywallModal) {
                paywallModal.setAttribute('aria-hidden', 'false');
            }
            alert('Reels longer than 60 seconds require a subscription.');
            return;
        }

        alert('Thank you! Your reel submission has been received.');
        if (submissionModal) {
            closeModal(submissionModal);
        }
        submissionForm.reset();
    });
}

const donationModal = document.getElementById('donationModal');
const donationButtons = donationModal?.querySelectorAll('[data-amount]');
if (donationButtons) {
    donationButtons.forEach((button) => {
        button.addEventListener('click', () => {
            donationButtons.forEach((btn) => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
}

const donationCheckoutBtn = document.getElementById('donationCheckoutBtn');
if (donationCheckoutBtn) {
    donationCheckoutBtn.addEventListener('click', () => {
        const selected = donationModal?.querySelector('.donation-options .selected');
        const amount = selected?.dataset.amount ?? 'a custom amount';
        alert(`Thank you for pledging ${amount}! We will guide you to the secure donation page.`);
        if (donationModal) {
            closeModal(donationModal);
        }
    });
}

const paywallSubscribeBtn = document.getElementById('paywallSubscribeBtn');
if (paywallSubscribeBtn && paywallModal) {
    paywallSubscribeBtn.addEventListener('click', () => {
        alert('Thank you for subscribing! A confirmation email is on its way.');
        closeModal(paywallModal);
    });
}
