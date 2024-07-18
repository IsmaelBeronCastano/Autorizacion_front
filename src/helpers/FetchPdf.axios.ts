import axios from 'axios';

export const generarYDescargarPdf = async (data: any) => {
  try {
    const postResponse = await axios.post('http://localhost:3001/cliente/autorizacion/crear_autorizacion', data);
    const pdfId = postResponse.data;

    if (pdfId) {
      const response = await axios.get(`http://localhost:3001/cliente/autorizacion/descargar_autorizacion/${pdfId}`, {
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
      console.error('Error: No se ha podido obtener el ID del PDF');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
