import { useForm, SubmitHandler } from "react-hook-form";
import { generarYDescargarPdf } from "../helpers/GenerarYDescargar.axios";




interface IFormInput {
  nombreTitular: String
  apellidosTitular: String
  DNITitular: String
  nombreAutorizada: String
  apellidosAutorizada: String
  DNIAutorizada: String
  ciudad: string
}

export const Formulario= ()=> {

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data:any) => {
    
    generarYDescargarPdf(data)
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center flex-col gap-4 mb-20">
      <label className="mt-4 font-bold text-xl text-gray-700">Pon tu <span className="font-black text-2xl uppercase text-black">nombre</span></label>
      <input className="border-4 px-20 text-center py-2" {...register("nombreTitular")} />
      <label  className="font-bold text-xl text-gray-700">Pon tus <span className="font-black text-2xl uppercase text-black">apellidos</span> separados por un espacio</label>
      <input className="border-4 px-20 text-center py-2" {...register("apellidosTitular")} />
    <label  className="font-bold text-xl text-gray-700">Pon tu <span className="font-black text-2xl uppercase text-black">DNI</span></label>
      <input className="border-4 px-20 text-center py-2" {...register("DNITitular")} />
    <label  className="font-bold text-xl text-gray-700">Pon el <span className="font-black text-2xl uppercase text-black">nombre del autorizado/a</span></label>
      <input className="border-4 px-20 text-center py-2" {...register("nombreAutorizada")} />
    <label  className="font-bold text-xl text-gray-700">Pon sus <span className="font-black text-2xl uppercase text-black">apellidos</span> separados por un espacio</label>
      <input className="border-4 px-20 text-center py-2" {...register("apellidosAutorizada")} />
    <label  className="font-bold text-xl text-gray-700">Pon su <span className="font-black text-2xl uppercase text-black">DNI</span></label>
      <input className="border-4 px-20 text-center py-2"{...register("DNIAutorizada")} />
    <label  className="font-bold text-xl text-gray-700">Pon la <span  className="font-black text-2xl uppercase text-black">ciudad</span></label>
      <input className="border-4 px-20 text-center py-2" {...register("ciudad")} />
      <input type="submit" className="w-80 h-10 hover:bg-blue-950 focus:bg-black bg-blue-900 text-white pr-3 pl-3 align-items text-center font-bold text-xl rounded-md mt-5"/>
    </form>
  );
}
