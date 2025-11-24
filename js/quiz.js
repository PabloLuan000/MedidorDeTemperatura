const quizData = [
  {
    question: "O que é o espectro eletromagnético?",
    answers: [
      "Uma lista de instrumentos musicais",
      "O conjunto de todas as ondas eletromagnéticas",
      "Um tipo de raio laser",
      "Um tipo de luz invisível"
    ],
    correct: 1
  },
  {
    question: "Qual destas é uma onda eletromagnética?",
    answers: [
      "Som",
      "Água",
      "Luz visível",
      "Vento"
    ],
    correct: 2
  },
  {
    question: "Qual tipo de onda é usada para ouvirmos rádio?",
    answers: [
      "Raios X",
      "Ondas de rádio",
      "Luz visível",
      "Ultravioleta"
    ],
    correct: 1
  },
  {
    question: "Qual onda permite que controles remotos funcionem?",
    answers: [
      "Infravermelho",
      "Micro-ondas",
      "Raios Gama",
      "Luz visível"
    ],
    correct: 0
  },
  {
    question: "Qual tipo de onda pode ser prejudicial em grandes quantidades?",
    answers: [
      "Ondas de rádio",
      "Infravermelho",
      "Ultravioleta",
      "Micro-ondas"
    ],
    correct: 2
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
  }, 900);
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
