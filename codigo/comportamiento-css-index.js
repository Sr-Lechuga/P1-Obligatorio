const TEXTO_INICIO_SESION = "Iniciar sesion",
      TEXTO_REGISTRAR = "Registrate",
      TEXTO_OLVIDO_CONTRASENIA = "¿Olvidaste tu contraseña?",
      TEXTO_A_UN_PASO = "¡Estas a un paso de ser parte del censo!";

//Elementos
const flechaIzquierda = document.querySelector(".overlay-right i"),
      flechaDerecha = document.querySelector(".overlay-left i"),
      contenedor = document.querySelector(".container"),
      ladoIzquierdo = document.querySelector(".overlay-left"),
      ladoDerecho = document.querySelector(".overlay-right"),
      btnRegistrarCensor = document.querySelector("#registrar_censistas"),
      btniniciarSesionCensor = document.querySelector("#iniciar_sesion_censistas"),
      btnIngresarInvitado = document.querySelector(".invitado .button");

flechaIzquierda.addEventListener("click", () => {
    contenedor.classList.toggle("censista-activo");
});

flechaDerecha.addEventListener("click", () => {
    contenedor.classList.toggle("censista-activo");
});

btnRegistrarCensor.addEventListener("click", () =>{
    ladoIzquierdo.classList.toggle("register");
    document.querySelector(".censista [name=nombre]").style.display = "block";
    document.querySelector(".censista p").innerHTML = "Utiliza tu nombre y define un usuario y contraseña para registrarte";
    document.querySelector(".censista .button").value = TEXTO_REGISTRAR;
    document.querySelector(".censista a").innerHTML = TEXTO_A_UN_PASO;
    document.querySelector(".censista a").href = "#";
});

btniniciarSesionCensor.addEventListener("click", () =>{
    ladoIzquierdo.classList.toggle("register");
    document.querySelector(".censista [name=nombre]").style.display = "none";
    document.querySelector(".censista p").innerHTML = "Utiliza tu usuario y contraseña para inciar sesi&oacute;n";
    document.querySelector(".censista .button").value = TEXTO_INICIO_SESION;
    document.querySelector(".censista a").innerHTML = TEXTO_OLVIDO_CONTRASENIA;
});

btnIngresarInvitado.addEventListener("click", () =>{
    window.location.assign("invitado-principal.html");
});