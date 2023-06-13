/* Sistema */
const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'sparedes';

/* Elementos HTML*/
const mainContainer = document.querySelector("main");
const tablaPendientes = document.querySelector("main .tabla-pendientes");

/* Cosntantes y variables globales*/

/* Funciones */

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
        if (censo.censista_asignado === mi_sistema.recuperarCensistaLogueado()) {
            let estado = '';
            if (censo.estado = mi_sistema.PRE_INGRESADO)
                estado = 'Esperando Verificaci&oacute;n';
            else
                estado = 'Error';

            tablaPendientes.querySelector("tbody").innerHTML += 
            `<tr>
                <td>${censo.cedula}</td>
                <td>${censo.nombre}</td>
                <td>${censo.apellido}</td>
                <td>${estado}</td>
                <td>${censo.departamento}</td>
                <td>${censo.ultima_modificacion}</td>
            </tr>`;
        }
    });
    tablaPendientes.innerHTML += `</tbody>`; 
}

window.addEventListener("load",() =>{
    /* Mostrar tabla */
    mainContainer.classList.add("activa");

    preCargarTabla();
});