const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'invitado';

/* Elementos HTML*/
const mainContainer = document.querySelector("main");
const tablaEstadisticas = document.querySelector("main .tabla-estadisticas");

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
    /* Recupera los valores en tiempo real de los censos*/
    retornarDatosPorDepartamento();

    /*Crea el encabezado*/
    tablaEstadisticas.innerHTML = 
    `<thead>
        <tr>
            <th>Departamento</th>
            <th>Estudian</th>
            <th>No trabajan</th>
            <th>Dependientes o independientes</th>
            <th>Porcentaje del total de censados</th>
        </tr>
    </thead>`;

    /* Crea el cuerpo de la tabla */
    tablaEstadisticas.innerHTML += '<tbody>';
    mi_sistema.departamentos.forEach(departamento =>{
        if (departamento === 'default')
            return;

        let censados = censadosPorDepartamento[departamento] === undefined ? 0 : censadosPorDepartamento[departamento],
            total = totalCensosPorDepartamento[departamento] === undefined ? 0 : totalCensosPorDepartamento[departamento],
            porcentaje = total === 0 ? 0 : parseInt((censados/total) * 100);

        tablaEstadisticas.querySelector('tbody').innerHTML += 
        `<tr>
            <td>${departamento}</td>
            <td>${estudianPorDepartamento[departamento] === undefined ? '0' : estudianPorDepartamento[departamento]}</td>
            <td>${noTrabajanPorDepartamento[departamento] === undefined ? '0' : noTrabajanPorDepartamento[departamento]}</td>
            <td>${trabajadoresPorDepartamento[departamento] === undefined ? '0' : trabajadoresPorDepartamento[departamento]}</td>
            <td>${porcentaje}%</td>
        </tr>`;
    });
    tablaEstadisticas.innerHTML += '</tbody>';


}

window.addEventListener("load",() =>{
    mainContainer.classList.add("activa");
    mi_sistema.cargarNavegacion(document.querySelector('header'));
    
    cargarTabla();
});