import React, { useState } from 'react';
import moment from 'moment';

export const Registro = () => {
    const [form, setForm] = useState({
        nombre: '',
        contrasena: '',
        telefono: '',
        correo: '',
        fechaNacimiento: '',
        rol: 'Usuario',
    });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Validaciones
        if (form.contrasena.length < 12 || form.contrasena.length > 16) {
            setError('La contraseña debe tener entre 12 y 16 caracteres');
            return;
        }

        if (!form.telefono.match(/^\d{9}$/)) {
            setError('El teléfono debe tener 9 dígitos sin prefijo');
            return;
        }

        if (!(form.correo.endsWith('@gmail.com') || form.correo.endsWith('@outlook.com'))) {
            setError('El correo debe ser de Gmail o Outlook');
            return;
        }

        if (!form.fechaNacimiento.match(/^\d{2}-\d{2}-\d{4}$/)) {
            setError('La fecha de nacimiento debe estar en el formato DD-MM-AAAA');
            return;
        }

        const fechaNacimiento = moment(form.fechaNacimiento, "DD-MM-YYYY");
        if (moment().diff(fechaNacimiento, 'years') < 18) {
            setError('Debes tener al menos 18 años para registrarte');
            return;
        }

        
        // Copiar el objeto form y convertir la fecha de nacimiento al formato AAAA-MM-DD
        const newForm = { ...form, fechaNacimiento: fechaNacimiento.format("YYYY-MM-DD") };

        

        // Realizar la petición
        fetch('http://localhost:4000/api/usuarios/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newForm),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.statusText);
                }
            })
            .then(data => {
                console.log(data)
                // Manejo de la respuesta
                if (data === "Usuario añadido correctamente") {
                    alert('¡Registrado con éxito!');
                    // Limpiar el formulario
                    setForm({
                        nombre: '',
                        contrasena: '',
                        telefono: '',
                        correo: '',
                        fechaNacimiento: '',
                        rol: 'Usuario',
                    });
                } else {
                    setError(data || 'Error durante el registro');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Ha ocurrido un error durante el registro');
            });
    };

    return (
        <div className="registros">
            <h2>Registro:</h2>
        <form  onSubmit={handleSubmit} className="registro">
            <div className="registro_nombre">
                <label>Nombre</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required/>
            </div>
            <div className="registro_contrasena">
                <label>Contraseña</label>
                <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange} required/>
            </div>
            <div className="registro_telefono">
                <label>Teléfono</label>
                <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required/>
            </div>
            <div className="registro_correo">
                <label>Correo</label>
                <input type="email" name="correo" value={form.correo} onChange={handleChange} required/>
            </div>
            <div className="registro_fechaN">
                <label>Fecha de Nacimiento</label>
                    <input type="text" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} placeholder="DD-MM-AAAA" required/>
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};