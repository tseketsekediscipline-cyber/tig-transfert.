document.addEventListener('DOMContentLoaded', () => {

  // Form validation
  const form = document.getElementById('transferForm');
  const submitBtn = form.querySelector('button.submit');

  function checkFormValidity() {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) valid = false;
    });
    submitBtn.disabled = !valid;
  }

  form.addEventListener('input', checkFormValidity);
  checkFormValidity();

  // Form submit futuriste
  const messageBox = document.createElement('div');
  messageBox.style.marginTop = '0.5rem';
  messageBox.style.fontWeight = 'bold';
  form.appendChild(messageBox);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    messageBox.textContent = "⏳ Envoi en cours...";
    messageBox.style.color = "#000";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        messageBox.textContent = "✅ Votre demande a bien été envoyée.";
        messageBox.style.color = "#0f0";
        form.reset();
        checkFormValidity();
      } else throw new Error("Erreur serveur");
    } catch(err) {
      messageBox.textContent = "❌ Erreur, veuillez réessayer.";
      messageBox.style.color = "#f00";
    }
  });

  // Scroll smooth sur “Commencer”
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#contact');
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

});
