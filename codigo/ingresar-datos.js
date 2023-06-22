const mi_sistema = new Sistema();
let esteModo = '';

/* ********************************************* Auxiliares ********************************************************** */
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
}

function borrarErrores() {
    document.querySelector("p.mensaje-error.nombre").innerHTML = '';
    document.querySelector("p.mensaje-error.apellido").innerHTML = '';
    document.querySelector("p.mensaje-error.edad").innerHTML = '';
    document.querySelector("p.mensaje-error.departamento").innerHTML = '';
    document.querySelector("p.mensaje-error.ocupacion").innerHTML = '';
}

/* ******************************************* Principales ********************************************************** */
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

function removerDatosPreIngresados() {
    const cedula = document.querySelector("#i_cedula").value;
    let mensajeError = mi_sistema.eliminarInformacionPreIngresada(cedula);

    if (mensajeError.length === 0) {
        document.querySelector("#p_mensaje_final").innerHTML = `Los datos para la c&eacute;dula <b>${cedula}</b> se borraron existosamente`;
        document.querySelector("#p_mensaje_final").removeAttribute('hidden');
        scroll(0,document.body.scrollHeight);
    
    }else{
        document.querySelector("#p_mensaje_final").innerHTML = `${mensajeError}`;
        document.querySelector("#p_mensaje_final").removeAttribute('hidden');
        scroll(0,document.body.scrollHeight);
    }
}

function censarDatos() {
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
        
        /* Si todo salio correctamente se le asigna quien lo censo*/
        mi_sistema.asignarCensista(cedula,mi_sistema.recuperarCensistaLogueado());

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

/* ********************************** Validaciones cedula *************************************************** */
function verificarCedula() {
    const i_cedula = document.querySelector("#i_cedula"),
          cedula = i_cedula.value;


    if (!mi_sistema.esCedulaValida(cedula)){
        document.querySelector(".mensaje-error.cedula").innerHTML = `La c&eacute;dula <b>${cedula}</b> ingresada no es correcta.`;

    }else{
        /* Activa formulario, desactiva cedula*/
        document.querySelector("main .contenedor-datos").classList.add('activa');
        document.querySelector("main .contenedor-validacion").classList.add('activa');
        i_cedula.setAttribute('disabled',true);

        /*Borra mensaje error*/
        document.querySelector(".mensaje-error.cedula").innerHTML = '';

        if (mi_sistema.recuperarEstadoCenso(cedula) === ''){
            
            if (mi_sistema.recuperarCensistaLogueado() === 'invitado') {
                if (esteModo !== 'eliminar') {
                    /*Si es invitado, pre-ingresa*/
                    document.querySelector("#btn_preingresar").style.display = 'inline-block';
                    document.querySelector('#btn_eliminar').style.display = 'none';
                    document.querySelector('#btn_censar').style.display = 'none';
                }else{
                    document.querySelector(".mensaje-error.cedula").innerHTML = `La cedula no tiene registros. Dirijase a ingresar para ingresarla`;
                    document.querySelector("#btn_preingresar").style.display = 'none';
                    document.querySelector('#btn_eliminar').style.display = 'none';
                    document.querySelector('#btn_censar').style.display = 'none';
                    invalidarFormulario();
                }
            
            }else{
                /*Si es censista, censa*/
                document.querySelector("#btn_preingresar").style.display = 'none';
                document.querySelector('#btn_eliminar').style.display = 'none';
                document.querySelector('#btn_censar').style.display = 'inline-block';
            }

        }else if (mi_sistema.recuperarEstadoCenso(cedula) === mi_sistema.PRE_INGRESADO){
            
            mostrarDatos(cedula);
            
            if (mi_sistema.recuperarCensistaLogueado() === 'invitado') {
            /*Si es invitado, elimina censo pre-ingresado */
                /*Invalida formulario para que no se cambien los datos, solo se pueden eliminar*/
                invalidarFormulario();

                /*Habilita boton de eliminar informacion*/
                document.querySelector("#btn_preingresar").style.display = 'none';
                document.querySelector('#btn_eliminar').style.display = 'inline-block';
                document.querySelector('#btn_censar').style.display = 'none';
            
            }else{
            /*Si es censista, censa*/
                /*Invalida formulario para que no se cambien los datos, debe chequear sus pre-ingresados*/
                invalidarFormulario();

                document.querySelector("#btn_preingresar").style.display = 'none';
                document.querySelector('#btn_eliminar').style.display = 'none';
                document.querySelector('#btn_censar').style.display = 'none';
            }

        }else{
            
            /* Muestra mensaje de error */
            document.querySelector(".mensaje-error.cedula").innerHTML = `La c&eacute;dula ingresada <b>${cedula}</b> ya fue censada. Puede ver los datos ingresados debajo.`;
            
            /*Muestra datos y no permite acciones*/
            mostrarDatos(cedula);
            invalidarFormulario();
            
            /*No muestra botones para acciones*/
            document.querySelector("#btn_preingresar").style.display = 'none';
            document.querySelector('#btn_eliminar').style.display = 'none';
            document.querySelector('#btn_censar').style.display = 'none';
        }
    }
}

function gestionDeEventos() {
    

    var urlParams = new URLSearchParams(window.location.search),
        usuario = urlParams.get("usuario"),
        modo = urlParams.get("modo");

    if(modo === 'eliminar')
        esteModo = modo;

    mi_sistema.censita_logueado = usuario;
    /* Carga el menu de navegacion superior*/
    mi_sistema.cargarNavegacion(document.querySelector('header'));

    /*Carga selectores*/
    cargarDepartamentos();
    cargarOcupacion();

    /* Evento para verificar la cedula al cambiar el valor del input*/
    document.querySelector("#i_cedula").addEventListener("change",verificarCedula);

    /* Acciones con los censos para cada boton*/
    document.querySelector("#btn_censar").addEventListener("click",censarDatos);
    document.querySelector("#btn_eliminar").addEventListener("click",removerDatosPreIngresados);
    document.querySelector("#btn_preingresar").addEventListener("click",preIngresarDatos);

    /* Estilo general del sistema */
    if (usuario === 'invitado') {
        document.body.classList.remove('censista');
    }else{
        document.body.classList.add('censista');    
    }
}

window.addEventListener("load",gestionDeEventos);
