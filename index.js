const registro = document.getElementById('registro');
const msg = document.getElementById("msg");
const estudiantesTabla = document.querySelector("#Estudiantes");
const modal = document.getElementById('modal');
let estudianteAEliminar = null;

const estudiantes = [];

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
        msg.textContent = "Las notas deben estar entre 0 y 5.";
        return;
    }

    if (!validarCodigo(codigo)) {
        msg.textContent = "El código ya existe.";
        return;
    }

    const definitiva = calcularDefinitiva(nota1, nota2, nota3, nota4);
    const estado = definitiva >= 3 ? 'A' : 'N';
    
    const estudiante = {
        codigo, nombre, nota1, nota2, nota3, nota4, definitiva, estado
    };
    
    estudiantes.push(estudiante);
    agregarEstudianteATabla(estudiante);
    formulario.reset();
    msg.textContent = "";
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
        estudianteAEliminar = row;
        modal.style.display = 'block';
    });

    estudiantesTabla.appendChild(row);
}

document.getElementById('confirmarEliminar').addEventListener('click', () => {
    if (estudianteAEliminar) {
        estudianteAEliminar.remove();
        modal.style.display = 'none';
        estudianteAEliminar = null;
    }
});

document.getElementById('cancelarEliminar').addEventListener('click', () => {
    modal.style.display = 'none';
    estudianteAEliminar = null;
});
