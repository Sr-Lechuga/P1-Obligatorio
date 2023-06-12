const mi_sistema = new Sistema();
// mi_sistema.censita_logueado = ['censista','sparedes'];
mi_sistema.censita_logueado = null;



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
    if (indiceCenso != -1) {
        document.querySelector("#i_nombre").value = mi_sistema.censos[indiceCenso].nombre;
        document.querySelector("#i_apellido").value = mi_sistema.censos[indiceCenso].apellido;
        document.querySelector("#i_edad").value = mi_sistema.censos[indiceCenso].edad;
        document.querySelector("#s_ocupacion").value = mi_sistema.censos[indiceCenso].ocupacion;
        document.querySelector("#s_departamento").value = mi_sistema.censos[indiceCenso].departamento;
    
    }else{
        document.querySelector(".mensaje-error.cedula").innerHTML += `<br>Error al recuperar la informacion`;
    }
}

function invalidarFormulario() {
    document.querySelector("#i_nombre").setAttribute('disabled',true);
    document.querySelector("#i_apellido").setAttribute('disabled',true);
    document.querySelector("#i_edad").setAttribute('disabled',true);
    document.querySelector("#s_departamento").setAttribute('disabled',true);
    document.querySelector("#s_ocupacion").setAttribute('disabled',true);
    document.querySelector("#btn_validar").setAttribute('disabled',true);
}

function borrarErrores() {
    document.querySelector("p.mensaje-error.nombre").innerHTML = '';
    document.querySelector("p.mensaje-error.apellido").innerHTML = '';
    document.querySelector("p.mensaje-error.edad").innerHTML = '';
    document.querySelector("p.mensaje-error.departamento").innerHTML = '';
    document.querySelector("p.mensaje-error.ocupacion").innerHTML = '';
}

function preIngresarDatos() {
    const cedula = document.querySelector("#i_cedula").value,
        nombre = document.querySelector("#i_nombre").value,
        apellido = document.querySelector("#i_apellido").value,
        edad = document.querySelector("#i_edad").value,
        departamento = document.querySelector("#s_departamento").value,
        ocupacion = document.querySelector("#s_ocupacion").value;

    /* Limpio los mensajes de error previo*/
    borrarErrores();

    /* Preingresar datos devuelve mensajes de error si no valida los datos */
    let mensajesError = mi_sistema.preIngresarDatosCenso(cedula,nombre,apellido,edad,departamento,ocupacion);

    if (mensajesError.length === 0) {
        /* Si no hay mensajes de error, avisa que ingreso correctamente*/
        let indice_censo = mi_sistema.recuperarIndiceCenso(cedula);
        let nombre_censista = mi_sistema.recuperarNombreCensista(mi_sistema.censos[indice_censo].censista_asignado);

        document.querySelector("#p_mensaje_final").innerHTML = `Se le asigno el censista: <b>${nombre_censista}</b>`;
        document.querySelector("#p_mensaje_final").removeAttribute('hidden');
        invalidarFormulario();
        scroll(0,document.body.scrollHeight);
    }else{
        /* Si devuelve mensajes de error, muestra mensaje para cada cosa equivocada*/
        mensajesError.forEach(error =>{
            document.querySelector(`p.mensaje-error.${error.tipo}`).innerHTML = error.mensaje;
        });
    }
}

function validarDatos() {
    const cedula = document.querySelector("#i_cedula").value,
        nombre = document.querySelector("#i_nombre").value,
        apellido = document.querySelector("#i_apellido").value,
        edad = document.querySelector("#i_edad").value,
        departamento = document.querySelector("#s_departamento").value,
        ocupacion = document.querySelector("#s_ocupacion").value;

    /* Limpio los mensajes de error previo*/
    borrarErrores();

    /* Preingresar datos devuelve mensajes de error si no valida los datos */
    let mensajesError = mi_sistema.ingresarDatosCenso(cedula,nombre,apellido,edad,departamento,ocupacion);

    if (mensajesError.length === 0) {

        document.querySelector("#p_mensaje_final").innerHTML = "<b>Censado correctamente</b>";
        document.querySelector("#p_mensaje_final").removeAttribute('hidden');
        invalidarFormulario();
        scroll(0,document.body.scrollHeight);
    
    }else{
        /* Si devuelve mensajes de error, muestra mensaje para cada cosa equivocada*/
        mensajesError.forEach(error =>{
            document.querySelector(`p.mensaje-error.${error.tipo}`).innerHTML = error.mensaje;
        });
    }
}

function removerDatosPreIngresados() {
    alert('Eliminar');
}

/* ********************************** Validaciones cedula *************************************************** */
function verificarCedula() {
    const i_cedula = document.querySelector("#i_cedula"),
          cedula = i_cedula.value;


    if (!mi_sistema.esCedulaValida(cedula)){
        document.querySelector(".mensaje-error.cedula").innerHTML = `La c&eacute;dula <b>${cedula}</b> ingresada no es correcta.`;
    
    }else{
        document.querySelector("main .contenedor-datos").classList.add('activa');
        document.querySelector("main .contenedor-validacion").classList.add('activa');
        document.querySelector(".mensaje-error.cedula").innerHTML = '';
        i_cedula.setAttribute('disabled',true);
        if (mi_sistema.recuperarEstadoCenso(cedula) === ''){
            //Sin ingresar
            if (mi_sistema.censita_logueado === null) {
                /*Si es invitado (cesnista_logueado === null), pre-ingresa*/
                document.querySelector("#btn_validar").value = "Pre-ingresar datos";
            }else{
                /*Si es censista, censa*/
                document.querySelector("#btn_validar").value = "Censar";
            }
        }else if (mi_sistema.recuperarEstadoCenso(cedula) === mi_sistema.PRE_INGRESADO){
            mostrarDatos(cedula);
            let indice = mi_sistema.recuperarIndiceCenso(cedula);

            if (indice === -1){
                alert("No existe el censo");
                return;
            }

            document.querySelector("#i_nombre").value = mi_sistema.censos[indice].nombre;
            document.querySelector("#i_apellido").value = mi_sistema.censos[indice].apellido;
            document.querySelector("#i_edad").value = mi_sistema.censos[indice].edad;
            document.querySelector("#s_departamento").value = mi_sistema.censos[indice].departamento;
            document.querySelector("#s_ocupacion").value = mi_sistema.censos[indice].ocupacion;
            
            if (mi_sistema.censita_logueado === null) {
                /*Si es invitado (cesnista_logueado === null), elimna censo pre-ingresado */
                invalidarFormulario();
                document.querySelector("#btn_validar").value = "Eliminar";
                document.querySelector("#btn_validar").removeAttribute('disabled');
                document.querySelector("#btn_validar").removeEventListener("click",preIngresarDatos);
                document.querySelector("#btn_validar").addEventListener("click",removerDatosPreIngresados);
            }else{
                /*Si es censista, censa*/
                document.querySelector("#btn_validar").value = "Censar";
            }

        }else{
            document.querySelector(".mensaje-error.cedula").innerHTML = `La c&eacute;dula ingresada <b>${cedula}</b> ya fue censada. Puede ver los datos ingresados debajo.`;
            mostrarDatos(cedula);
            invalidarFormulario();
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
    if (mi_sistema.censita_logueado === null) {
        document.querySelector("#btn_validar").addEventListener("click",preIngresarDatos);
    
    }else{
        document.querySelector("#btn_validar").addEventListener("click",validarDatos);
    }

    console.log(mi_sistema.TOT)
}

window.addEventListener("load",gestionDeEventos);
