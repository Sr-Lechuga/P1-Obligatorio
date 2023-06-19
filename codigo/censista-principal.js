const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'sparedes';



function gestionDeEventos() {
    const btnIngresarDatos = document.querySelector(".main-option.ingresar"),
      btnValidarDatos = document.querySelector(".main-option.consultar"),
      btnReasignar = document.querySelector(".main-option.reasignar"),
      btnConsultarEstadisticas = document.querySelector(".main-option.estadisticas");
    
    mi_sistema.cargarNavegacion(document.querySelector('header'));
    
    btnIngresarDatos.addEventListener("click", () => {
        window.location.assign("gestionar-informacion.html");
    });
    
    btnValidarDatos.addEventListener("click", () => {
        window.location.assign("validar-datos.html");
    });
    
    btnReasignar.addEventListener("click", () => {
        window.location.assign("reasignar.html");
    });
    
    btnConsultarEstadisticas.addEventListener("click", () => {
        window.location.assign("estadisticas-completas.html");
    });
}

window.addEventListener('load',gestionDeEventos);