"use strict";
// Mejora progresiva del formulario: el envío HTML normal sigue disponible.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formMessage");
  if (!form || !status) return;
  form.addEventListener("submit", () => {
    status.textContent = "Enviando mensaje…";
  });
});
