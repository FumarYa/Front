import React, {useState} from 'react'

export const SettingProduct = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    marca: '',
    descripcion: '',
    precio: '',
    tipo: '',
    imagen: ''
  });

  const [nombreEliminar, setNombreEliminar] = useState('');

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setProducto({...producto, [event.target.name]: event.target.value });
  }

  const handleNombreEliminar = (event) => {
    setNombreEliminar(event.target.value);
  }

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch('localhost:4000/api/producto/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });
      setProducto({nombre: producto.nombre, marca: producto.marca, descripcion: producto.descripcion, precio: producto.precio, tipo: producto.tipo, imagen: producto.imagen});
    } catch (error) {
      setError(error.message);
    }
  }

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`localhost:4000/api/producto/nombre/${nombreEliminar}`);
      const data = await response.json();
      await fetch(`localhost:4000/api/producto/delete/${data.id}`, { method: 'DELETE' });
      setNombreEliminar('');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="settings">
      <div className="anadir">
      <h2>Añadir Producto</h2>
      <form className="anadir_form" onSubmit={handleAddSubmit}>
        {/* Aquí van los inputs para cada campo del producto */}
        <input name='nombre' value={producto.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name='marca' value={producto.marca} onChange={handleChange} placeholder="Marca" required />
        <input name='descripcion' value={producto.descripcion} onChange={handleChange} placeholder="Descripcion" required />
        <input name='precio' value={producto.precio} onChange={handleChange} placeholder="Precio" required />
        <input name='tipo' value={producto.tipo} onChange={handleChange} placeholder="Tipo" required />
        <input name='imagen' value={producto.imagen} onChange={handleChange} placeholder="Imagen" required />
        {/* Añadir los demás campos aquí de la misma manera */}
        <button type='submit'>Añadir Producto</button>
      </form>
      </div>


      <div className="eliminar">
      <h2>Eliminar Producto</h2>
      <form className="delete_form" onSubmit={handleDeleteSubmit}>
        <input name='nombre' value={nombreEliminar} onChange={handleNombreEliminar} placeholder="Nombre del producto a eliminar" required />
        <button type='submit'>Eliminar Producto</button>
      </form>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}
