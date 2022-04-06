import './index.css';
import React, { useState } from 'react'
import { Table } from './components/Table';
import { Formulario } from './components/Formulario';
import { v4 as uuidv4 } from 'uuid';
import { EditUserForm } from './components/editUserForm';
import { Routes, Route, Link } from "react-router-dom";
import { Inicio } from './components/Inicio';
import { Footer } from './components/Footer';


function App() {

  const userData = [
    {
      id: uuidv4(),
      name: 'jose',
      lastname: 'perez',
      age: 18,
      provincia: 'salta',
      pais: 'argentina',

    },
    {
      id: uuidv4(),
      name: 'Sofy',
      lastname: 'Choua',
      age: 22,
      provincia: 'tucuman',
      pais: 'argentina',

    },
    {
      id: uuidv4(),
      name: 'rocio',
      lastname: 'garcia',
      age: 44,
      provincia: 'san pablo',
      pais: 'brasil',

    }
  ]


  const [users, setUsers] = useState(userData)
  const [dataToEdit, setDataToEdit] = useState(null);

  //AGREGAR USUARIO

  const addUser = (user) => {
    user.id = uuidv4()
    setUsers([...users, user])

  }
  //ELIMINAR USUARIO
  const deleteUser = (id) => {
    console.log(id)

    const arrayFiltrado = users.filter(users => users.id !== id)
    setUsers(arrayFiltrado)

  }

  //EDITAR USUARIO
  const [editing, setEditing] = useState(false)
  const [current, setCurrent] = useState({
    id: null, name: '', lastname: '', pais: '', provincia: ''
  })
  const editRow = (user) => {
    setEditing(true)
    setCurrent(
      {
        id: user.id, name: user.name, lastname: user.lastname, pais: user.pais, provincia: user.provincia
      }

    )
  }
  const updateUser = (id, updatedUser) => {
    setEditing(false)

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }

  return (
    <>


      <div class="navbar bg-neutral text-neutral-content">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>

            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <nav>
                <Link to="/users">Users</Link>

              </nav>
              <nav>
                <Link to="/crear">crear</Link>
              </nav>
              <nav>
                <Link to="/editar">Editar</Link>
              </nav>
              <nav>
                <Link to="/" exact >Inicio</Link>
              </nav>
            </ul>
          </div>
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-xl">Proyecto prueba/ Lab9</a>
        </div>
        <div class="navbar-end">
          <button class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span class="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      {/* FIN NAVBAR */}

      <Routes>

        <Route path="/" element={<Inicio />} />
        <Route path="/editar:name" element={<Formulario addUser={addUser} dataToEdit={dataToEdit} setEditing={setEditing}
          setDataToEdit={setDataToEdit} />} />
        <Route path="/users" element={<Table users={users} deleteUser={deleteUser} editRow={editRow} updateUser={updateUser} />} />
        <Route path="/crear" element={<Formulario addUser={addUser} dataToEdit={dataToEdit} setEditing={setEditing}
          setDataToEdit={setDataToEdit} />} />

      </Routes>

      <Formulario addUser={addUser} dataToEdit={dataToEdit} setEditing={setEditing}
        setDataToEdit={setDataToEdit} />

      {/* COMIENZO FORM */}
      {/* {
          editing ? (
            <div>
              <EditUserForm setEditing={setEditing}
                current={current}
                updateUser={updateUser} />
             
            </div>
          ) :
            (
              <div>
             
                <Formulario addUser={addUser} />
           
              </div>
            )
        } */}

      <Footer />

    </>

  );
}

export default App;
