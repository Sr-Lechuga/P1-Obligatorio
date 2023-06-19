const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'sparedes';

/* Elementos HTML*/
const contenedorPrincipal = document.querySelector("main");

/* Cosntantes y variables globales*/
let totalCensados = 0,
totalPreIngresados = 0;

/* Funciones */
/* Carga el selector de departamentos */
function cargaDepartamentos() {
    const selectorDepartamentos = document.querySelector("#s_departamento");

    /* Carga la opcion default */
    selectorDepartamentos.innerHTML = `<option value="default">Seleccione...</option>`;

    mi_sistema.departamentos.forEach(departamento => {
        selectorDepartamentos.innerHTML += `<option value="${departamento}">${departamento}</option>`;
    });
}

/* Devuelve el total de censados hasta el momento */
function establecerTotalCensados() {
    let subTotalCensados = 0,
        subTotalPreIngresados = 0;

    mi_sistema.censos.forEach(censo => {
        if (mi_sistema.recuperarEstadoCenso(censo.cedula) === mi_sistema.CENSADO) {
            subTotalCensados++;
        }else if(mi_sistema.recuperarEstadoCenso(censo.cedula) === mi_sistema.PRE_INGRESADO){
            subTotalPreIngresados++;
        }
    });

    totalCensados = subTotalCensados;
    totalPreIngresados = subTotalPreIngresados;
}

function mostrarTotalCensados() {
    document.querySelector('.seccion-validacion span.valor').textContent = totalCensados;
}

function mostrarRelacionCensadosPendientes() {
    const tablaCompletitud = document.querySelector('.tabla-completitud').querySelector('tbody').querySelector('tr:first-child');

    tablaCompletitud.querySelector('td:nth-child(1)').textContent = totalCensados;
    tablaCompletitud.querySelector('td:nth-child(2)').textContent = mi_sistema.censos.length;

    let porcentaje = totalCensados / mi_sistema.censos.length;
    document.querySelector('.percent').style = `--percentage:${porcentaje};`;
    document.querySelector('.number').querySelector('h2').innerHTML = `${porcentaje*100}<span>%</span>`;
}


function recuperarCensadosPorDepartamento(){

}

/*Carga la tabla con los valores de los censos por departamento*/
function cargaTabla() {
    
}

window.addEventListener("load",() =>{
    contenedorPrincipal.classList.add("activa");

    cargaDepartamentos();
    establecerTotalCensados();
    mostrarTotalCensados();
    mostrarRelacionCensadosPendientes();
});