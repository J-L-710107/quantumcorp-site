"use strict";
// Mejora progresiva del formulario: el envío HTML normal sigue disponible.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formMessage");

  // Los parámetros UTM son datos de atribución aportados por el navegador.
  // Se limitan para evitar valores excesivos; no son una prueba de procedencia.
  const params = new URLSearchParams(window.location.search);
  const leadSource = document.getElementById("leadSource");
  if (leadSource) {
    const clean = (value) => (value || "")
      .replace(/[\u0000-\u001f\u007f]/g, "")
      .trim()
      .slice(0, 80);
    const attribution = [
      clean(params.get("utm_source")),
      clean(params.get("utm_medium")),
      clean(params.get("utm_campaign"))
    ].filter(Boolean).join(" / ").slice(0, 240);
    leadSource.value = attribution || "sitio_web";
  }

  if (form && params.get("servicio") === "esim") {
    const message = document.getElementById("message");
    if (message && !message.value.trim()) {
      message.value = "Hola, quiero información sobre la eSIM de Quantum Connect. ¿Pueden revisar la compatibilidad de mi equipo, cobertura, disponibilidad y condiciones?";
    }
  }

  if (form && status) {
    form.addEventListener("submit", (event) => {
      const honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value.trim()) {
        event.preventDefault();
        status.textContent = "No fue posible procesar el envío.";
        return;
      }
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
