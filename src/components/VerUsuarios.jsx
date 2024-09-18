import { useEffect, useState } from 'react';
import axios from 'axios';
import './VerUsuarios.css'

const VerUsuarios=()=> {
  const [usuarios, setUsuarios] = useState([]);
  const [visibleUsuarioId, setVisibleUsuarioId] = useState(null);

  // Función para obtener los usuarios de la API usando axios con .then()
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/users').then(respuesta => {
        //Data en consola
        console.log(respuesta.data);  
        //Data renderizada     
        setUsuarios(respuesta.data);
      })
  },[]);

  // Función para mostrar u ocultar la información adicional
  const mostrarInfo = (usuarioId) => {
    console.log(usuarioId);
    setVisibleUsuarioId(usuarioId); // Muestra la información del usuario seleccionado
  };

  const cerrarInfo = () => {
    setVisibleUsuarioId(null); // Oculta la información
  };

  // Función que devuelve el estilo para la visibilidad de la información adicional
  const getInfoStyle = (usuarioId) => {
    let visibility;
    let height;

    if (visibleUsuarioId === usuarioId) {
      visibility = 'visible';
      height = 'auto';
    } else {
      visibility = 'hidden';
      height = '0';
    }

    return {
      visibility: visibility,
      height: height,
      overflow: 'hidden',
      transition: 'visibility 1s, height 5s',
    };
  };


  return (
    <div className="tabla">
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Acción</th> 
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}> 
              <td>{usuario.name}</td>
              <td>{usuario.username}</td>
              <td><button onClick={()=> mostrarInfo(usuario.id)}>Más informacion</button></td> 
            </tr>
          ))}
        </tbody>
      </table>

      {usuarios.map((usuario) => {
        if (visibleUsuarioId === usuario.id) {
          return (
            <div
              key={usuario.id}
              className='informacion-adicional'
              style={getInfoStyle(usuario.id)}
            >
              <h3>Información adicional de {usuario.name}</h3>
              <p>
                <strong>Dirección:</strong> {usuario.address.street}, {usuario.address.suite}, {usuario.address.city}
              </p>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {usuario.phone}
              </p>
              <p>
                <strong>Website:</strong> {usuario.website}
              </p>
              <button onClick={cerrarInfo}>Cerrar información</button>
            </div>
          );
        } else {
          return null;
        }
      })}    

    </div>
  );
}

export default VerUsuarios;
