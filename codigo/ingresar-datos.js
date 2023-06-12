const mi_sistema = new Sistema();
mi_sistema.censita_logueado = ['censista','sparedes'];

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

function mostrarDatos(cedula) {
    let indiceCenso = mi_sistema.recuperarIndiceCenso(cedula);
    document.querySelector("#i_nombre").value = mi_sistema.censos[indiceCenso].nombre;
    document.querySelector("#i_apellido").value = mi_sistema.censos[indiceCenso].apellido;
    document.querySelector("#i_edad").value = mi_sistema.censos[indiceCenso].edad;
    document.querySelector("#s_ocupacion").value = mi_sistema.censos[indiceCenso].ocupacion;
    document.querySelector("#s_departamento").value = mi_sistema.censos[indiceCenso].departamento;
}

function ingresarDatos(cedula) {
    alert("Ingresar");

}



function validarDatos(cedula) {
    alert("Validar");

}

/* ********************************** Validaciones cedula *************************************************** */
function verificarCedula() {
    const i_cedula = document.querySelector("#i_cedula"),
          cedula = i_cedula.value;


    if (!mi_sistema.esCedulaValida(cedula)){
        document.querySelector(".mensaje-error.cedula").innerHTML = `La c&eacute;dula <b>${i_cedula.value}</b> ingresada no es correcta.`;
    
    }else{
        document.querySelector("main .contenedor-datos").classList.add('activa');
        document.querySelector("main .contenedor-validacion").classList.add('activa');
        document.querySelector(".mensaje-error.cedula").innerHTML = '';
        i_cedula.setAttribute('disabled',true);
        if (mi_sistema.recuperarEstadoCenso(cedula) === ''){
            /*Si es invitado, precarga*/
            /*Si es censista, censa*/
        }else if (mi_sistema.recuperarEstadoCenso(cedula) === mi_sistema.PRE_INGRESO){
            mostrarDatos(cedula);
            /* Carga de datos*/
            /* Si es censista, censa los mismos*/
        }else{
            document.querySelector(".mensaje-error.cedula").innerHTML = `La c&eacute;dula ingresada <b>${i_cedula.value}</b> ya fue censada. Puede ver los datos ingresados debajo.`;
            mostrarDatos(cedula);
            /* Deshabilitar todo*/
        }
    }
}

function gestionDeEventos() {

    /* Estilo general del sistema */
    if (mi_sistema.censita_logueado !== null && mi_sistema.censita_logueado[0] === 'censista') {
        document.body.classList.add('censista');
    }else{
        document.body.classList.remove('censista');
    }

    cargarDepartamentos();
    cargarOcupacion();

    document.querySelector("#i_cedula").addEventListener("change",verificarCedula);
}

window.addEventListener("load",gestionDeEventos);
