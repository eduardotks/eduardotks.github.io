const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute('disabled'); //desabilita botão
    return; // sai da função se for maior que 2
  }

  button.setAttribute('disabled', ''); //seta atributo vazio
}

const handleSubmit = (event) => {
  event.preventDefault(); //bloqueia evento
  
  localStorage.setItem('player', input.value); //salva no localStorage
  window.location = 'pages/game.html'; //redireciona para game.html
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);