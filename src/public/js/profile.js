const logOut = document.getElementById('logOut');
const message = document.getElementById('message');
const error = document.getElementById('error');


document.addEventListener('DOMContentLoaded', async() => {
  const response = await fetch('/api/sessions/profile', {
    headers: {
      "Content-type": 'application/json'
    },
    method: 'get',
  });
  const result = await response.json();
  if (result.error === false){
    logOut.style.display = 'block';
    message.innerHTML = `Bienvenid@ ${result.user.first_name}`;
  } else {
    window.location.href = '/login';
  }
})

logOut.addEventListener('click', async(e) => {
  e.preventDefault();
  const response = await fetch('/api/sessions/logout', {
    headers: {
      "Content-type": 'application/json'
    },
    method: 'get',
  });
  const result = await response.json();
  if (result.error === false){
    window.location.href = '/login';

  } else {
    error.innerHTML = result.message;
  }
});
