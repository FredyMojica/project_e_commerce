import React from 'react'
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../../conexiones/crud';
export const ViewProductos = ({producto, cargarProductos }) => {
    const {nombre, descripcion, stock, precio, imagen, _id } = producto;

    const borrarProducto = async (idProducto) =>{
        swal({
          title: "Estas seguro de eliminar el producto",
          text: "Una vez eliminado, no se podrá recuperar este producto",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            const response = crud.DELETE(`/api/producto/${idProducto}`);
            const mensaje = response.msg;
            if(response){
              swal("Tu producto ha sido borrado correctamente", {
                icon: "success",
              });
            }
            cargarProductos();
          } else {
            swal("Se canceló la acción");
          }
        });
        }

    return(
        <div
            className='border-r p-5 flex justify-between items-center'
        >
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl text-gray-50'>nombre:{nombre}</p>
                <p className='mb-1 text-xl text-gray-50 uppercase'>descripción:{descripcion}</p>
                <p className='mb-1 text-xl text-gray-50'>stock:{stock}</p>
                <p className='mb-1 text-xl text-gray-50'>precio:{precio}</p>
                <img src={imagen} width="150" height="150"></img>
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
            
            <Link 
            to={`/actualizar-producto/${_id}`}
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >Editar</Link>

            <button 
            onClick={() => borrarProducto(_id)}
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            >Eliminar</button>

            {/* <button
                          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                          //onClick={() => handleModalEditarTarea(tarea)}
                      >Editar</button>
                <button
                          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                         // onClick={() => handleModalEliminarTarea(tarea)}
                      >Eliminar</button> */}
            </div>
        
        </div>
    )
}

export default ViewProductos