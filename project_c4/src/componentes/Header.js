import React from 'react'; 
import { useNavigate} from 'react-router-dom';

const Header = () => {

const navigate = useNavigate(); 

const cerrarSesion = () =>{
    localStorage.removeItem("token");
    navigate("/");
    }

  return (
    <header className='px-4 py-4 bg-blue-600 border-b'>
        <div className='md:flex md:justify-between'>
        <h2 className='xl:mx-auto text-4xl text-black font-bold text-center mb-4 md:mb-0'>
            Panel de administrador
        </h2>
        <div className='flex flex-col md:flex-row items-center gap-4'>
        <input 
                type="submit"
                value="Cerrar Sesión"
                //className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-violet-400 transition-colors"
                className="bg-violet-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:cursor-pointer hover:bg-violet-400 transition-colors"
                
                onClick={cerrarSesion}
            />
        </div>
        </div>  
    </header>
   
    );
}

export default Header;