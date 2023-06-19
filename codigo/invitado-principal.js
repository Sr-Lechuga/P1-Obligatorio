const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'invitado';

function gestionDeEventos() {
    const btnIngresarDatos = document.querySelector(".main-option.ingresar"),
        btnEliminarDatos = document.querySelector(".main-option.eliminar"),
        btnConsultarEstadisticas = document.querySelector(".main-option.consultar");

    mi_sistema.cargarNavegacion(document.querySelector('header'));

    btnIngresarDatos.addEventListener("click", () => {
        window.location.assign("gestionar-informacion.html");
    });

    btnEliminarDatos.addEventListener("click", () => {
        window.location.assign("gestionar-informacion.html");
    });

    btnConsultarEstadisticas.addEventListener("click", () => {
        window.location.assign("estadistica-simple.html");
    });
}

window.addEventListener("load", gestionDeEventos);
