//Declaración de variables
let codigoDeSeguridad = 2873;
let nombreUsuario = 'Paula Fantín';

let saldoCuenta = 18000;
let limiteExtraccion = 4000;

let agua = 350;
let telefono = 425;
let luz = 210;
let internet = 570;
let nombreDelServicio;

let cuentaAmiga1 = 1234567;
let cuentaAmiga2 = 7654321;

iniciarSesion();

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    let nuevoLimite = promptInt('Ingrese una valor para establecer el nuevo límite de extracción:');
    if (verificarDatoNumerico(nuevoLimite)) {
        if (verificarNoNegativo(nuevoLimite)) {
            limiteExtraccion = nuevoLimite;
            actualizarLimiteEnPantalla();
            alert(`Ha modificado el límite de extracción correctamente.\nSu nuevo límite es de ${nuevoLimite}.`);
        }
    }
}


function extraerDinero() {
    let montoADebitar = promptInt('Ingrese el monto a debitar de su cuenta:');
    const saldoAnterior = saldoCuenta;
    if (verificarDatoNumerico(montoADebitar)) {
        if (haySaldoDisponible(montoADebitar)) {
            if (dentroDelLimite(montoADebitar)) {
                if (multiploDeCien(montoADebitar)) {
                    if (verificarNoNegativo(montoADebitar)) {
                        saldoCuenta = restarDinero(montoADebitar);
                        actualizarSaldoEnPantalla();
                        alert(`Se ha descontado: ${montoADebitar}\nSaldo anterior: ${saldoAnterior}\nSaldo actual: ${saldoCuenta}`);
                    }
                }
                else {
                    alert('Sólo es posible extraer billetes de 100.')
                }
            }
            else {
                alert('No es posible realizar la operación. Excede el  límite de extracción.')
            }
        }
        else {
            alert('No hay saldo suficiente para extraer esa cantidad de dinero.')
        }
    }
}

function depositarDinero() {
    let montoADepositar = promptInt('Ingrese el monto a depositar en su cuenta:');
    const saldoAnterior = saldoCuenta;
    if (verificarDatoNumerico(montoADepositar)) {
        if (verificarNoNegativo(montoADepositar)) {
            saldoCuenta = sumarDinero(montoADepositar);
            actualizarSaldoEnPantalla()
            alert(`Ha depositado: ${montoADepositar}\nSaldo anterior: ${saldoAnterior}\nSaldo actual: ${saldoCuenta}`);
        }
    }
}

function pagarServicio() {
    let servicioSeleccionado = promptInt('Ingrese el número que corresponda al servicio que desea pagar:\n1 - Agua\n2 - Teléfono\n3 - Luz\n4 - Internet');
    if (verificarDatoNumerico(servicioSeleccionado)) {
        switch (servicioSeleccionado) {
            case 1:
                servicioSeleccionado = agua;
                nombreDelServicio = 'Agua';
                pagarServicioElegido(servicioSeleccionado);
                break;
            case 2:
                servicioSeleccionado = telefono;
                nombreDelServicio = 'Teléfono';
                pagarServicioElegido(servicioSeleccionado);
                break;
            case 3:
                servicioSeleccionado = luz;
                nombreDelServicio = 'Luz';
                pagarServicioElegido(servicioSeleccionado);
                break;
            case 4:
                servicioSeleccionado = internet;
                nombreDelServicio = 'Internet';
                pagarServicioElegido(servicioSeleccionado);
                break;
            default:
                alert(`${servicioSeleccionado} no corresponde a ningún servicio de la lista.`)
        }
    }
}

function transferirDinero() {
    let montoATransferir = promptInt('Ingrese el monto de dinero a transferir:');
    if (verificarDatoNumerico(montoATransferir)) {
        if (verificarNoNegativo(montoATransferir)) {
            verificarTransferencia(montoATransferir);
        }
    }

}

function iniciarSesion() {
    let codigoIngresado = promptInt('Ingrese el código de seguridad:');
    if (codigoIngresado === codigoDeSeguridad) {
        alert(`Bienvenido/a ${nombreUsuario}, ya puede operar con su cuenta.`);
    }
    else {
        alert('El código ingresado es incorrecto. Por cuestiones de seguridad, su dinero ha sido retenido.');
        saldoCuenta = 0;
        limiteExtraccion = 0;
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

//Funciones creadas por mí
function sumarDinero(montoADepositar) {
    return saldoCuenta + montoADepositar;
}

function restarDinero(montoADebitar) {
    return saldoCuenta - montoADebitar;
}

function haySaldoDisponible(montoADebitar) {
    return montoADebitar < saldoCuenta;
}
function dentroDelLimite(montoADebitar) {
    return montoADebitar <= limiteExtraccion;
}
function multiploDeCien(montoADebitar) {
    return montoADebitar % 100 === 0;
}
function pagarServicioElegido(servicioSeleccionado) {
    if (saldoCuenta >= servicioSeleccionado) {
        const saldoAnterior = saldoCuenta;
        saldoCuenta = saldoCuenta - servicioSeleccionado;
        alert(`Ha abonado el servicio de ${nombreDelServicio}.\nSaldo anterior: ${saldoAnterior}\nDinero descontado: ${servicioSeleccionado}\nSaldo actual: ${saldoCuenta}.`);
        actualizarSaldoEnPantalla();
    }
    else {
        alert('No dispone de dinero suficiente para abonar este servicio');
    }
}
function verificarTransferencia(montoATransferir) {
    if (saldoCuenta >= montoATransferir) {
        let cuentaIngresada = promptInt('Ingrese el número de la cuenta de destino.');
        if (cuentaIngresada === cuentaAmiga1 || cuentaIngresada === cuentaAmiga2) {
            saldoCuenta = saldoCuenta - montoATransferir;
            alert(`La transferencia se ha realizado correctamente.\nDinero transferido: ${montoATransferir}\nCuenta de destino: ${cuentaIngresada}.`);
            actualizarSaldoEnPantalla();
        }
        else {
            alert('Operación rechazada. Sólo es posible transferir a cuentas amigas.')
        }
    }
    else {
        alert('No es posible transferir el monto de dinero ingresado. Saldo insuficiente.');
    }
}

function verificarDatoNumerico(num) {
    const validacion = Number.isInteger(num);
    if (!validacion) {
        alert('El valor ingresado no es un número.')
    }
    return validacion;
}

function verificarNoNegativo(num) {
    let isNegative = num < 0;
    if (isNegative) {
        alert('No se admiten valores negativos. Por favor, ingrese un monto válido.');
    }
    return !isNegative;
}

function promptInt(message) {
    let isnum = false;
    let input;
    let isEmpty = false;
    while(isnum === false ) {
        input = prompt(message);
        isnum = /-?\d+/.test(input);
        if(input === null || input === '') {
            break;
        }
    }

    return parseInt(input);
}