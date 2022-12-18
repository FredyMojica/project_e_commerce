import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const Admin = () => {

  const navigate = useNavigate();
  
  useEffect(() =>{
    const autenticarUsuario = async () =>{
      const token = localStorage.getItem("token")
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]);// [] hacen que solo se ejecute una vez el useEffect - Quiere decir que el useEfect se ejecuta una vez cuando el ...a las 9:40 clase 15


  const [categoria, setCategorias] = useState([]);

   const cargarCategorias = async () => {
       const response = await crud.GET(`/api/categoria`);
       //console.log(response);
       setCategorias(response.categoria);
   }

   useEffect(() => {
       cargarCategorias();
   }, [])

   const borrarCategoria = async (idCategoria) =>{
    swal({
      title: "Estas seguro de eliminar la categoria",
      text: "Una vez eliminado, no se podrá recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const response = crud.DELETE(`/api/categoria/${idCategoria}`);
        const mensaje = response.msg;
        if(response){
          swal("Tu categoria ha sido borrada correctamente", {
            icon: "success",
          });
        }
        cargarCategorias();
        
      } else {
        swal("Se canceló la acción");
      }
    });
    }





  return (
    <>
    <Header/>
    <div className='md:flex md:min-h-screen  bg-blue-200'>
      <Sidebar/>
      <main className= 'flex-1'>
   <h1 className="inline bg-gradient-to-r from-black via-gray-500 to-gray-800 bg-clip-text font-display text-5xl tracking-tight text-transparent">
    Listado de Categorías
    </h1>
    <table className="table table-bordered">
        <thead className='bg-blue-200'>
            <tr>
                <th style={{ width: '15%' }}>Imagen</th>
                <th style={{ width: '60%' }}>Nombre</th>
                <th style={{ width: '20%' }}>Opciones</th>
            </tr>
        </thead>
                                       
        <tbody className="bg-blue-200">
            {
                categoria.map(
                    item =>
                        <tr key={item._id}>
                        <td><img src={item.imagen}></img></td>
                        <td align='center'>{item.nombre}</td>
                        <td>
                            <Link  
                              to={`/home-productos/${item._id}`}
                              className="bg-emerald-500 mb-5 mx-auto py-1 px-1 text-white font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                            >Crear Producto</Link>&nbsp;&nbsp;
                            <Link 
                            to={`/actualizar-categoria/${item._id}`}
                            className="bg-sky-600 mb-5 mx-auto py-1 px-1 text-white font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                            >Editar</Link>&nbsp;&nbsp;
                            <button  
                                onClick={()=>borrarCategoria(item._id)}
                                className="bg-red-600 mb-5 mx-auto py-1 px-1 text-white font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                            >Eliminar</button>
                        </td>
                        </tr>
                        )
                    }
        </tbody>  
    </table>
  </main>

  </div>
  </>
  );


}

export default Admin;