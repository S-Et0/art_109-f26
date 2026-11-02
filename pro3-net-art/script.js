
const questions = [
  {
    question: "How do you make decisions?",
    answers: [
      "Trust my intuition",
      "Consult other people",
      "Analyze the information"
    ]
  },
  {
    question: "What matters most to you?",
    answers: [
      "Freedom",
      "Connection",
      "Security"
    ]
  },
  {
    question: "How do you handle uncertainty?",
    answers: [
      "Experiment",
      "Ask for advice",
      "Make a plan"
    ]
  },
  {
    question: "How do you see yourself?",
    answers: [
      "Independent",
      "Adaptable",
      "Practical"
    ]
  },
  {
    question: "How do you want to be remembered?",
    answers: [
      "As someone original",
      "As someone loved",
      "As someone reliable"
    ]
  }
];

const identities = [
  {
    title: "THE REBEL",
    description:
      "You prioritize independence and personal freedom."
  },
  {
    title: "THE SOCIAL BUTTERFLY",
    description:
      "Your identity is shaped by relationships and social expectations."
  },
  {
    title: "THE STRAIGHT ARROW",
    description:
      "You value stability, structure, and predictability."
  }
];

let currentQuestion = 0;
let scores = [0, 0, 0];

// HTML sections
const welcome = document.getElementById("welcome");
const quiz = document.getElementById("quiz");
const results = document.getElementById("results");

function showScreen(screen) {
  welcome.hidden = screen !== welcome;
  quiz.hidden = screen !== quiz;
  results.hidden = screen !== results;
}

// Start assessment
document.getElementById("start-btn")
  .addEventListener("click", () => {
    currentQuestion = 0;
    scores = [0, 0, 0];
    showScreen(quiz);
    showQuestion();
  });

// Display current question
function showQuestion() {
  const current = questions[currentQuestion];

  document.getElementById("progress").textContent =
    `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

  document.getElementById("question").textContent =
    current.question;

  const answersContainer =
    document.getElementById("answers");

  answersContainer.replaceChildren();

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answersContainer.appendChild(button);
  });
}

// Record response and continue
function selectAnswer(index) {
  scores[index]++;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Calculate final classification
function showResults() {
  const highestScore = Math.max(...scores);
  const identityIndex = scores.indexOf(highestScore);
  const identity = identities[identityIndex];

  document.getElementById("identity").textContent =
    identity.title;

  document.getElementById("description").textContent =
    identity.description;

  showScreen(results);
}

// Restart the assessment
document.getElementById("restart-btn")
  .addEventListener("click", () => {
    currentQuestion = 0;
    scores = [0, 0, 0];
    showScreen(welcome);
  });
