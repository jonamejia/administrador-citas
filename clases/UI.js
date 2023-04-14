import {eliminarCita, editarCita } from '../clases/funciones.js';
import { contenedorCitas } from '../clases/selectores.js';

class UI {

    imprimirAlerta(mensaje, tipo) {
        const alertaDiv = document.createElement('div');
        alertaDiv.classList.add('alert', 'd-block', 'text-center', 'col-12');

        if( tipo === 'error') {
            alertaDiv.classList.add('alert-danger');
        } else {
            alertaDiv.classList.add('alert-success');
        }

        alertaDiv.textContent = mensaje;
        document.querySelector('#contenido').insertBefore (alertaDiv, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            alertaDiv.remove();
        }, 3000);
        
    }

    imprimirCita( { citas } ) {
        this.limpiarHtml();

        citas.forEach( cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scrpting de los elemntos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight"> Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight"> Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight"> Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight"> Hora: </span> ${hora}
            `;

            const sintomaParrafo = document.createElement('p');
            sintomaParrafo.innerHTML = `
                <span class="font-weight"> Sintomas: </span> ${sintomas}
            `;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar cita <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
          </svg>
          `;
          btnEliminar.onclick = () => eliminarCita(id);


          const btnEditar = document.createElement('button');
          btnEditar.classList.add('btn', 'btn-info');
          btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
        </svg>
        `;
        btnEditar.onclick = () => editarCita(cita);

            //AGregar el parrafo a divCita 
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomaParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);
            
            //Agregar al contenedor
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHtml() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }

}

export default UI;