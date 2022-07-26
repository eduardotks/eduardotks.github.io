const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

//nome de cada imagem
const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
];

const createElement = (tag, className) => {
  //cria elemento
  const element = document.createElement(tag); 
  //seta classe
  element.className = className; 
  //
  return element; 
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    //todas as cartas estão desabilitadas
  const disabledCards = document.querySelectorAll('.disabled-card');
  //verifica se todas as cartas estão desabilitadas
  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
  }
}

const checkCards = () => {
    //captura os elementos da carta com o atributo data-character
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');
    //se acertou, atribui a classe disabled card nas duas cartas
  if (firstCharacter === secondCharacter) { 

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else { //se errou
    setTimeout(() => {
        //remove a classe reveal-card, fazendo com que 
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      //reseta variáveis.
      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {
    //verificar se a carta possui classe reveal-card
  if (target.parentNode.className.includes('reveal-card')) {
    return; //se houver não faz nada
  }
  //se o usuário não clicou na carta ainda, então revela a carta, guardando na variável firstCard
  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {
    //não é a primeira carta então guarda na variável secondCard
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }  
}

const createCard = (character) => {

//captura os elementos da carta
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  //adiciona imagem na carta front, alterando o background image da carta
  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

//carrega game 
const loadGame = () => {
  //array de personagens com spread operator duplicando os personagens 2 vezes
  const duplicateCharacters = [ ...characters, ...characters ];

  //sorteia os personagens para que as cartas não fiquem sempre no mesmo lugar
  //Math.random() retorna um número aleatório entre 0 e 1
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    //chama createcard passando um personagem para cada carta
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {
    //a cada 1 segundo chama a função somando 1 ao contador
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
    //carrega nome do local storage
  spanPlayer.innerHTML = localStorage.getItem('player'); 
  startTimer();
  loadGame();
}