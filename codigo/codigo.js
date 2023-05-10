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
      btnRegistrarCensor = document.querySelector("#registrar_censadores"),
      btnRegistrarUsuario = document.querySelector("#registrar_usuarios"),
      btniniciarSesionCensor = document.querySelector("#iniciar_sesion_censadores"),
      btniniciarSesionUsuario = document.querySelector("#iniciar_sesion_usuarios");

flechaIzquierda.addEventListener("click", () => {
    contenedor.classList.toggle("censadores-activo");
});

flechaDerecha.addEventListener("click", () => {
    contenedor.classList.toggle("censadores-activo");
});

btnRegistrarCensor.addEventListener("click", () =>{
    ladoIzquierdo.classList.toggle("register");
    document.querySelector(".censador [name=nombre]").style.display = "block";
    document.querySelector(".censador p").innerHTML = "Utiliza tu nombre y usuario para registrarte";
    document.querySelector(".censador .button").value = TEXTO_REGISTRAR;
    document.querySelector(".censador a").innerHTML = TEXTO_A_UN_PASO;
    document.querySelector(".censador a").href = "#";
});

btniniciarSesionCensor.addEventListener("click", () =>{
    ladoIzquierdo.classList.toggle("register");
    document.querySelector(".censador [name=nombre]").style.display = "none";
    document.querySelector(".censador p").innerHTML = "Utiliza tu email para inciar sesi&oacute;n";
    document.querySelector(".censador .button").value = TEXTO_INICIO_SESION;
    document.querySelector(".censador a").innerHTML = TEXTO_OLVIDO_CONTRASENIA;
});

/*btnRegistrarUsuario.addEventListener("click", () =>{
    ladoDerecho.classList.toggle("register");
    document.querySelector(".usuario [name=nombre]").style.display = "block";
    document.querySelector(".usuario p").innerHTML = "Utiliza tu nombre y mail para registrarte";
    document.querySelector(".usuario .button").value = TEXTO_REGISTRAR;
    document.querySelector(".usuario a").innerHTML = TEXTO_A_UN_PASO;
    document.querySelector(".usuario a").href = "#";
});

btniniciarSesionUsuario.addEventListener("click", () =>{
    ladoDerecho.classList.toggle("register");
    document.querySelector(".usuario [name=nombre]").style.display = "none";
    document.querySelector(".usuario p").innerHTML = "Utiliza tu email para inciar sesi&oacute;n";
    document.querySelector(".usuario .button").value = TEXTO_INICIO_SESION;
    document.querySelector(".usuario a").innerHTML = TEXTO_OLVIDO_CONTRASENIA;
});*/