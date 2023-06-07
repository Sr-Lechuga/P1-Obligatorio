const MIN_EDAD = 0,
      MAX_EDAD = 130,
      FORMATO_CEDULA = /[0-9]{1}\.[0-9]{3}\.[0-9]{3}\-[0-9]{1}/g,
      PRE_INGRESADO = 1, CENSADO = 2;
      

class Sistema {
    
    constructor(){
        this.censistas = [];
        this.censos = [];
        this.ocupaciones = [];
        this.departamentos = ['Montevideo','Canelones','Artigas','Cerro largo','Colonia','Durazno','Flores','Florida','Lavalleja','Maldonado','Paysandu','Rio Negro','Rivera','Rocha','Salto','San Jose','Soriano','Tacuarembo','Treinta y Tres'];
        this.censita_logueado = '';
        this.totalCensos = 3500000;
    }

    /* Valida que los elementos cargado en el selector de departamentos conicidan con los definidos en el array de departamentos */ 
    esValidoSelectorDepartamentos(selector){}

    /* Recupera el estado de un censo a partir de una cedula ingresada */
    recuperarEstadoCenso(cedula){}

    /* Recupera toda la informacion necesaria para mostrar en la pagina de estadisticas completa (devuelve un objeto estadistica) */
    recuperarInformacionEstadisticaCompleta(){}

    /* Recupera toda la informacion necesaria para mostrar en la pagina de estadisticas completa (devuelve un objeto estadistica) */
    recuperarInformacionEstadisticaSimple(){}

    /* Recupera el usuario del censista que esta logueado en el sistema*/
    recuperarCensistaLogueado(){}

    /* Devuelve true, si el censita no esta en la base de datos de censistas*/
    esCensistaUnico(usuario){}

    /* Permite ingresar un nuevo censista al sistema siempre que este no haya sido registrado antes */
    registrarCensista(censista){}

    /* Permite a un censita ingresar al sistema. Sera necesario cotejar sus credenciales con las existentes en el sistema */
    ingresar(usuario,contrasenia){}

    /* Pre-condicion: el censo no puede estar en estado CENSADO 
        Elimina la informacion pre-ingresada por un usuario.
    */
    eliminarInformacionPreIngresada(cedula){}

    /* Devuelve true, si la cedula no tiene ningun censo registrado en la base de datos*/
    esCensoUnico(cedula){}

    /* Pre-condicion: no puede existir un censo en la base de datos con la misma cedula
    Permite a los invitados ingresar la informacion de su censo, para que el censista los valide mas tarde
    */
    preIngresarDatosCenso(censo){}

    /* Pre-condicion: no puede existir un censo en la base de datos con la misma cedula
    Permite a los censistas ingresar la informacion de un censo
    */
    ingresarDatosCenso(censo){}
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
        this.status = '';
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
        this.constrasenia = contrasenia;
    }

    /* Devuelve true si el usuario no esta registrado en la base de datos. Sera indiferente el uso de mayusculas*/
    esUsuarioValido(usuario){}

    /* Devuelve true si la contraseña ingresada cumple con el formato establecido */
    esValidaContraseña(contrasenia){}
}