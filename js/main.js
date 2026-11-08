"use strict";
// Mejora progresiva del formulario: el envío HTML normal sigue disponible.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formMessage");

  const params = new URLSearchParams(window.location.search);
  if (form && params.get("servicio") === "esim") {
    const message = document.getElementById("message");
    if (message && !message.value.trim()) message.value = "Hola, quiero información sobre la eSIM de Quantum Connect. ¿Pueden revisar la compatibilidad de mi equipo, cobertura, disponibilidad y condiciones?";
  }

  if (form && status) {
    form.addEventListener("submit", () => {
      status.textContent = "Enviando mensaje…";
    });
  }

  // La PWA se activa únicamente en navegadores con soporte para service workers.
  if ("serviceWorker" in navigator && window.location.protocol === "https:") {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("No se pudo registrar el modo sin conexión de Quantum Corp:", error);
    });
  }
});
