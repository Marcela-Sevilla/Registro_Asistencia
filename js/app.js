const formularioPDF = document.getElementById('formRegistroAsistencia');
var file = document.getElementById('file');

function cargarImagen(url){

    return new Promise(resolve => {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url , true);
        xhr.responseType = 'blob';
        xhr.onload = function (e){

            const leer = new FileReader();
            leer.onload = function (event){
                const resultado = event.target.result;
                resolve(resultado);
            }
            const archivo = this.response;
            leer.readAsDataURL(archivo);

        }
        xhr.send();

    });

}

async function crearIMG(file, i, imgID){
    let img = document.createElement('div');
    img.classList.add('img','col-2','mx-1','mb-1',imgID);
    img.dataset.id = imgID;
    img.setAttribute('style',`background-image: url(${URL.createObjectURL(file.files[i])});`);
    document.getElementById('contenedorIMG').appendChild(img);
    eliminarIMG(imgID);

}

const eliminarIMG = function(imgID){
    let btnEliminar = document.createElement('div');
    btnEliminar.classList.add('close','btn', 'btn-danger', 'mt-1');
    document.getElementsByClassName(imgID)[0].appendChild(btnEliminar);
    btnEliminar.innerHTML = 'X';
}

async function generarPDF(nomComite, ciudad, horaInicio, horaFin, lugar, direccionGeneral, regional, centroFormacion, agenda, objetivos, conclusiones, actividad, responsable, fecha, formFileMultiple){
    
    const imagen = await cargarImagen('../assets/img/acta_registro_asistencia.jpg');
    
    const pdf = new jsPDF('p', 'pt', 'letter');

    pdf.addImage(imagen, 'PNG', 0, 0, 570, 800);
    
    pdf.save('example.pdf')

}

file.addEventListener('change', function(){
    let files = file.files.length;
    for(let i = 0; i < files; i++){
        let imgID = Math.floor(Math.random() * 30000)+'_'+Date.now();

        crearIMG(file, i, imgID);
    }
});

formularioPDF.addEventListener('submit', (e)=>{
    e.preventDefault();

    let nomComite = document.getElementById('nomComite').value;
    let ciudad = document.getElementById('ciudad').value;
    let horaInicio = document.getElementById('horaInicio').value;
    let horaFin = document.getElementById('horaFin').value;
    let lugar = document.getElementById('lugar').value;
    let direccionGeneral = document.getElementById('direccionGeneral').value;
    let regional = document.getElementById('regional').value;
    let centroFormacion = document.getElementById('centroFormacion').value;
    let agenda = document.getElementById('agenda').value;
    let objetivos = document.getElementById('objetivos').value;
    let conclusiones = document.getElementById('conclusiones').value;
    let actividad = document.getElementById('actividad').value;
    let responsable = document.getElementById('responsable').value;
    let fecha = document.getElementById('fecha').value;

    // generarPDF(nomComite, ciudad, horaInicio, horaFin, lugar, direccionGeneral, regional, centroFormacion, agenda, objetivos, conclusiones, actividad, responsable, fecha, formFileMultiple);
})

document.body.addEventListener('click', function(e){
    if(e.target.classList.contains('close')){
        e.target.parentNode.remove();
    }
});