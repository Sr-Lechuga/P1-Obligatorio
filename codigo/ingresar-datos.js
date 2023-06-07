class Censo{
    constructor(cedula,estado,nombre,apellido,edad,departamento,ocupacion){
        this.cedula = cedula;
        this.estado = estado;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.departamento = departamento;
        this.ocupacion = ocupacion;       
    }
}
const EDAD_MINIMA = 0,
      EDAD_MAXIMA = 130,
      DEPARTAMENTOS = ["montevideo","canelones","artigas","cerro largo","colonia","durazno","flores","florida","lavalleja","maldonado","paysandu","rio negro","rivera","rocha","salto","san jose","soriano","tacuarembo","treinta y tres"],
      OCUPACIONES = ["dependiente","independiente","estudiante","no trabaja"],
      PENDIENTE = 0, PRE_INGRESO = 1, VALIDADO = 2;

let censos = [new Censo("1.111.111-1",PENDIENTE),new Censo("2.222.222-2",PRE_INGRESO),new Censo("3.333.333-3",VALIDADO)];

function cargarDepartamentos() {
    DEPARTAMENTOS.forEach(departamento => {
        document.querySelector("#s_departamento").innerHTML += `<option value="${departamento.toLowerCase()}">${departamento}</option>`;
    });
}

function cargarOcupacion() {
    OCUPACIONES.forEach(ocupacion => {
        document.querySelector("#s_ocupacion").innerHTML += `<option value="${ocupacion.toLowerCase()}">${ocupacion}</option>`;
    });
}

function esNombreValido(nombre) {
    return nombre.length > 0; 
}
function esApellidoValido(apellido) {
    return apellido.length > 0; 
}

function esEdadValida(edad) {
    return EDAD_MINIMA <= edad && edad <= EDAD_MAXIMA;
}

function esDepartamentoValido(departamento) {
    return DEPARTAMENTOS.includes(departamento);
}
function esDepartamentoValido(ocupacion) {
    return OCUPACIONES.includes(ocupacion);
}

function ingresarDatos(cedula) {
    const nombre = document.querySelector("#i_nombre").value,
          apellido = document.querySelector("#i_apellido").value,
          edad = parseInt(document.querySelector("#i_edad").value),
          departamento = document.querySelector("#s_departamento").value,
          ocupacion = document.querySelector("#s_departamento").value;

    if (!esNombreValido(nombre))
        return alert("El nombre no puede estar vac&iacute;o.");
    
    if (!esApellidoValido(apellido))
        return alert("El apellido no puede estar vac&iacute;o.");

    if(!esEdadValida(edad))
        return alert("La edad tiene que estar entre 0 y 130 años.");

    if(!esDepartamentoValido(departamento))
        return alert("El departamento seleccionado no es v&aacute;lido.");

    if(!esOcupacionValida(ocupacion))
        return alert("La ocupaci&oacute;n seleccionada no es v&aacute;lida.");

    let nuevoCenso = new Censo(cedula,VALIDADO,nombre,apellido,edad,departamento,ocupacion);
    censos.push(nuevoCenso);
}

function validarDatos(cedula) {
    alert("PreIngreso");
}

/* ********************************** Validaciones cedula *************************************************** */
function recuperarEstado(cedula) {
    let estado = '';

    censos.forEach(censo => {
        if(censo.cedula === cedula){
            estado = censo.estado;
        }
    });

    return estado;
}

function esValidoDigitoVerificador(cedula) {
    let numeros = cedula.match(/[0-9]/g),
        codigo = [2,9,8,7,6,3,4],
        digitoVerificador = 0;

        for (let i = 0; i < 6; i++) {
            digitoVerificador += parseInt(numeros[i]) * codigo[i];
        }

        digitoVerificador = 10 - (digitoVerificador % 10);

    return digitoVerificador === parseInt(numeros[7]);
}

function esValidoFormatoCedula(cedula) {
    return cedula.match(/[0-9]\.[0-9]{3}\.[0-9]{3}\-[0-9]/g) !== null;
}

function verificarCedula() {
    const i_cedula = document.querySelector("#i_cedula");

    if (!esValidoFormatoCedula(i_cedula.value) || !esValidoDigitoVerificador(i_cedula.value)){
        document.querySelector(".mensaje-error.cedula").innerHTML = `La c&eacute;dula <b>${i_cedula.value}</b> ingresada no es correcta.`;
        i_cedula.value = '';
    }else{
        document.querySelector("main .contenedor-datos").classList.add('activa');
        document.querySelector("main .contenedor-validacion").classList.add('activa');
        i_cedula.setAttribute('disabled',true);
        document.querySelector(".mensaje-error.cedula").innerHTML = '';
        if (recuperarEstado(i_cedula.value) === PENDIENTE || recuperarEstado(i_cedula.value) === ''){
            ingresarDatos(i_cedula.value);
        }else if (recuperarEstado(i_cedula.value) === PRE_INGRESO){
            validarDatos(i_cedula.value);
        }else{
            document.querySelector(".mensaje-error.cedula").innerHTML = `La c&eacute;dula ingresada <b>${i_cedula.value}</b> ya fue censada. Puede ver los datos ingresados debajo.`;
        }
    }
}

function gestionDeEventos() {
    cargarDepartamentos();
    cargarOcupacion();
    document.querySelector("#i_cedula").addEventListener("change",verificarCedula);
}

window.addEventListener("load",gestionDeEventos);
