/* Sistema */
const mi_sistema = new Sistema();
mi_sistema.censita_logueado = 'sparedes';

/* Elementos HTML*/
const mainContainer = document.querySelector("main");
const tablaPendientes = document.querySelector("main .tabla-pendientes");

/* Cosntantes y variables globales*/
    let editado = false;
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

function borrarMensajeError(contenedor,inputGenerador) {
    contenedor.innerHTML = '';
    inputGenerador.style.border = '';
}

function mostrarMensajeError(contenedor,mensaje,inputGenerador) {

    contenedor.innerHTML = mensaje;
    inputGenerador.style.border = "3px solid rgb(198, 3, 3)";
}

/* Habilita la edicion de los campos del fomulario*/
function habilitarEdicion() {
    document.querySelector('#i_nombre').removeAttribute('disabled');
    document.querySelector('#i_apellido').removeAttribute('disabled');
    document.querySelector('#i_edad').removeAttribute('disabled');
    document.querySelector('#s_departamento').removeAttribute('disabled');
    document.querySelector('#s_ocupacion').removeAttribute('disabled');
    editado = true;
}

function deshabilitarEdicion() {
    document.querySelector('#i_nombre').setAttribute('disabled',true);
    document.querySelector('#i_apellido').setAttribute('disabled',true);
    document.querySelector('#i_edad').setAttribute('disabled',true);
    document.querySelector('#s_departamento').setAttribute('disabled',true);
    document.querySelector('#s_ocupacion').setAttribute('disabled',true);
}

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
            let cedula_con_formato = '',
                cedula = censo.cedula;

            if (cedula.length === 7) {
                cedula_con_formato = cedula.slice(0,3) + '.' + cedula.slice(3,6) + '-' + cedula.slice(6);
            }else{
                cedula_con_formato = cedula.slice(0,1) + '.' + cedula.slice(1,4) + '.' + cedula.slice(4,7) + '-' + cedula.slice(7);
            }

            
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

/* Busca el censo asociaco a la cedula ingresada */
function buscarCenso() {
    const cedula = document.querySelector("#i_cedula").value;

    if (!mi_sistema.esCedulaValida(cedula)){
        return -2;
    }

    if (mi_sistema.recuperarEstadoCenso(cedula) === mi_sistema.CENSADO) {
        return -3;
    }

    return mi_sistema.recuperarIndiceCenso(cedula);
}

/* Si el censo existe en la bases de datos carga los valores del mismo en el formulario */
function cargarDatos() {
    let indiceCenso = buscarCenso();
    borrarMensajeError(document.querySelector('p.mensaje-error.cedula'),document.querySelector('#i_cedula'));

    if (indiceCenso < 0) {
        if (indiceCenso === -1)
            mostrarMensajeError(document.querySelector('p.mensaje-error.cedula'),'No hay un censo asociado a esa cedula',document.querySelector('#i_cedula'));
        else if (indiceCenso === -2)
            mostrarMensajeError(document.querySelector('p.mensaje-error.cedula'),'No es una cedula valida',document.querySelector('#i_cedula'));
        else
            mostrarMensajeError(document.querySelector('p.mensaje-error.cedula'),'La cedula ya fue censada',document.querySelector('#i_cedula'));

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

function validarDatos() {
    
    borrarMensajeError(document.querySelector('p.mensaje-error.nombre'),document.querySelector('#i_nombre'));
    borrarMensajeError(document.querySelector('p.mensaje-error.apellido'),document.querySelector('#i_apellido'));
    borrarMensajeError(document.querySelector('p.mensaje-error.edad'),document.querySelector('#i_edad'));
    borrarMensajeError(document.querySelector('p.mensaje-error.departamento'),document.querySelector('#s_departamento'));
    borrarMensajeError(document.querySelector('p.mensaje-error.ocupacion'),document.querySelector('#s_ocupacion'));
    
    let cedula = document.querySelector('#i_cedula').value;

    if (editado) {
        let nombre =document.querySelector('#i_nombre').value,
            apellido =document.querySelector('#i_apellido').value,
            edad =document.querySelector('#i_edad').value,
            departamento =document.querySelector('#s_departamento').value,
            ocupacion =document.querySelector('#s_ocupacion').value;

        mi_sistema.eliminarInformacionPreIngresada(cedula);

        let mensajesError = mi_sistema.ingresarDatosCenso(cedula,nombre,apellido,edad,departamento,ocupacion);

        if (mensajesError.length === 0) {
            alert('Se validaron los datos');
            deshabilitarEdicion();
            document.querySelector(".seccion-datos").classList.remove('activa');
            editado = false;
            cargarTabla();
            document.querySelector('#i_cedula').value = '';
            document.querySelector('#i_cedula').removeAttribute('disabled');

        }else{
            mensajesError.forEach (error =>{
                if (error.tipo === 'nombre' ) 
                    mostrarMensajeError(document.querySelector('p.mensaje-error.nombre'),error.mensaje,document.querySelector('#i_nombre'));
                else if (error.tipo === 'apellido' ) 
                    mostrarMensajeError(document.querySelector('p.mensaje-error.apellido'),error.mensaje,document.querySelector('#i_apellido'));
                else if (error.tipo === 'edad' ) 
                    mostrarMensajeError(document.querySelector('p.mensaje-error.edad'),error.mensaje,document.querySelector('#i_edad'));
                else if (error.tipo === 'departamento' ) 
                    mostrarMensajeError(document.querySelector('p.mensaje-error.departamento'),error.mensaje,document.querySelector('#s_departamento'));
                else if (error.tipo === 'ocupacion' ) 
                    mostrarMensajeError(document.querySelector('p.mensaje-error.ocupacion'),error.mensaje,document.querySelector('#s_ocupacion'));
            });
        }
    }else{ //No fue editado nada
        let error = mi_sistema.validarPreIngresado(cedula);
        
        if (error !== undefined) {
            mostrarMensajeError(document.querySelector('p.mensaje-error.cedula'),error,document.querySelector('#i_cedula'));
        
        }else{
            alert('Se validaron los datos');
            deshabilitarEdicion();
            document.querySelector(".seccion-datos").classList.remove('activa');
            editado = false;
            cargarTabla();
            document.querySelector('#i_cedula').value = '';
            document.querySelector('#i_cedula').removeAttribute('disabled');
        }
    }
}

window.addEventListener("load",() =>{
    /* Mostrar tabla */
    mainContainer.classList.add("activa");

    cargarTabla();

    cargarDepartamentos();
    cargarOcupacion();

    document.querySelector("#btn_buscar").addEventListener('click',cargarDatos);
    document.querySelector("#btn_validar").addEventListener('click',validarDatos);
    document.querySelector("#btn_editar").addEventListener('click',habilitarEdicion);
});