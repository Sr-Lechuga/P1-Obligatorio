const btnIngresarDatos = document.querySelector(".main-option.ingresar"),
      btnEliminarDatos = document.querySelector(".main-option.eliminar"),
      btnConsultarEstadisticas = document.querySelector(".main-option.consultar");

btnIngresarDatos.addEventListener("click", () => {
    window.location.assign("gestionar-informacion.html");
});

btnEliminarDatos.addEventListener("click", () => {
    window.location.assign("gestionar-informacion.html");
});

btnConsultarEstadisticas.addEventListener("click", () => {
    window.location.assign("estadistica-simple.html");
});