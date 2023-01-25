const formularioPDF = document.getElementById('formRegistroAsistencia');
var file = document.getElementById('file');
let arrayIMG = [];
let imgPosition = 0;

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
    img.setAttribute('position',`${imgPosition}`);
    document.getElementById('contenedorIMG').appendChild(img);
    eliminarIMG(imgID);

    let image = await cargarImagen(URL.createObjectURL(file.files[i]));
    arrayIMG.push(image);

}

const eliminarIMG = function(imgID){
    let btnEliminar = document.createElement('div');
    btnEliminar.classList.add('close','btn', 'btn-danger', 'mt-1');
    document.getElementsByClassName(imgID)[0].appendChild(btnEliminar);
    btnEliminar.innerHTML = 'X';
}

async function generarPDF(nomComite, ciudad, horaInicio, horaFin, lugar, direccionGeneral, regional, centroFormacion, agenda, objetivos, conclusiones, actividad, responsable, fecha, arrayIMG){
    const pdf = new jsPDF('p', 'pt', 'letter');

    const imagen1 = await cargarImagen('../assets/img/formato_de_acta_page-0001.jpg');
    const imagen2 = await cargarImagen('../assets/img/formato_de_acta_page-0002.jpg');
    
    pdf.addImage(imagen1, 'PNG', 0, 0, 600, 800);
    
    const pdf2 = pdf.addPage('p','letter');
    pdf2.addImage(imagen2, 'PNG', 0, 0, 600, 800);

    let i = 145;
    let posicion1 = 90;
    arrayIMG.forEach(function(imagen) {
        pdf2.addImage(imagen, 'PNG', posicion1, 405, 140, 80);
        i = i++;
        posicion1 = posicion1 + i;
    });
    
    pdf.save('GD-F-007_Formato_de_Acta.pdf')

}

file.addEventListener('change', function(){
    let files = file.files.length;
    for(let i = 0; i < files; i++){
        let imgID = Math.floor(Math.random() * 30000)+'_'+Date.now();

        crearIMG(file, i, imgID);
        imgPosition++
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

    generarPDF(nomComite, ciudad, horaInicio, horaFin, lugar, direccionGeneral, regional, centroFormacion, agenda, objetivos, conclusiones, actividad, responsable, fecha, arrayIMG);

})

document.body.addEventListener('click', function(e){
    if(e.target.classList.contains('close')){
        e.target.parentNode.remove();
        let positionArray = e.target.parentNode.getAttribute('position');
        delete(arrayIMG[positionArray]);
    }
});