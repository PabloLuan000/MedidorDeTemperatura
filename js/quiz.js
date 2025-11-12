const quizData = [
  {
    question: "O que o sensor infravermelho faz neste projeto?",
    answers: [
      "Mede a temperatura tocando o objeto",
      "Capta o calor emitido sem contato",
      "Controla o laser",
      "Gera energia para o circuito"
    ],
    correct: 1
  },
  {
    question: "Qual é a função da mira laser?",
    answers: [
      "Medir a temperatura",
      "Mostrar onde o sensor está apontando",
      "Aumentar a precisão do sensor",
      "Enviar dados ao Arduino"
    ],
    correct: 1
  },
  {
    question: "Qual componente é responsável por processar as informações do sensor?",
    answers: [
      "O display",
      "O resistor",
      "O Arduino Nano",
      "A fonte de energia"
    ],
    correct: 2
  },
  {
    question: "Por que esse tipo de termômetro é útil em ambientes industriais?",
    answers: [
      "Porque é colorido",
      "Porque mede temperatura à distância",
      "Porque usa Wi-Fi",
      "Porque é mais pesado"
    ],
    correct: 1
  },
  {
    question: "O que o display faz no projeto?",
    answers: [
      "Mostra a temperatura medida",
      "Controla o laser",
      "Alimenta o sensor",
      "Armazena dados"
    ],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.classList.add("btn", "btn-outline-primary", "py-2");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(index);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(index) {
  const correctIndex = quizData[currentQuestion].correct;
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    btn.classList.remove("btn-outline-primary");
    if (i === correctIndex) {
      btn.classList.add("btn-success");
    } else if (i === index && i !== correctIndex) {
      btn.classList.add("btn-danger");
    } else {
      btn.classList.add("btn-outline-secondary");
    }
  });

  if (index === correctIndex) score++;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  document.getElementById("question-container").classList.add("d-none");
  resultEl.classList.remove("d-none");
  scoreEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
}

restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  resultEl.classList.add("d-none");
  document.getElementById("question-container").classList.remove("d-none");
  loadQuestion();
};

loadQuestion();
