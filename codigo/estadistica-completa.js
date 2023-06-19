const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'sparedes';

/* Elementos HTML*/
const contenedorPrincipal = document.querySelector("main");

/* Cosntantes y variables globales*/
let totalCensados = 0,
totalPreIngresados = 0,
censadosPorDepartamento = {},
pendientesPorDepartamento = {},
menoresPorDepartamento = {},
mayoresPorDepartamento = {};

/* Funciones */
/* Carga el selector de departamentos */
function cargaDepartamentos() {
    const selectorDepartamentos = document.querySelector("#s_departamento");

    /* Carga la opcion default */
    selectorDepartamentos.innerHTML = `<option value="default">Seleccione...</option>`;

    mi_sistema.departamentos.forEach(departamento => {
        if (departamento !== 'default')
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
    mi_sistema.censos.forEach(censo => {
        /* Asigna un objeto, donde tiene como indice el nombre del departamento. Y por valor la cantidad de censados*/
        if (mi_sistema.recuperarEstadoCenso(censo.cedula) === mi_sistema.CENSADO) {
            censadosPorDepartamento[censo.departamento] = censadosPorDepartamento[censo.departamento] + 1 || 1;

            if (censo.edad >= 18) 
                mayoresPorDepartamento[censo.departamento] = mayoresPorDepartamento[censo.departamento] + 1 || 1;
            else
                menoresPorDepartamento[censo.departamento] = menoresPorDepartamento[censo.departamento] + 1 || 1;
        }

        /* Asigna un objeto, donde tiene como indice el nombre del departamento. Y por valor la cantidad de censos pre ingresados y validados*/
        pendientesPorDepartamento[censo.departamento] = pendientesPorDepartamento[censo.departamento] + 1 || 1; 
    });
}

/*Carga la tabla con los valores de los censos por departamento*/
function cargaTabla() {
    const tablaPorDepartamentos = document.querySelector('.tabla-estadisticas');

    /*Encabezado*/
    tablaPorDepartamentos.innerHTML = `
    <thead>
        <tr>
            <th>Departamento</th>
            <th>Censados</th>
            <th>Total</th>
        </tr>
    </thead>`;

    /* Cuerpo */
    tablaPorDepartamentos.innerHTML += '<tbody>';

    mi_sistema.departamentos.forEach(departamento =>{
        if (departamento !== 'default') {
            let censados = censadosPorDepartamento[departamento] === undefined ? 0 : censadosPorDepartamento[departamento];
            let pendientes = pendientesPorDepartamento[departamento] === undefined ? 0 : pendientesPorDepartamento[departamento];
            tablaPorDepartamentos.querySelector('tbody').innerHTML += 
            `<tr>
                <td>${departamento}</td>
                <td>${censados}</td>
                <td>${pendientes}</td>
            </tr>`;
        }
    });

    tablaPorDepartamentos.innerHTML += '</tbody>';

    /*Selecciona por dfecto la primer fila*/
    tablaPorDepartamentos.querySelector('tbody').querySelector('tr:first-child').classList.add('activa');
}

function mostrarDetalleEdades() {
    const departamento = document.querySelector('#s_departamento').value;

    let ratio_mayores_total = mayoresPorDepartamento[departamento] === undefined ? 0 : mayoresPorDepartamento[departamento]/censadosPorDepartamento[departamento];
    document.querySelector('.percent.mayores').style = `--percentage:${ratio_mayores_total};`;
    document.querySelector('.percent.mayores .number h2').innerHTML = `${ratio_mayores_total*100}<span>%</span>`;

    /* Animation */
    document.querySelector('.percent.mayores').classList.remove('active');
    setTimeout(() => {
        document.querySelector('.percent.mayores').classList.add('active');
    }, "100");

    let ratio_menores_total = menoresPorDepartamento[departamento] === undefined ? 0 : menoresPorDepartamento[departamento]/censadosPorDepartamento[departamento];
    document.querySelector('.percent.menores').style = `--percentage:${ratio_menores_total};`;
    document.querySelector('.percent.menores .number h2').innerHTML = `${ratio_menores_total*100}<span>%</span>`;
    
    /*Animation*/
    document.querySelector('.percent.menores').classList.remove('active');
    setTimeout(() => {
        document.querySelector('.percent.menores').classList.add('active');
    }, "100");

}
window.addEventListener("load",() =>{
    contenedorPrincipal.classList.add("activa");
    mi_sistema.cargarNavegacion(document.querySelector('header'));

    cargaDepartamentos();
    establecerTotalCensados();
    mostrarTotalCensados();
    mostrarRelacionCensadosPendientes();
    recuperarCensadosPorDepartamento();
    cargaTabla();

    document.querySelector("#s_departamento").addEventListener('change',mostrarDetalleEdades);

});