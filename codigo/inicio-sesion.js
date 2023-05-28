class Censista{
    constructor(nombre,usuario,contrasenia){
        this.nombre = nombre;
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }
}

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

function esContraseniaValida(inputContrasenia) {
    const contenedorError = document.querySelector(".censista .mensajes-error.contrasenia"),
          contrasenia = inputContrasenia.value;

    let formatoIncorrecto = contrasenia.length < 5; //Al menos 5 caracteres
    formatoIncorrecto = formatoIncorrecto || contrasenia.match(/[A-Z]/g) === null; //Contiene mayuscula
    formatoIncorrecto = formatoIncorrecto || contrasenia.match(/[a-z]/g) === null; //Contiene minuscula
    formatoIncorrecto = formatoIncorrecto || contrasenia.match(/[0-9]/g) === null; //Contiene numero

    if (inputContrasenia.value.length <= 0) {
        mostrarMensajeError(contenedorError,"Ingrese una contraseña, el campo no puede ser vacío.",inputContrasenia);
    } else if (formatoIncorrecto){
        mostrarMensajeError(contenedorError,"Contraseña invalida. Debe tener al menos 5 caracteres y contener 1 mayúscula, 1 minúscula y un número.",inputContrasenia);
    }else{
        borrarMensajeError(contenedorError,inputContrasenia);
    }

    return (inputContrasenia.value.length > 0 && !formatoIncorrecto);
}

function esUsuarioValido(inputUsuario){
    const contenedorError = document.querySelector(".censista .mensajes-error.usuario");

    if (inputUsuario.value.length <= 0) {
        mostrarMensajeError(contenedorError,"Ingrese un nombre de usuario, el campo no puede ser vacío.",inputUsuario);
    } else if (inputUsuario.value === "Solomeo") {
        mostrarMensajeError(contenedorError,"Ya existe un usuario con ese nombre. Intente nuevamente con uno nuevo.",inputUsuario);
    }else{
        borrarMensajeError(contenedorError,inputUsuario);
    }

    return inputUsuario.value !== "Solomeo" && inputUsuario.value.length > 0;
}

function esNombreValido(inputNombre) {
    const contenedorError = document.querySelector(".censista .mensajes-error.nombre");

    if (inputNombre.value.length <= 0){
        mostrarMensajeError(contenedorError,"Ingrese un nombre, el campo no puede ser vacío.",inputNombre);
    }else{
        borrarMensajeError(contenedorError,inputNombre);
    }
    return inputNombre.value.length > 0;
}

function validarRegistroCensista() {
    const i_nombreCensista = document.querySelector(".censista [name='nombre']"),
    i_usuarioCensista = document.querySelector(".censista [name='usuario']"),
    i_contraseniaCensista = document.querySelector(".censista [name='password']"),
    panelCensista = document.querySelector(".censista");
    
    i_nombreCensista.style.border = "";
    i_usuarioCensista.style.border = "";
    i_contraseniaCensista.style.border = "";

    //De esta forma para que se validen todos los campos. Y con el valor previo de la variable al final, porque hace circuito corto
    let credencialesValidas = esNombreValido(i_nombreCensista);
    credencialesValidas = esUsuarioValido(i_usuarioCensista) && credencialesValidas;
    credencialesValidas = esContraseniaValida(i_contraseniaCensista) && credencialesValidas;

    if (!credencialesValidas) {
        panelCensista.querySelector("input.button").scrollIntoView();
        return "Registo invalido";
    }

    return new Censista(i_nombreCensista.value, i_usuarioCensista.value, i_contraseniaCensista.value);
}

function registrarCensista() {
    let nuevoCensista = validarRegistroCensista();

    if (nuevoCensista !== "Registo invalido") {
        console.log(nuevoCensista);
        //Registrar el censista en la base de datos
    }
}

function iniciarSesionCensista() {
    alert("Falta construir");
}

function gestionIngresoCensista() {
    const btnIngresoCensista = document.querySelector(".censista input.button");

    if (btnIngresoCensista.value === "Registrate")
        registrarCensista();
    else 
        iniciarSesionCensista();
}
function gestionDeEventos() {
    document.querySelector(".censista input.button").addEventListener("click",gestionIngresoCensista);
}

window.addEventListener("load",gestionDeEventos);