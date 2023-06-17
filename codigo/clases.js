const MIN_EDAD = 0,
      MAX_EDAD = 130,
      FORMATO_CEDULA = /([0-9]{1}\.[0-9]{3}\.[0-9]{3}-[0-9]{1}|[0-9]{7}-[0-9]|[0-9]{8})/g,
      PRE_INGRESADO = '1', CENSADO = '2', //Estados de censo
      TOTAL_CENSOS = 3500000;
      CODIGO_VALIDACION = [2,9,8,7,6,3,4];

class Sistema {
    
    constructor(){
        this.censistas = [];
        this.ocupaciones = [];
        this.departamentos = [];
        this.censita_logueado = '';
        this.censos = [];
        this.totalCensos = TOTAL_CENSOS;
        this.PRE_INGRESADO = PRE_INGRESADO;
        this.CENSADO = CENSADO;
        this.cargaValoresInicialesOcupaciones();
        this.cargaValoresInicialesDepartamentos();
        this.cargaValoresInicialesCensistas();
        this.cargaValoresInicialesCensos();
    }

    /* Agrega todos los valores disponibles para la base de datos de los departamentos*/
    cargaValoresInicialesDepartamentos(){
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
    cargaValoresInicialesOcupaciones(){
        this.ocupaciones.push('default');
        this.ocupaciones.push('dependiente');
        this.ocupaciones.push('independiente');
        this.ocupaciones.push('estudiante');
        this.ocupaciones.push('no trabaja');
    }

    /* Carga los valores inciales para los censitas registrados en el sistema*/
    cargaValoresInicialesCensistas(){
        this.censistas.push(new Censista('Solomeo','sparedes','Contrasenia1'));
        this.censistas.push(new Censista('Armando','abanquito','Contrasenia2'));
        this.censistas.push(new Censista('Jimmy','jneutron','Contrasenia3'));
        this.censistas.push(new Censista('Pedro','ppicapiedras','Contrasenia4'));
        this.censistas.push(new Censista('Sirius','sblack','Contrasenia5'));
        this.censistas.push(new Censista('Marcia','mnito','Contrasenia6'));
    }

    /* Carga los valores inciales para los censos registrados en el sistema*/
    cargaValoresInicialesCensos(){
        this.preIngresarDatosCenso('6.212.527-4','Patricio','Estrella',24,'montevideo','no trabaja');
        this.censos[0].censista_asignado = 'sparedes';
        this.preIngresarDatosCenso('5.152.535-8','Bob','Esponja',23,'montevideo','dependiente');
        this.censos[1].censista_asignado = 'sparedes';
        this.ingresarDatosCenso('1.555.094-5','Don','Cangrejo',42,'montevideo','independiente');
        this.ingresarDatosCenso('6.076.334-7','Arenita','Mejillas',26,'montevideo','estudiante');
    }

    /* Toma una cedula y la formatea para que coincida con el requerido por el sistema*/
    formatearCedula(cedula){
        let cedulaFormateada = '';
        for (let i = 0; i < cedula.length; i++) {
            if (cedula[i].match(/[0-9]/) !== null) {
                cedulaFormateada += cedula[i]; 
            }
        }
        return cedulaFormateada;
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
            estado = '',
            cedulaFormateada = this.formatearCedula(cedula);
        
        while (!encontrado && i < this.censos.length) {

            encontrado = this.censos[i].cedula === cedulaFormateada;

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
    esIngresoSistemaValido(usuario,contrasenia){
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
    eliminarInformacionPreIngresada(cedula){
        let cedulaFormateada = this.formatearCedula(cedula),
            estado = this.recuperarEstadoCenso(cedulaFormateada);

        if (estado === CENSADO) {
            return "La cédula ingresada ya fue censada. Puede ver los datos ingresados debajo."
        }
        else if(estado === PRE_INGRESADO){
            for (let i = 0; i < this.censos.length; i++) {
                if (this.censos[i].cedula === cedulaFormateada) {
                    this.censos.splice(i,1);
                    return '';
                }
            }
        }else{
            return "La cedula ingresada no tiene registros";
        }
    }

    /* Devuelve true, si la cedula no tiene ningun censo registrado en la base de datos*/
    esCensoUnico(cedula){
        let cedulaFormateada = this.formatearCedula(cedula);

        for (let i = 0; i < this.censos.length; i++) {
            if (this.censos[i].cedula === parseInt(cedulaFormateada)) {
                return false
            }
        }
        return true;
    }

    /* Pre-condicion: no puede existir un censo en la base de datos con la misma cedula
    Permite a los invitados ingresar la informacion de su censo, para que el censista los valide mas tarde
    */
    preIngresarDatosCenso(cedula,nombre,apellido,edad,departamento,ocupacion){
        let mensajesError = [];
        let preIngreso = new Censo(cedula,nombre,apellido,edad,departamento,ocupacion);
        
        if(cedula.length <= 0)
            mensajesError.push({tipo:'cedula', mensaje:"La cedula no puede estar vacia"});
        else if (!this.esCedulaValida(cedula))
            mensajesError.push({tipo:'cedula', mensaje:"La cédula ingresada no es correcta."});
        else if(!this.esCensoUnico(cedula))
            mensajesError.push({tipo:'cedula', mensaje:"La cédula ingresada ya fue censada. Puede ver los datos ingresados debajo."});
        
        let cedulaFormateada = this.formatearCedula(cedula);
        preIngreso.cedula = cedulaFormateada;

        if(!preIngreso.esNombreValido(nombre))
            mensajesError.push({tipo:'nombre', mensaje:"El nombre no puede estar vacío."});

        if(!preIngreso.esApellidoValido(apellido))
            mensajesError.push({tipo:'apellido', mensaje:"El apellido no puede estar vacío."});

        if(!preIngreso.esEdadValida(edad))
            mensajesError.push({tipo:'edad', mensaje:`La edad tiene que estar entre ${MIN_EDAD} y ${MAX_EDAD} años inclusive.`});

        if(!this.esDepartamentoValido(departamento))
            mensajesError.push({tipo:'departamento', mensaje:"El departamento seleccionado no es valido."});

        if(!this.esOcupacionValida(ocupacion))
            mensajesError.push({tipo:'ocupacion', mensaje:"La ocupación seleccionada no es válida."});

        /* Si hay errores */
        if(mensajesError.length > 0){
            return mensajesError;
        /* Si no hay errores*/
        }else{
            let indexCensista = Math.floor(Math.random() * this.censistas.length);
            preIngreso.censista_asignado = this.censistas[indexCensista].usuario;
            preIngreso.estado = PRE_INGRESADO;
            this.censos.push(preIngreso);
            return mensajesError;
        }
    }

    /* Pre-condicion: no puede existir un censo en la base de datos con la misma cedula
    Permite a los censistas ingresar la informacion de un censo
    */
    ingresarDatosCenso(cedula,nombre,apellido,edad,departamento,ocupacion){
        let mensajesError = [],
            preIngreso = new Censo(cedula,nombre,apellido,edad,departamento,ocupacion);
        
        if(cedula.length <= 0)
            mensajesError.push({tipo:'cedula', mensaje:"La cedula no puede estar vacia"});
        else if (!this.esCedulaValida(cedula))
            mensajesError.push({tipo:'cedula', mensaje:"La cédula ingresada no es correcta."});
        else if(!this.esCensoUnico(cedula))
            mensajesError.push({tipo:'cedula', mensaje:"La cédula ingresada ya fue censada. Puede ver los datos ingresados debajo."});
        
        let cedulaFormateada = this.formatearCedula(cedula);
        preIngreso.cedula = cedulaFormateada;

        if(!preIngreso.esNombreValido(nombre))
            mensajesError.push({tipo:'nombre', mensaje:"El nombre no puede estar vacío."});

        if(!preIngreso.esApellidoValido(apellido))
            mensajesError.push({tipo:'apellido', mensaje:"El apellido no puede estar vacío."});

        if(!preIngreso.esEdadValida(edad))
            mensajesError.push({tipo:'edad', mensaje:`La edad tiene que estar entre ${MIN_EDAD} y ${MAX_EDAD} años inclusive.`});
        else if(edad === '')
            mensajesError.push({tipo:'edad', mensaje:`La edad no puede ser vacia.`});

        if(!this.esDepartamentoValido(departamento))
            mensajesError.push({tipo:'departamento', mensaje:"El departamento seleccionado no es valido."});

        if(!this.esOcupacionValida(ocupacion))
            mensajesError.push({tipo:'ocupacion', mensaje:"La ocupación seleccionada no es válida."});

        /* Si hay errores */
        if(mensajesError.length > 0){
            return mensajesError;
        /* Si no hay errores*/
        }else{
            preIngreso.estado = CENSADO;
            this.censos.push(preIngreso);
            return mensajesError;
        }
    }
    
    /* Asignar un censista al censo si no fue pre-asignado */
    asignarCensista(cedula,usuario){
        let indice = this.recuperarIndiceCenso(cedula);
        this.censos[indice].censista_asignado = usuario; 
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

    /* Devuelve true si el departamento ingresado no es el valor default y se encuentra entre los departamentos habilitados. En caso contrario devuelve false */
    esDepartamentoValido(departamento){
        let i = 0,
            valido = false;

        while(!valido && i < this.departamentos.length){
            if (this.departamentos[i] === departamento){
                return true && departamento !== 'default';
            }
            i++;
        }

        return valido ;
    }
    
    /* Devuelve true si la ocupacion ingresada no es vacia y su valor se encuentra entre las habilitadas para el Sistema. En caso contrario retorna false */
    esOcupacionValida(ocupacion){
        let i = 0,
            valido = false;

        while(!valido && i < this.ocupaciones.length){
            if (this.ocupaciones[i] === ocupacion){
                return true && ocupacion !== 'default';
            }
            i++;
        }

        return valido; 
    }

    /*Permite reasignar a un censo PRE_INGRESADO el censista que se le asigno al azar.
    El censista asignado no puede ser el mismo que se logueo al sistema, pero el censo debe pertenecer al mismo*/
    reasignarCensista(cedula,usuario_censista){
        if (usuario_censista === this.censita_logueado)
            return "No se puede reasignar al mismo censista logueado.";
        
        let cedulaFormateada = this.formatearCedula(cedula),
            estado = this.recuperarEstadoCenso(cedulaFormateada);

        if(estado !== PRE_INGRESADO){
            return "No se pude reasignar un censista a un censo que no esta pre-ingresado, el censo esta:" + 
            estado === 2 ? "Censado" : "Aun sin ingresar al sistema";
        
        }else if (estado === PRE_INGRESADO) {
            this.censos.forEach(censo =>{
                if(censo.cedula === cedulaFormateada){
                    censo.censista_asignado = usuario_censista;
                    return '';
                }
            });
        }
    }

    /* Permite a un usuario con perfil de censista, validar la informacion pre ingresada por un invitado. 
        En caso de error devuelve un mensaje definiendo el problema
    */
    validarPreIngresado(cedula){
        let cedulaFormateada = this.formatearCedula(cedula),
            estado = this.recuperarEstadoCenso(cedulaFormateada);

        if(estado !== PRE_INGRESADO){
            return "No se pude validar a un censo que no esta pre-ingresado, el censo esta:" + 
            estado === 2 ? "Censado" : "Aun sin ingresar al sistema";
        
        }else if (estado === PRE_INGRESADO) {
            this.censos.forEach(censo =>{
                if(censo.cedula === cedulaFormateada){
                    censo.estado = CENSADO;
                    return '';
                }
            });
        }
    }

    /* Devuelve true si la cedula que recibe por parametro (String) no es vacia y tiene un formato valido */
    esCedulaValida(cedula){
        if (cedula.match(FORMATO_CEDULA) === null)
            return false;

        let cedulaFormateada = this.formatearCedula(cedula);

        /*Si la cedula no tiene millones el 0 se considera como 0*/
        if (cedulaFormateada.length === 7) {
            cedulaFormateada.unshift('0');
        }

        let digitoVerificador = 0;

        for (let i = 0; i < cedulaFormateada.length-1; i++) {
            digitoVerificador += cedulaFormateada[i] * CODIGO_VALIDACION[i]; 
        }
        digitoVerificador = 10 - (digitoVerificador % 10);

        return parseInt(cedulaFormateada[cedulaFormateada.length-1]) === digitoVerificador;
    }

    /*Recupera el indice del censo deseado con el numero de cedula requerido*/
    recuperarIndiceCenso(cedula){
        let cedulaFormateada = this.formatearCedula(cedula);

        for (let i = 0; i < this.censos.length; i++) {
            if (this.censos[i].cedula === cedulaFormateada) 
                return i;
        }
        return -1;
    }

    /*Recupera el indice del censo deseado con el numero de cedula requerido*/
    recuperarNombreCensista(usuario){

        for (let i = 0; i < this.censistas.length; i++) {
            if (this.censistas[i].usuario === usuario) 
                return this.censistas[i].nombre;
        }

        return '';
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
        this.ultima_modificacion = new Date().toUTCString();
    }

    /* Recibe un string con el nombre y devuelve true si el nombre no es vacio. En caso contrario false */
    esNombreValido(nombre){
        return nombre.length > 0;
    }

    /* Recibe un string con el apellido y devuelve true si el nombre no es vacio. En caso contrario false */
    esApellidoValido(apellido){
        return apellido.length > 0;
    }

    /* Recibe un entero, y devuelve true si este esta entre MIN_EDAD y MAX_EDAD inclusive. En caso contrario devuelve false */
    esEdadValida(edad){
        return MIN_EDAD <= edad && edad <= MAX_EDAD;
    }

    actualizarUltimaModificacion(){
        this.ultima_modificacion = new Date().toUTCString();
    }
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