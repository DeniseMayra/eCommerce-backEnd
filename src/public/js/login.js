const login = document.getElementById('loginForm');
const error = document.getElementById('errorMsj');

document.addEventListener('DOMContentLoaded', async() => {
  const response = await fetch('/api/sessions/login', {
    headers: {
      "Content-type": 'application/json'
    },
    method: 'get'
  });
  const result = await response.json();
  if (result.error === false){
    window.location.href = '/profile';
  }
})



login.addEventListener('submit', async(e) => {
  e.preventDefault();
  const formValue = {
    email: e.target.email.value,
    password: e.target.password.value
  };
  const response = await fetch('/api/sessions/login', {
    headers: {
      "Content-type": 'application/json'
    },
    method: 'post',
    body: JSON.stringify(formValue)
  });
  const result = await response.json();
  if (result.error === false){
    window.location.href = '/profile';

  } else {
    error.innerHTML = result.message;
  }
});
