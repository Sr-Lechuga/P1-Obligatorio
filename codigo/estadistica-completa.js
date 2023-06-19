const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'sparedes';

/* Elementos HTML*/
const contenedorPrincipal = document.querySelector("main");

/* Cosntantes y variables globales*/

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
function recuperarTotalCensados() {
    
}

function recuperarCensadosPorDepartamento(){

}

/*Carga la tabla con los valores de los censos por departamento*/
function cargaTabla() {
    
}

window.addEventListener("load",() =>{
    contenedorPrincipal.classList.add("activa");

    cargaDepartamentos();
});