(function () {
  "use strict";

  const CLAVE = "tema";
  let boton = null;

  function leerTemaGuardado() {
    try {
      const t = localStorage.getItem(CLAVE);
      if (t === "dark" || t === "light") return t;
    } catch (e) {}
    return "light";
  }

  function guardarTema(tema) {
    try { localStorage.setItem(CLAVE, tema); } catch (e) {}
  }

  function temaActual() {
    return document.documentElement.getAttribute("data-tema") === "dark" ? "dark" : "light";
  }

  function actualizarBoton() {
    if (!boton) return;
    boton.textContent = temaActual() === "dark" ? "☀ Modo claro" : "🌙 Modo oscuro";
  }

  function aplicarTema(tema) {
    document.documentElement.setAttribute("data-tema", tema);
    actualizarBoton();
  }

  aplicarTema(leerTemaGuardado());

  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    boton = document.createElement("button");
    boton.type = "button";
    boton.id = "btn-tema";
    boton.className = "btn-tema";
    boton.addEventListener("click", () => {
      const nuevo = temaActual() === "dark" ? "light" : "dark";
      guardarTema(nuevo);
      aplicarTema(nuevo);
    });

    nav.appendChild(boton);
    actualizarBoton();
  });

  window.addEventListener("storage", (e) => {
    if (e.key === CLAVE && (e.newValue === "dark" || e.newValue === "light")) {
      aplicarTema(e.newValue);
    }
  });
})();
