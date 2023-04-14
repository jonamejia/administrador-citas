import Citas from '../clases/Citas.js';
import UI from '../clases/UI.js';
import { mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput,
    sintomasInput,
    formulario } from '../clases/selectores.js'

let editar;



const ui = new UI();
const administracion = new Citas();


//Objeto para guardar los valores de de los inputs
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}

//Agregar los datos al objeto de cita
export function datosCita( e ) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);

}

//Agrega y valida una nueva cita a la clase citas
export function nuevaCita( e ) {
    e.preventDefault();

    //Extraer la informacion del objeto

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //Validar
    if( (mascota === '') || (propietario === '') || (telefono === '') || (fecha === '') || (hora === '') || (sintomas === '')) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    //Modo edicion 
    if(editar) {
        ui.imprimirAlerta('Editado correctamente', 'exito');
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        administracion.editarCita( {...citaObj} );

        editar = false;

    } else {
        //Generamos un id unico a cada elemnto del objeto
        citaObj.id = Date.now();

        //Generamos una copia del objeto y la agregamos al metodo de la clase
        administracion.agregarCita( {...citaObj} );

        //imprimir alerta
        ui.imprimirAlerta('Se ha gregado una cita correctamente!', 'exito');

    }



    //Reinicia objeto
    reiniciarObjeto();
    //Reiniciar formulario
    formulario.reset();
    //mostrar el HTML
    ui.imprimirCita(administracion);

    
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.hora= '';
    citaObj.fecha = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    administracion.eliminarCita(id);

    //imprimir mensaje
    ui.imprimirAlerta('La cita se elimino correctamente', 'exito');

    //reiniciar el html

    ui.imprimirCita(administracion);
}

export function editarCita(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    editar = true;
}

