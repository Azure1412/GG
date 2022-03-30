/* eslint-disable require-jsdoc */
const nextBtn = document.getElementById('next-btn');
const questionDisplay = document.getElementById('question-display');
const optionDisplay = document.getElementById('option-display');
const form = document.forms['quiz-form'];
const resultPanel = document.getElementById('result-panel');
let name;
document.querySelector('#go').addEventListener('click', () => {
  document.querySelector('.prompt-overlay').style.display = 'none';
  name = document.querySelector('.name').value;
});
const questions = [
  'Which of the following statement is/are correct about Favipiravir?',
  'How many countries, areas or territories are suffering from novel coronavirus outbreak in the World',
  'Thailand announced that it has proceeded to test its novel coronavirus vaccine on which animal/bird?',
  'What is the official name of the virus as designated by the World Health Organization (WHO)?',
  'What other viruses belong to the coronavirus family?',
  'Which practice prevents the spread of germs?',
  'Each of the following statements is true, except:',
  'A virus infects a host in order to:',
  'The distinguishing feature of a coronavirus is its:',
  'Coronavirus infections are likely to be more serious for:',
];

const options = [
  [
    'Favipiravir is an antiviral COVID-19 drug',
    'Glenmark Pharmaceuticals under the brand name FabiFlu has launched an antiviral drug Favipiravir',
    "It is India's first COVID-19 drug launched, priced at Rs 103 per tablet",
    'All the above are correct',
  ],
  ['More than 50', 'More than 100', 'More than 150', 'More than 200'],
  ['Monkeys', 'Lizards', 'Hens', 'Kites'],
  ['Corona Virus', 'Bat-soup Virus', 'Covid-19', 'Wuhan flu'],
  ['SARS ans HIV', 'HIV and Rhino', 'SARS and MERS', 'MERS and Rhino'],
  [
    'Washing your hands often',
    'Blowing your nose',
    'Reusing the same tissue',
    'Coughing into your hand',
  ],
  [
    'Viruses come in different types',
    'Viruses infect living cells',
    'Viruses can replicate without hosts',
    'Viruses can cause illnesses',
  ],
  [
    'Take in nutrients',
    'Make the host sick',
    'Make copies of itself',
    "Destroy the host's cells",
  ],
  ['Size', 'Shape', 'Mobility', 'Deadliness'],
  [
    'Teens',
    'Active Adults',
    'Frequent Travellers',
    'People with weak immune systems',
  ],
];

const answers = [
  'All the above are correct',
  'More than 200',
  'Monkeys',
  'Covid-19',
  'SARS and MERS',
  'Washing your hands often',
  'Viruses can replicate without hosts',
  'Make copies of itself',
  'Shape',
  'People with weak immune systems',
];
shuffle();
const maxCount = questions.length;
let currentQuestion = -1;
let score = 0;

nextBtn.addEventListener('click', startQuiz, false);

function startQuiz() {
  if (currentQuestion == -1) {
    timer();
  }
  if (currentQuestion >= 0) {
    const selVal = form.question.value;
    if (!selVal) return;
    if (selVal === answers[currentQuestion]) {
      score++;
      const box = '.div' + String(currentQuestion + 1);
      document.querySelector(box).style.backgroundColor = 'green';
      document.querySelector('html').style.backgroundImage = 'unset';
      document.body.style.backgroundImage = 'unset';
      document.querySelector('html').style.backgroundColor = 'green';
      document.body.style.backgroundColor = 'green';
      setTimeout(back2pic, 300);
    } else {
      const box = '.div' + String(currentQuestion + 1);
      document.querySelector(box).style.backgroundColor = 'red';
      document.querySelector('html').style.backgroundImage = 'unset';
      document.body.style.backgroundImage = 'unset';
      document.querySelector('html').style.backgroundColor = 'red';
      document.body.style.backgroundColor = 'red';
      setTimeout(back2pic, 300);
    }
  }

  currentQuestion++;

  if (currentQuestion >= maxCount) {
    (questionDisplay.style.display = 'none'),
      (optionDisplay.style.display = 'none'),
      (resultPanel.style.display = 'block'),
      (resultPanel.innerHTML = `${
        score > 4
          ? 'EXCELLENT!'
          : score > 3
          ? 'GOOD JOB!'
          : score > 2
          ? 'FAIR!'
          : 'POOR!'
      }You earned ${score+minutes*10/3} points in this session.`),
      (window.location.href = `cert.html?marks=${score + (minutes*60 + seconds)*10/180}#${name}`),
      (currentQuestion = -1);
  } else {
    currentQuestion == maxCount - 1
      ? ((nextBtn.innerHTML = 'SUBMIT'),
        (optionDisplay.innerHTML = ''),
        setupQuestions())
      : ((optionDisplay.innerHTML = ''),
        (nextBtn.innerHTML = 'NEXT QUESTION'),
        setupQuestions());
  }
}
function curr(params) {
  if (
    document.querySelector('.div' + String(+params.innerHTML)).style
      .backgroundColor == 'red' ||
    document.querySelector('.div' + String(+params.innerHTML)).style
      .backgroundColor == 'green'
  ) {
    return;
  }
  currentQuestion = +params.innerHTML - 1;
  optionDisplay.innerHTML = '';
  setupQuestions();
  closeNav();
}

function setupQuestions() {
  questionDisplay.style.display = 'block';
  optionDisplay.style.display = 'block';
  resultPanel.style.display = 'none';
  questionDisplay.innerHTML = questions[currentQuestion];
  for (let i = 0; i < options[i].length; i++) {
    const radioInput = document.createElement('input');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('value', options[currentQuestion][i]);
    radioInput.setAttribute('name', 'question');
    const optionVal = document.createTextNode(options[currentQuestion][i]);
    const label = document.createElement('label');
    label.appendChild(radioInput);
    label.appendChild(optionVal);
    optionDisplay.appendChild(label);
  }
}
function openNav() {
  if (window.innerWidth < 450) {
    document.getElementById('mySidenav').style.width = '100vw';
    document.querySelector('html').style.backgroundColor = 'rgba(0,0,0,0.4)';
  } else {
    document.getElementById('mySidenav').style.width = '20vw';
    document.getElementById('main').style.marginLeft = '20vw';
    document.querySelector('html').style.backgroundColor = 'rgba(0,0,0,0.4)';
  }
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
  document.querySelector('html').style.backgroundColor = 'white';
}
const time = document.querySelector('#time');
let seconds = 0;
let minutes = 3;
function add() {
  seconds--;
  if (seconds < 0) {
    seconds = 59;
    minutes--;
  }
  if (minutes === 0 && seconds === 0) {
    window.location.href = `cert.html?marks=${score + (minutes*60 + seconds)*10/180}#${name}`;
  }
  time.textContent =
    (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') +
    ':' +
    (seconds > 9 ? seconds : '0' + seconds);
  window.value = time.textContent;
  timer();
}
function timer() {
  t = setTimeout(add, 1000);
}
function back2pic() {
  document.querySelector('html').style.backgroundImage = 'url(index.jpeg)';
  document.body.style.backgroundImage = 'url(index.jpeg)';
}
function shuffle() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    let temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;

    temp = options[i];
    options[i] = options[j];
    options[j] = temp;

    temp = answers[i];
    answers[i] = answers[j];
    answers[j] = temp;
  }
}
