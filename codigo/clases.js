const MIN_EDAD = 0,
      MAX_EDAD = 130,
      FORMATO_CEDULA = /[0-9]{1}\.[0-9]{3}\.[0-9]{3}\-[0-9]{1}/g,
      PRE_INGRESADO = 1, CENSADO = 2, //Estados de censo
      TOTAL_CENSOS = 3500000;
      CODIGO_VALIDACION = [2,9,8,7,6,3,4];

class Sistema {
    
    constructor(){
        this.censistas = [];
        this.censos = [];
        this.ocupaciones = [];
        this.departamentos = [];
        this.censita_logueado = '';
        this.totalCensos = TOTAL_CENSOS;
        this.cargaValoresInicialesOcupaciones();
        this.cargaValoresInicialesCensos();
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
        this.departamentos.push('default');
        this.departamentos.push('dependiente');
        this.departamentos.push('inependiente');
        this.departamentos.push('estudiante');
        this.departamentos.push('no trabaja');
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
        this.censos.push(new Censo('62125274','Patricio','Estrella',24,'Montevideo','No trabaja'));
        this.censos.push(new Censo('51525358','Bob','Esponja',23,'Montevideo','Dependiente'));
        this.censos.push(new Censo('15550945','Don','Cangrejo',42,'Montevideo','Independiente'));
        this.censos.push(new Censo('60763347','Arenita','Mejillas',26,'Montevideo','Estudiante'));
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
            cedula = this.formatearCedula(cedula);
        
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
        let cedula = this.formatearCedula(cedula);
            estado = this.recuperarEstadoCenso(cedula);

        if (estado === CENSADO) {
            return "La cédula ingresada ya fue censada. Puede ver los datos ingresados debajo."
        }
        else if(estado === PRE_INGRESADO){
            for (let i = 0; i < this.censos.length; i++) {
                if (this.censos[i].cedula === cedula) {
                    this.censos.splice(i,1);
                    return;
                }
            }
        }else{
            return "La cedula ingresada no tiene registros";
        }
    }

    /* Devuelve true, si la cedula no tiene ningun censo registrado en la base de datos*/
    esCensoUnico(cedula){
        cedula = this.formatearCedula(cedula);
        for (let i = 0; i < this.censos.length; i++) {
            if (censos[i].cedula === parseInt(cedula)) {
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
        else if (!preIngreso.esCedulaValida(cedula))
            mensajesError.push({tipo:'cedula', mensaje:"La cédula ingresada no es correcta."});
        else if(!this.esCensoUnico(cedula))
            mensajesError.push({tipo:'cedula', mensaje:"La cédula ingresada ya fue censada. Puede ver los datos ingresados debajo."});
        
        cedula = this.formatearCedula(cedula);
        preIngreso.cedula = cedula;

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
        let mensajesError = [];
        let preIngreso = new Censo(cedula,nombre,apellido,edad,departamento,ocupacion);
        
        if(cedula.length <= 0)
            mensajesError.push({tipo:'cedula', mensaje:"La cedula no puede estar vacia"});
        else if (!preIngreso.esCedulaValida(cedula))
            mensajesError.push({tipo:'cedula', mensaje:"La cédula ingresada no es correcta."});
        else if(!this.esCensoUnico(cedula))
            mensajesError.push({tipo:'cedula', mensaje:"La cédula ingresada ya fue censada. Puede ver los datos ingresados debajo."});
        
        cedula = this.formatearCedula(cedula);
        preIngreso.cedula = cedula;

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
            preIngreso.estado = CENSADO;
            this.censos.push(preIngreso);
            return mensajesError;
        }
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
        let i = 0;

        while(!valido && i < this.departamentos.length){
            if (this.departamentos[i] === departamento){
                return true && departamento !== 'default';
            }
            i++;
        }

        return false ;
    }

    
    /* Devuelve true si la ocupacion ingresada no es vacia y su valor se encuentra entre las habilitadas para el Sistema. En caso contrario retorna false */
    esOcupacionValida(ocupacion){
        let i = 0;

        while(!valido && i < this.ocupaciones.length){
            if (this.ocupaciones[i] === ocupacion){
                return true && departamento !== 'default';
            }
            i++;
        }

        return false; 
    }

    /*Permite reasignar a un censo PRE_INGRESADO el censista que se le asigno al azar.
    El censista asignado no puede ser el mismo que se logueo al sistema, pero el censo debe pertenecer al mismo*/
    reasignarCensista(cedula,usuario_censista){
        if (usuario_censista === this.censita_logueado)
            return "No se puede reasignar al mismo censista logueado.";
        
        cedula = this.formatearCedula(cedula)
        let estado = this.recuperarEstadoCenso(cedula);

        if(estado !== PRE_INGRESADO){
            return "No se pude reasignar un censista a un censo que no esta pre-ingresado, el censo esta:" + 
            estado === 2 ? "Censado" : "Aun sin ingresar al sistema";
        
        }else if (estado === PRE_INGRESADO) {
            this.censos.forEach(censo =>{
                if(censo.cedula === cedula){
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
        cedula = this.formatearCedula(cedula);

        let estado = this.recuperarEstadoCenso(cedula);
        
        if(estado !== PRE_INGRESADO){
            return "No se pude validar a un censo que no esta pre-ingresado, el censo esta:" + 
            estado === 2 ? "Censado" : "Aun sin ingresar al sistema";
        
        }else if (estado === PRE_INGRESADO) {
            this.censos.forEach(censo =>{
                if(censo.cedula === cedula){
                    censo.estado = CENSADO;
                    return '';
                }
            });
        }
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

    /* Devuelve true si la cedula que recibe por parametro (String) no es vacia y tiene un formato valido */
    esCedulaValida(cedula){
        if (cedula.match(FORMATO_CEDULA) === null)
            return false;

        let digitoVerificador = 0;
        for (let i = 0; i <= cedula.length-1; i++) {
            digitoVerificador += cedula[i] * CODIGO_VALIDACION[i]; 
        }
        digitoVerificador = 10 - (digitoVerificador % 10);

        return parseInt(cedula[cedula.length-1]) === digitoVerificador;
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