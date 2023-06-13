
const mi_sistema = new Sistema();

/* **************************************************** Reutilizables ********************************************************** */
function mostrarMensajeError(contenedor,mensaje,inputGenerador) {
    const panelCensista = document.querySelector(".censista");

    panelCensista.classList.add("con-error");
    contenedor.innerHTML = mensaje;
    inputGenerador.style.border = "3px solid rgb(198, 3, 3)";
}

function borrarMensajeError(contenedor,input) {
    contenedor.innerHTML = '';
    input.style.border = '';
}

/* **************************************************** Registro Censista ********************************************************** */

function mostrarErroresRegistro(errores) {
    /*Elementos (usados para CSS)*/
    /* Inputs */
    const inputNombre = document.querySelector(".censista [name='nombre']"),
    inputUsuario = document.querySelector(".censista [name='usuario']"),
    inputContrasenia = document.querySelector(".censista [name='password']"),
    /* Contenedores*/
    contenedorNombre = document.querySelector(".censista .mensajes-error.nombre"),
    contenedorUsuario = document.querySelector(".censista .mensajes-error.usuario"),
    contenedorContrasenia = document.querySelector(".censista .mensajes-error.contrasenia");

    borrarMensajeError(contenedorNombre,inputNombre);
    borrarMensajeError(contenedorUsuario,inputUsuario);
    borrarMensajeError(contenedorContrasenia,inputContrasenia);

    errores.forEach(error => {
        if (error.tipo === 'nombre' ) 
            mostrarMensajeError(contenedorNombre,error.mensaje,inputNombre);
        else if (error.tipo === 'usuario' ) 
            mostrarMensajeError(contenedorUsuario,error.mensaje,inputUsuario);
        else
            mostrarMensajeError(contenedorContrasenia,error.mensaje,inputContrasenia);
    });
}

function registrarCensista() {
    /*Elementos (usados para CSS)*/
    const i_nombreCensista = document.querySelector(".censista [name='nombre']"),
    i_usuarioCensista = document.querySelector(".censista [name='usuario']"),
    i_contraseniaCensista = document.querySelector(".censista [name='password']");

    /* Valores, usados para logica*/
    const nombre = i_nombreCensista.value,
          usuario = i_usuarioCensista.value,
          contrasenia = i_contraseniaCensista.value;

    /* Registrar censista devuelve un array con los errores encontrados al registrar */
    let resultado = mi_sistema.registrarCensista(nombre,usuario,contrasenia);

    mostrarErroresRegistro(resultado);

    if (resultado.length === 0){
        document.querySelector(".censista .mensajes-error.general").innerHTML = "Registrado exitosamente!";
        document.querySelector("#iniciar_sesion_censistas").click();
    }
}

/* **************************************************** Inicio de Sesion Censista ********************************************************** */

function iniciarSesionCensista() {
    const usuario = document.querySelector(".censista [name='usuario']"),
          contrasenia = document.querySelector(".censista [name='password']"),
          errorUsuario = document.querySelector(".censista .mensajes-error.usuario"),
          errorContrasenia = document.querySelector(".censista .mensajes-error.contrasenia");
    
    borrarMensajeError(errorUsuario,usuario);
    borrarMensajeError(errorContrasenia,contrasenia);
    borrarMensajeError(document.querySelector(".censista .mensajes-error.general"),usuario);
    borrarMensajeError(document.querySelector(".censista .mensajes-error.general"),contrasenia);

    if (usuario.value.length > 0 && contrasenia.value.length > 0) {
        if (mi_sistema.esIngresoSistemaValido(usuario.value,contrasenia.value)){
            window.location = "censista-principal.html";
        }
        else{
            mostrarMensajeError(document.querySelector(".censista .mensajes-error.general"),"Usuario o Contraseña inválidos.",usuario);
            mostrarMensajeError(document.querySelector(".censista .mensajes-error.general"),"Usuario o Contraseña inválidos.",contrasenia);
        }
    } else {
        if (usuario.value.length <= 0)
            mostrarMensajeError(errorUsuario,"Ingrese un usuario, el campo no puede ser vacío.",usuario);
        if(contrasenia.value.length <= 0)
            mostrarMensajeError(errorContrasenia,"Ingrese una contrasenia, el campo no puede ser vacío.",contrasenia);
    }
}

/* **************************************************** Orquestador de ingreso Censista********************************************************** */
function gestionIngresoCensista() {
    const btnIngresoCensista = document.querySelector(".censista input.button");

    if (btnIngresoCensista.value === "Registrate")
        registrarCensista();
    else 
        iniciarSesionCensista();
}

function gestionIngresoInvitado() {
    //Gestion token?
    window.location = "invitado-principal.html";
}

/* **************************************************** Orquestador de eventos ********************************************************** */
function gestionDeEventos() {
    document.querySelector(".censista input.button").addEventListener("click",gestionIngresoCensista);
    document.querySelector(".invitado input.button").addEventListener("click",gestionIngresoInvitado);
}

/* ************************************************************ Inicio **************************************************************** */
window.addEventListener("load",gestionDeEventos);