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
    img.classList.add('img','col-3','col-md-2','mx-1','mb-1',imgID);
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

async function generarPDF(nomComite, ciudadFecha, horaInicio, horaFin, lugar, lugarFormacion, agenda, objetivos, desrrolloReunion, conclusiones, actividad, responsable, fechaActividad, arrayIMG){
    const pdf = new jsPDF('p', 'pt', 'letter');
    const imagen1 = await cargarImagen('../assets/img/formato_de_acta_page-0001.jpg');
    const imagen2 = await cargarImagen('../assets/img/formato_de_acta_page-0002.jpg');
    
    pdf.setFontSize(11);
    pdf.setFont('arial');
    pdf.addImage(imagen1, 'PNG', 0, 0, 600, 800);
    pdf.text(nomComite, 90, 135);
    pdf.text(ciudadFecha, 90, 180);
    pdf.text(horaInicio, 340, 180);
    pdf.text(horaFin, 435, 180);
    pdf.text(lugar, 90, 220);
    pdf.text(lugarFormacion, 340, 230);
    pdf.text(agenda, 100, 290);
    pdf.text(objetivos, 100, 430);
    pdf.text(desrrolloReunion, 100, 580);

    const pdf2 = pdf.addPage('p','letter');
    pdf2.addImage(imagen2, 'PNG', 0, 0, 600, 800);
    pdf2.text(conclusiones, 100, 100);
    pdf2.text(actividad, 100, 250);
    pdf2.text(responsable, 345, 250);
    pdf2.text(fechaActividad, 450, 250);

    let i = 0
    arrayIMG.forEach(function(imagen) {
        switch(i){
            case 0:
                pdf2.addImage(imagen, 'PNG', 90, 420, 140, 90)
            break;
            case 1:
                pdf2.addImage(imagen, 'PNG', 235, 420, 140, 90)
            break;
            case 2:
                pdf2.addImage(imagen, 'PNG', 380, 420, 140, 90);
            break;
            case 3:
                pdf2.addImage(imagen, 'PNG', 90, 515, 140, 90)
            break;
            case 4:
                pdf2.addImage(imagen, 'PNG', 235, 515, 140, 90)
            break;
            case 5:
                pdf2.addImage(imagen, 'PNG', 380, 515, 140, 90);
            break;
            case 6:
                pdf2.addImage(imagen, 'PNG', 90, 610, 140, 90)
            break;
            case 7:
                pdf2.addImage(imagen, 'PNG', 235, 610, 140, 90)
            break;
            case 8:
                pdf2.addImage(imagen, 'PNG', 380, 610, 140, 90);
            break;
        }
    
        i++
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

    let nomComite = document.getElementById('nomComite').value.toUpperCase();
    let ciudadFecha = `${document.getElementById('ciudad').value.toUpperCase()} ${document.getElementById('fecha').value}`;
    let horaInicio = document.getElementById('horaInicio').value;
    let horaFin = document.getElementById('horaFin').value;
    let lugar = document.getElementById('lugar').value;

    if (lugar.length > 37){
        lugar = `${lugar.slice(0, 38)}\n${lugar.slice(38, 76)}\n${lugar.slice(76, 114)}\n${lugar.slice(114, 152)}`;
    }

    let direccionGeneral = document.getElementById('direccionGeneral').value;
    let regional = document.getElementById('regional').value;
    let centroFormacion = document.getElementById('centroFormacion').value;
    let lugarFormacion = `${direccionGeneral.toLowerCase()} /\n${regional.toLowerCase()} /\n${centroFormacion.toLowerCase()}`;

    let agenda = document.getElementById('agenda').value;
    if(agenda.length > 80){
        agenda = `${agenda.slice(0, 75)}\n${agenda.slice(75, 150)}\n${agenda.slice(150, 225)}\n${agenda.slice(225, 300)}\n${agenda.slice(300, 375)}\n${agenda.slice(375, 450)}\n${agenda.slice(450, 525)}\n${agenda.slice(525, 600)}`;
    }

    let objetivos = document.getElementById('objetivos').value;
    if(objetivos.length > 80){
        objetivos = `${objetivos.slice(0, 75)}\n${objetivos.slice(75, 150)}\n${objetivos.slice(150, 225)}\n${objetivos.slice(225, 300)}\n${objetivos.slice(300, 375)}\n${objetivos.slice(375, 450)}\n${objetivos.slice(450, 525)}\n${objetivos.slice(525, 600)}`;
    }

    let desrrolloReunion = document.getElementById('desrrolloReunion').value;
    if(desrrolloReunion.length > 80){
        desrrolloReunion = `${desrrolloReunion.slice(0, 75)}\n${desrrolloReunion.slice(75, 150)}\n${desrrolloReunion.slice(150, 225)}\n${desrrolloReunion.slice(225, 300)}\n${desrrolloReunion.slice(300, 375)}\n${desrrolloReunion.slice(375, 450)}\n${desrrolloReunion.slice(450, 525)}\n${desrrolloReunion.slice(525, 600)}`;
    }

    let conclusiones = document.getElementById('conclusiones').value;
    if(conclusiones.length > 80){
        conclusiones = `${conclusiones.slice(0, 75)}\n${conclusiones.slice(75, 150)}\n${conclusiones.slice(150, 225)}\n${conclusiones.slice(225, 300)}\n${conclusiones.slice(300, 375)}\n${conclusiones.slice(375, 450)}\n${conclusiones.slice(450, 525)}\n${conclusiones.slice(525, 600)}`;
    }

    let actividad = document.getElementById('actividad').value;
    if(actividad.length > 40){
        actividad = `${actividad.slice(0, 40)}\n${actividad.slice(40, 80)}\n${actividad.slice(80, 120)}\n${actividad.slice(120, 160)}\n${actividad.slice(160, 200)}\n${actividad.slice(200, 240)}\n${actividad.slice(240, 280)}\n${actividad.slice(280, 320)}\n${actividad.slice(320, 360)}\n${actividad.slice(360, 400)}`;
    }
    let responsable = document.getElementById('responsable').value.toUpperCase();
    if(responsable.length > 10){
        responsable = `${responsable.slice(0, 10)}\n${responsable.slice(10, 20)}\n${responsable.slice(20, 30)}\n${responsable.slice(30, 40)}\n${responsable.slice(40, 50)}\n${responsable.slice(50, 60)}`;
    }
    let fechaActividad = document.getElementById('fechaActividad').value;

    generarPDF(nomComite, ciudadFecha, horaInicio, horaFin, lugar, lugarFormacion, agenda, objetivos, desrrolloReunion, conclusiones, actividad, responsable, fechaActividad, arrayIMG)

})

document.body.addEventListener('click', function(e){
    if(e.target.classList.contains('close')){
        e.target.parentNode.remove();
        let positionArray = e.target.parentNode.getAttribute('position');
        delete(arrayIMG[positionArray]);
    }
});