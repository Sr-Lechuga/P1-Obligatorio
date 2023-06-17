/* Sistema */
const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'sparedes';

/* Elementos HTML*/
const mainContainer = document.querySelector("main");
const tablaPendientes = document.querySelector("main .tabla-pendientes");

/* Cosntantes y variables globales*/

/* Funciones */

/*Cargar los valores de los departamentos*/
function cargarDepartamentos() {
    mi_sistema.departamentos.forEach(departamento => {
        if (departamento === 'default')
            /* La opcion default debe mostrar el texto Seleccione...*/
            document.querySelector("#s_departamento").innerHTML += `<option value="${departamento.toLowerCase()}">Seleccione...</option>`;
        else
            document.querySelector("#s_departamento").innerHTML += `<option value="${departamento.toLowerCase()}">${departamento}</option>`;
    });
}

function cargarOcupacion() {
    mi_sistema.ocupaciones.forEach(ocupacion => {
        if (ocupacion === 'default') 
            /* La opcion default debe mostrar el texto Seleccione...*/
            document.querySelector("#s_ocupacion").innerHTML += `<option value="${ocupacion.toLowerCase()}">Seleccione...</option>`;
        else
            document.querySelector("#s_ocupacion").innerHTML += `<option value="${ocupacion.toLowerCase()}">${ocupacion}</option>`;
    });
}

/* Carga la tabla con todos los usuarios asignados para validar del censista logueado */
function preCargarTabla(usuario) {
    tablaPendientes.innerHTML = 
    `<thead> 
        <tr>
        <th>C&eacute;dula</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Estado</th>
        <th>Departamento</th>
        <th>Ultima modificaci&oacute;n</th>
    </tr>
    </thead>`;

    tablaPendientes.innerHTML += `<tbody>`; 
    mi_sistema.censos.forEach(censo =>{
        if (censo.censista_asignado === mi_sistema.recuperarCensistaLogueado() && censo.estado === mi_sistema.PRE_INGRESADO) {

            tablaPendientes.querySelector("tbody").innerHTML += 
            `<tr>
                <td>${censo.cedula}</td>
                <td>${censo.nombre}</td>
                <td>${censo.apellido}</td>
                <td>Esperando Verificaci&oacute;n</td>
                <td>${censo.departamento}</td>
                <td>${censo.ultima_modificacion}</td>
            </tr>`;
        }
    });
    tablaPendientes.innerHTML += `</tbody>`; 
}

/* Busca el censo asociaco a la cedula ingresada */
function buscarCenso() {
    const cedula = document.querySelector("#i_cedula").value;

    if (!mi_sistema.esCedulaValida(cedula)){
        alert("No es una cedula valida");
        return;
    }

    return mi_sistema.recuperarIndiceCenso(cedula);
}

/* Si el censo existe en la bases de datos carga los valores del mismo en el formulario */
function cargarDatos() {
    let indiceCenso = buscarCenso();

    if (indiceCenso === -1) {
        alert('No hay un censo asociado a esa cedula')
    
    }else{
        document.querySelector(".seccion-datos").classList.add('activa');
        
        let censo = mi_sistema.censos[indiceCenso];
    
        document.querySelector('#i_nombre').value = censo.nombre;
        document.querySelector('#i_apellido').value = censo.apellido;
        document.querySelector('#i_edad').value = censo.edad;
        document.querySelector('#s_departamento').value = censo.departamento;
        document.querySelector('#s_ocupacion').value = censo.ocupacion;
    }
}


window.addEventListener("load",() =>{
    /* Mostrar tabla */
    mainContainer.classList.add("activa");

    preCargarTabla();

    cargarDepartamentos();
    cargarOcupacion();

    document.querySelector("#btn_buscar").addEventListener('click',cargarDatos);
});