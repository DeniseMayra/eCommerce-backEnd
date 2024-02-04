const userDataContainer = document.getElementById('users-data');


document.addEventListener('DOMContentLoaded', async() => {
  const response = await fetch('/api/sessions/userAdmin', {
    headers: {
      "Content-type": 'application/json'
    },
    method: 'get'
  });
  const result = await response.json();
  if (result.error ){
    alert('Ocurrio un error en validacion de usuario. '+ result.message);
  } else {
    if ( result.user.role === 'admin' ) {
      init();

    } else {
      alert('No es usuario administrador');
    }
  }
})

const init = async () => {
  const response = await fetch('/api/users/', {
    headers: {
      "Content-type": 'application/json'
    },
    method: 'get'
  });
  const result = await response.json();

  if (!result.error){
    let inner = '';
    result.data.forEach(element => {
      inner += `<tr>
          <td>${element.first_name}</td>
          <td>${element.email}</td>
          <td>${element.role}</td>
          <td>${element.last_connection.slice(0, 10)}</td>
          <td><button onclick="changeRole('${element._id}')">Modifcar rol</button></td>
          <td><button onclick="deleteUser('${element._id}')">Delete</button></td>
        </tr>
      `;
    });

    userDataContainer.innerHTML = inner;
  }
}

const deleteUser = async (id) => {
  const response = await fetch(`/api/users/${id}`, {
    headers: {
      "Content-type": 'application/json'
    },
    method: 'delete'
  });

  const result = await response.json();
  
  if ( result.error ){
    alert('Ocurrio un error en el cambio de rol. ' + result.message);
  } else {
    location.reload();
  }
}

const changeRole = async (id) => {
  const response = await fetch(`/api/users/premium/${id}`, {
    headers: {
      "Content-type": 'application/json'
    },
    method: 'put'
  });

  const result = await response.json();
  if ( result.error ){
    alert('Ocurrio un error en el cambio de rol. ' + result.message);
  } else {
    location.reload();
  }
}
