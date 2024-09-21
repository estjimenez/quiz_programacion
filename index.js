const registro = document.getElementById('registro');
const estudiantesTabla = document.querySelector("#Estudiantes tbody");
const modal = document.getElementById('modal');
const msg2 = document.createElement('div');
msg2.classList.add('msg2');
document.body.appendChild(msg2);

let estudianteAEliminar = null;
const estudiantes = [];

function mostrarMensaje(mensaje, esError = false) {
    msg2.textContent = mensaje;
    msg2.style.color = esError ? 'red' : 'black';
    msg2.style.display = 'block';
    
    setTimeout(() => {
        msg2.style.display = 'none';
    }, 3000);
}

function validarCodigo(codigo) {
    return !estudiantes.some(est => est.codigo === codigo);
}

function calcularDefinitiva(nota1, nota2, nota3, nota4) {
    return ((nota1 * 0.2) + (nota2 * 0.2) + (nota3 * 0.2) + (nota4 * 0.4)).toFixed(2);
}

registro.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const codigo = registro.codigo.value.trim();
    const nombre = registro.nombre.value.trim();
    const nota1 = parseFloat(registro.nota1.value);
    const nota2 = parseFloat(registro.nota2.value);
    const nota3 = parseFloat(registro.nota3.value);
    const nota4 = parseFloat(registro.nota4.value);

    if ([nota1, nota2, nota3, nota4].some(nota => nota < 0 || nota > 5)) {
        mostrarMensaje("Las notas deben estar entre 0 y 5.", true);
        return;
    }

    if (!validarCodigo(codigo)) {
        mostrarMensaje("El código ya existe.", true);
        return;
    }

    const definitiva = calcularDefinitiva(nota1, nota2, nota3, nota4);
    const estado = definitiva >= 3 ? 'A' : 'N';
    
    const estudiante = {
        codigo, nombre, nota1, nota2, nota3, nota4, definitiva, estado
    };
    
    estudiantes.push(estudiante);
    agregarEstudianteATabla(estudiante);
    registro.reset();
});

function agregarEstudianteATabla(estudiante) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><button class="eliminarBtn">Eliminar</button></td>
        <td>${estudiante.codigo}</td>
        <td>${estudiante.nombre}</td>
        <td>${estudiante.nota1}</td>
        <td>${estudiante.nota2}</td>
        <td>${estudiante.nota3}</td>
        <td>${estudiante.nota4}</td>
        <td>${estudiante.definitiva}</td>
        <td>${estudiante.estado}</td>

    `;

    row.querySelector('.eliminarBtn').addEventListener('click', () => {
        estudianteAEliminar = { row, codigo: estudiante.codigo };
        modal.style.display = 'block';
    });

    estudiantesTabla.appendChild(row);
}

document.getElementById('confirmarEliminar').addEventListener('click', () => {
    if (estudianteAEliminar) {
        const index = estudiantes.findIndex(est => est.codigo === estudianteAEliminar.codigo);
        if (index !== -1) {
            estudiantes.splice(index, 1); 
        }
        estudianteAEliminar.row.remove();
        modal.style.display = 'none';
        mostrarMensaje("Estudiante eliminado exitosamente.");
        estudianteAEliminar = null;
    }
});

document.getElementById('cancelarEliminar').addEventListener('click', () => {
    modal.style.display = 'none';
    estudianteAEliminar = null;
});
