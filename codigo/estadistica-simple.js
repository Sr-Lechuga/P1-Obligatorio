const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'invitado';

/* Elementos HTML*/
const mainContainer = document.querySelector("main");
const tablaPendientes = document.querySelector("main .tabla-pendientes");

/* Cosntantes y variables globales*/
let censadosPorDepartamento = {},
    totalCensosPorDepartamento = {},
    noTrabajanPorDepartamento = {},
    estudianPorDepartamento = {},
    trabajadoresPorDepartamento = {};

/* Funciones */

/* Devuelve los datos de la tabla por cada departamento*/
function retornarDatosPorDepartamento() {

    mi_sistema.censos.forEach(censo => {
        /* Por cada censo, agega a los censados del departamento 1 mas en su valor*/
        if (mi_sistema.recuperarEstadoCenso(censo.cedula) === mi_sistema.CENSADO) 
            censadosPorDepartamento[censo.departamento] = censadosPorDepartamento[censo.departamento] + 1 || 1;
        
        /* Segun su ocupacion, agrega uno mas al objeto correspondiente, en el departamento correspondiente*/
        if(censo.ocupacion === 'no trabaja')
            noTrabajanPorDepartamento[censo.departamento] = noTrabajanPorDepartamento[censo.departamento] + 1 || 1;
        else if(censo.ocupacion === 'estudiante')
            estudianPorDepartamento[censo.departamento] = estudianPorDepartamento[censo.departamento] + 1 || 1;
        else
            trabajadoresPorDepartamento[censo.departamento] = trabajadoresPorDepartamento[censo.departamento] + 1 || 1;

        /* Por cada censo agrega uno mas al departamento correspondiente*/
        totalCensosPorDepartamento[censo.departamento] = totalCensosPorDepartamento[censo.departamento] + 1 || 1; 
    });
}

/* Cargar la tabla con los datos de censos requeridos*/
function cargarTabla() {
    
}
window.addEventListener("load",() =>{
    mainContainer.classList.add("activa");
});