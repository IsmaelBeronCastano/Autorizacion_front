import axios from 'axios';

export const generarYDescargarPdf = (data: any) => {
axios.post(
    'http://localhost:3001/cliente/autorizacion/crear_autorizacion', data
  )
  .then(postResponse => {
    const pdfId = postResponse.data.someOtherProperty && postResponse.data.someOtherProperty.pdfId || postResponse.data.pdfId;
    console.log('PDF ID:', pdfId);

    // Obtener el PDF generado
    return axios.get(`http://localhost:3001/cliente/autorizacion/descargar_autorizacion/${pdfId}`, {
      responseType: 'blob',
    }).then(response => {
      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${pdfId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }).catch(error => {
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios:', error.response?.data);
    } else {
      console.error('Error:', error);
    }
  });
};


---------------------------------------
//FUNCIONA HASTA ID Y NO DA ERROR
--------------------------------
import axios from 'axios';

export const generarYDescargarPdf = async (data: any) => {

  const pdfId = axios.post(
    'http://localhost:3001/cliente/autorizacion/crear_autorizacion', data
  )
  .then(postResponse => {
    const pdfId = postResponse.data.someOtherProperty && postResponse.data.someOtherProperty.pdfId || postResponse.data.pdfId;
    console.log('PDF ID:', pdfId)})

    if (pdfId) {
      // Llamada al microservicio para obtener la ruta del PDF
      const pdfPath= await axios.get(
        `http://localhost:3001/cliente/autorizacion/descargar_autorizacion/${pdfId}`,
    
      ).then(pathResponse => { 
        if (pathResponse.data === undefined) {
          console.error('Error: No se ha podido obtener la ruta del PDF');}
        pathResponse = pathResponse.data; // La ruta del PDF devuelta por el microservicio
        console.log('PDF Path:', pathResponse)})

     
    

      // Realiza una solicitud HTTP para descargar el archivo PDF usando la ruta obtenida
      axios.get(`http://localhost:3001/${pdfPath}`, {
        responseType: 'blob',
      })
      .then(response => { 

        if (response !== undefined) {
          const url = window.URL.createObjectURL(new Blob([response['data'] ]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${pdfId}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }})
      .catch((error) => console.log(error));
  }}
