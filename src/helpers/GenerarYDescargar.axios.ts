import axios from 'axios';

export const generarYDescargarPdf = async (data: any) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/cliente/autorizacion/crear_autorizacion',
      data,
      {
        responseType: 'blob',
      }
    );


    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Autorizacion.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error al generar y descargar el PDF:', error);
  }
};
