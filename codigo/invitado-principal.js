const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'invitado';

function gestionDeEventos() {
    const btnIngresarDatos = document.querySelector(".main-option.ingresar"),
        btnEliminarDatos = document.querySelector(".main-option.eliminar"),
        btnConsultarEstadisticas = document.querySelector(".main-option.consultar");

    mi_sistema.cargarNavegacion(document.querySelector('header'));

    btnIngresarDatos.addEventListener("click", () => {
        var usuario = "invitado";
        var modo = "ingresar";

        var urlDestino = "gestionar-informacion.html?usuario=" + encodeURIComponent(usuario) + "&modo=" + encodeURIComponent(modo);
        window.location.href = urlDestino;
    });

    btnEliminarDatos.addEventListener("click", () => {
        window.location.assign("gestionar-informacion.html");
        var usuario = "invitado";
        var modo = "eliminar";

        var urlDestino = "gestionar-informacion.html?usuario=" + encodeURIComponent(usuario) + "&modo=" + encodeURIComponent(modo);
        window.location.href = urlDestino;
    });

    btnConsultarEstadisticas.addEventListener("click", () => {
        window.location.assign("estadistica-simple.html");
    });
}

window.addEventListener("load", gestionDeEventos);
