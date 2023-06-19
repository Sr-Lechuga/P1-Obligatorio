const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'sparedes';

/* Elementos HTML*/
const mainContainer = document.querySelector("main");
const tablaPendientes = document.querySelector("main .tabla-pendientes");

/* Cosntantes y variables globales*/

/* Funciones */
/* Carga la tabla con todos los usuarios asignados para validar del censista logueado */
function cargarTabla() {
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
            let cedula_con_formato = mi_sistema.formatearCedula(censo.cedula);

            
            tablaPendientes.querySelector("tbody").innerHTML += 
            `<tr>
                <td>${cedula_con_formato}</td>
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

/* Carga el selector con todos los censistas disponibles*/
function cargarCensistas() {
    const selectorCensistas = document.querySelector("#s_censistas");
    /*Opcion default*/
    selectorCensistas.innerHTML = `<option value="default">Seleccione...</option>`;

    /* Carga de opciones el selector con todos los censistas menos el actualmente logueado en el sistema*/
    mi_sistema.censistas.forEach(censista => {
        if (censista.usuario !== mi_sistema.recuperarCensistaLogueado()) {
            selectorCensistas.innerHTML += `<option value="${censista.usuario}">${censista.nombre}</option>`;
        }
    });
}

/* Carga el selector con todas las personas disponibles para el censista actual*/
function cargarPersonas() {
    const selectorCenso = document.querySelector("#s_persona");
    let censosPendientes = [];

    /* Opcion default del selector */
    selectorCenso.innerHTML = `<option value="default">Seleccione...</option>`;

    mi_sistema.censos.forEach(censo => {
        if (censo.censista_asignado === mi_sistema.recuperarCensistaLogueado() 
            && censo.estado === mi_sistema.PRE_INGRESADO) {
            selectorCenso.innerHTML += `<option value="${censo.cedula}">(${mi_sistema.formatearCedula(censo.cedula)}) ${censo.apellido}, ${censo.nombre}</option>`;
        }
    });
}


function reasignarCensista() {
    const censista = document.querySelector("#s_censistas").value,
          cedula = document.querySelector("#s_persona").value,
          parrafoMensajeError = document.querySelector(".seccion-mensaje p.error"),
          parrafoMensajeCorrecto = document.querySelector(".seccion-mensaje p.correcto");

    /* Resetea los mensajes correctos y de error*/
    parrafoMensajeCorrecto.textContent = '';
    parrafoMensajeError.textContent = '';

    /* Chequea errores de seleccion */
    if (cedula === 'default') {
        parrafoMensajeError.textContent = 'La cédula seleccionada no es válida.';
        return;
    }else if (censista === 'default'){
        parrafoMensajeError.textContent = 'El usuario seleccionado no es válido.';
        return;
    }

    /* Reasignacion de censista con cedula y usuario*/
    let error = mi_sistema.reasignarCensista(cedula,censista);

    /*Posibles errores de retorno*/
    if (error === ''){
        parrafoMensajeCorrecto.textContent = 'Se reasigno al censista correctamente';
        /*Recarga los valores sin el reasignado */
        cargarTabla();
        cargarPersonas();
        document.querySelector("#s_censistas").value = 'default';
        document.querySelector("#s_persona").value = 'default';
    }
    else
        parrafoMensajeError.textContent = error;
}


window.addEventListener("load",() =>{
    mainContainer.classList.add("activa");

    cargarCensistas();
    cargarPersonas();
    cargarTabla();

    document.querySelector("#btn_reasignar").addEventListener('click',reasignarCensista);
});