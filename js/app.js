const formularioPDF = document.getElementById('formRegistroAsistencia');

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

async function generarPDF(){
    
    const imagen = await cargarImagen('../assets/img/acta_registro_asistencia.jpg');
    const pdf = new jsPDF('p', 'pt', 'letter');

    pdf.addImage(imagen, 'PNG', 0, 0, 570, 800);

    pdf.save('example.pdf')

}

formularioPDF.addEventListener('submit', (e)=>{
    e.preventDefault();
    generarPDF();
})