import { Link } from "react-router-dom"

export const Table = (props) => {

  console.log(props.users)

  return (
    <>
      <div class="overflow-x-auto">
        <table class="table w-full">

          <thead>
            <tr>
              <th>firstName</th>
              <th>lastName</th>
              <th>Age</th>
              <th>Pais</th>
              <th>Provincia</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {
         
            props.users.map(user => (
              <tr key={user.id}>
                <th>{user.name}</th>
                <td>{user.lastname}</td>
                <td>{user.age}</td>
                <td>{user.pais}</td>
                <td>
                  {user.provincia}
                </td>
                <td>
                  <Link to={`/editar/${user.id}`}>
                  <button class="btn btn-circle btn btn-warning"
                   onClick={() => {
                    props.editRow(user)
                  }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg " class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  </Link>
                
                  <button class="btn btn-circle btn btn-error"
                   onClick={() => (props.deleteUser(user.id))}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>

                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </>
  )
}
