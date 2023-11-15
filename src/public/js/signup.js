document.addEventListener('DOMContentLoaded', async() => {
  const response = await fetch('/api/sessions/signup', {
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
