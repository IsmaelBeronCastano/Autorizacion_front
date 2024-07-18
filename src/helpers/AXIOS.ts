import axios from 'axios'


export const  generarYDescargarPdf = async (data: any) => {

  try {
    const response = await axios.post('http://localhost:3001/autorizacion/crear_autorizacion', data, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      }
    });

    const pdfId = response.data.pdfId;
    console.log('PDF ID:', pdfId);

    if (pdfId) {
      // Llamada al microservicio para obtener la ruta del PDF
      const pathResponse = await axios.post(
        'http://localhost:3001/cliente/autorizacion/descargar_autorizacion',
        { id: pdfId },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const pdfPath = pathResponse.data; // La ruta del PDF devuelta por el microservicio
      console.log('PDF Path:', pdfPath);

      // Realiza una solicitud HTTP para descargar el archivo PDF usando la ruta obtenida
      const response = await axios.get(`http://localhost:3001/${pdfPath}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${pdfId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('PDF ID es undefined');
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios:', error.response?.data);
    } else {
      console.error('Error:', error);
    }
  }
};