"use strict";
// Mejora progresiva del formulario: el envío HTML normal sigue disponible.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formMessage");

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
