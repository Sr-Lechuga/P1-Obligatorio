const MIN_EDAD = 0,
      MAX_EDAD = 130,
      FORMATO_CEDULA = /[0-9]{1}\.[0-9]{3}\.[0-9]{3}\-[0-9]{1}/g,
      PRE_INGRESADO = 1, CENSADO = 2, //Estados de censo
      TOTAL_CENSOS = 3500000;

class Sistema {
    
    constructor(){
        this.censistas = [];
        this.censos = [];
        this.ocupaciones = [];
        this.departamentos = [];
        this.censita_logueado = '';
        this.totalCensos = TOTAL_CENSOS;
        this.preCargarDepartamentos();
        this.preCargarOcupaciones();
    }

    /* Agrega todos los valores disponibles para la base de datos de los departamentos*/
    preCargarDepartamentos(){
        this.departamentos.push('default');
        this.departamentos.push('montevideo');
        this.departamentos.push('canelones');
        this.departamentos.push('cerro largo');
        this.departamentos.push('colonia');
        this.departamentos.push('durazno');
        this.departamentos.push('flores');
        this.departamentos.push('florida');
        this.departamentos.push('lavalleja');
        this.departamentos.push('maldonado');
        this.departamentos.push('paysandu');
        this.departamentos.push('rio negro');
        this.departamentos.push('rivera');
        this.departamentos.push('rocha');
        this.departamentos.push('salto');
        this.departamentos.push('san jose');
        this.departamentos.push('soriano');
        this.departamentos.push('tacuarembo');
        this.departamentos.push('treinta y tres');
    }

    /* Agrega todos los valores disponibles para la base de datos de las ocupaciones*/
    preCargarOcupaciones(){
        this.departamentos.push('default');
        this.departamentos.push('dependiente');
        this.departamentos.push('inependiente');
        this.departamentos.push('estudiante');
        this.departamentos.push('no trabaja');
    }

    /* Carga los valores inciales para los censitas registrados en el sistema*/
    preCargarCensistas(){
        this.censistas.push(new Censista('Solomeo','sparedes','Contrasenia1'));
        this.censistas.push(new Censista('Armando','abanquito','Contrasenia2'));
        this.censistas.push(new Censista('Jimmy','jneutron','Contrasenia3'));
        this.censistas.push(new Censista('Pedro','ppicapiedras','Contrasenia4'));
        this.censistas.push(new Censista('Sirius','sblack','Contrasenia5'));
        this.censistas.push(new Censista('Marcia','mnito','Contrasenia6'));
    }

    /* Valida que los elementos cargado en el selector de departamentos conicidan con los definidos en el array de departamentos */ 
    esValidoSelectorDepartamentos(opciones_de_departamentos){
        let valido = true,
            i = 0;

        while (valido && i < opciones_de_departamentos.length) {
            /* Si encuentra que un elemento no pertenece al array de departamentos pre-cargado, devuelve false */
            valido = !this.departamentos.includes(opciones_de_departamentos[i]);
            i++;
        }

        return valido;
    }

    /* Recupera el estado de un censo a partir de una cedula ingresada */
    recuperarEstadoCenso(cedula){
        let encontrado = false,
            i = 0,
            estado = '';

        while (!encontrado && i < this.censos.length) {

            encontrado = this.censos[i].cedula === cedula;

            if (encontrado) 
                estado = this.censos[i].estado;

            i++;
        }

        return estado;
    }

    /* Recupera toda la informacion necesaria para mostrar en la pagina de estadisticas completa (devuelve un objeto estadistica) */
    recuperarInformacionEstadisticaCompleta(){}

    /* Recupera toda la informacion necesaria para mostrar en la pagina de estadisticas completa (devuelve un objeto estadistica) */
    recuperarInformacionEstadisticaSimple(){}

    /* Recupera el usuario del censista que esta logueado en el sistema*/
    recuperarCensistaLogueado(){
        return this.censita_logueado;
    }

    /* Devuelve true, si el censita no esta en la base de datos de censistas*/
    esCensistaUnico(usuario){
        let encontrado = false,
        i = 0;

        while (!encontrado && i < this.censistas.length) {
            encontrado = this.censistas[i].usuario === usuario;
            i++;
        }

        return encontrado;
    }

    /* Permite ingresar un nuevo censista al sistema siempre que este no haya sido registrado antes */
    registrarCensista(nombre,usuario,contrsasenia){
        let nuevoCensista = new Censista(nombre,usuario.toLowerCase(),contrsasenia),
            mensajesError = [];

        if (nuevoCensista.esNombreVacio(nombre))
            mensajesError.push({tipo:'nombre', mensaje:"Ingrese un nombre, el campo no puede ser vacío."});

        if (nuevoCensista.esUsuarioVacio(usuario)) 
            mensajesError.push({tipo:'usuario', mensaje:"Ingrese un usuario, el campo no puede ser vacío."});
        else if (!this.esUsuarioValido(usuario.toLowerCase()))
            mensajesError.push({tipo:'usuario', mensaje:"Ya existe un usuario con ese nombre. Intente nuevamente con uno nuevo."});

        if(!nuevoCensista.esContraseniaValida(contrsasenia))
            mensajesError.push({tipo:'contrasenia', mensaje:"Contraseña invalida. Debe tener al menos 5 caracteres y contener 1 mayúscula, 1 minúscula y un número."});
        
        if (mensajesError.length === 0){
            this.censistas.push(nuevoCensista);
        }

        return mensajesError;
    }

    /* Permite a un censita ingresar al sistema. Sera necesario cotejar sus credenciales con las existentes en el sistema */
    esIngresoValido(usuario,contrasenia){
        let encontrado = false,
        i = 0;

        while (!encontrado && i < this.censistas.length) {
            if (this.censistas[i].usuario === usuario.toLowerCase() && this.censistas[i].contrasenia === contrasenia){
                return true;
            }
            i++;
        }

        return false;
    }

    /* Pre-condicion: el censo no puede estar en estado CENSADO 
        Elimina la informacion pre-ingresada por un usuario.
    */
    eliminarInformacionPreIngresada(cedula){}

    /* Devuelve true, si la cedula no tiene ningun censo registrado en la base de datos*/
    esCensoUnico(cedula){}

    /* Pre-condicion: no puede existir un censo en la base de datos con la misma cedula
    Permite a los invitados ingresar la informacion de su censo, para que el censista los valide mas tarde
    */
    preIngresarDatosCenso(cedula){}

    /* Pre-condicion: no puede existir un censo en la base de datos con la misma cedula
    Permite a los censistas ingresar la informacion de un censo
    */
    ingresarDatosCenso(cedula){}

    /* Carga los valores inciales para los censos registrados en el sistema*/
    cargaValoresInicialesCensos(){
        
    }
    
    /* Devuelve true si el usuario no esta registrado en la base de datos. Sera indiferente el uso de mayusculas*/
    esUsuarioValido(usuario){
        let valido = true,
            i = 0;

        while (i < this.censistas.length && valido) {
            if (this.censistas[i].usuario === usuario) {
                valido = false;
            }
            i++;
        }

        return valido;
    }
}

class Censo {

    constructor(cedula,nombre,apellido,edad,departamento,ocupacion){
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.departamento = departamento;
        this.ocupacion = ocupacion;
        /*Campos con valores default*/
        this.censista_asignado = '';
        this.estado = '';
    }

    /* Recibe un string con el nombre y devuelve true si el nombre no es vacio. En caso contrario false */
    esNombreValido(nombre){}

    /* Recibe un string con el apellido y devuelve true si el nombre no es vacio. En caso contrario false */
    esApellidoValido(apellido){}

    /* Recibe un entero, y devuelve true si este esta entre MIN_EDAD y MAX_EDAD inclusive. En caso contrario devuelve false */
    esEdadValida(edad){}

    /* Devuelve true si la cedula que recibe por parametro (String) no es vacia y tiene un formato valido */
    esCedulaValida(cedula){}

    /* Devuelve true si el departamento ingresado no es el valor default y se encuentra entre los departamentos habilitados. En caso contrario devuelve false */
    esDepartamentoValido(departamento){}

    /* Devuelve true si la ocupacion ingresada no es vacia y su valor se encuentra entre las habilitadas para el Sistema. En caso contrario retorna false */
    esOcupacionValida(ocupacion){}

    /*Permite reasignar a un censo PRE_INGRESADO el censista que se le asigno al azar.
      El censista asignado no puede ser el mismo que se logueo al sistema, pero el censo debe pertenecer al mismo*/
    reasignarCensista(cedula,usuario_censista){}

    /* Permite a un usuario con perfil de censista, validar la informacion pre ingresada por un invitado. */
    validarPreIngresado(cedula){}
}

class Censista {

    constructor(nombre,usuario,contrasenia){
        this.nombre = nombre;
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }

    /* Devuelve true si la contraseña ingresada cumple con el formato establecido. En caso contrario devuelva false*/
    esContraseniaValida(contrasenia){
        
        let formato_correcto = 5 <= contrasenia.length; //Al menos 5 caracteres
        formato_correcto = formato_correcto && contrasenia.match(/[A-Z]/g) !== null; //Contiene mayuscula
        formato_correcto = formato_correcto && contrasenia.match(/[a-z]/g) !== null; //Contiene minuscula
        formato_correcto = formato_correcto && contrasenia.match(/[0-9]/g) !== null; //Contiene numero

        return formato_correcto;
    }
    /* Devuelve true si el nombre ingresado esta vacio. En caso contrario devuelva false*/
    esNombreVacio(nombre){
        return nombre.length <= 0;
    }

    /* Devuelve true si el usuario ingresado esta vacio. En caso contrario devuelva false*/
    esUsuarioVacio(usuario){
        return usuario.length <= 0;
    }
}