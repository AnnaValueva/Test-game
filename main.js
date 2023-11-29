const headerContainer = document.getElementById('header');
const listContainer = document.getElementById('list');
const btn = document.getElementById('submit');


let score = 0;
let questionIndex = 0;


clearPage()
showQuestion()
btn.onclick = checkAnswer;

// function to clear html
function clearPage() {
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

// function for making question
function showQuestion() {

  // making template
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
  
  headerContainer.innerHTML = title;

  for ([index, answersText] of questions[questionIndex]['answers'].entries()) {
    const questionTemplate = `
    <li>
      <label>
        <input value="%numberAnswer%" type="radio" class="answer" name="answer" />
        <span>%answer%</span>
      </label>
    </li>`;

    const answer = questionTemplate.replace('%answer%', answersText).replace('%numberAnswer%', index + 1);

    listContainer.innerHTML += answer;
  }
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

  if (!checkedRadio) {
    btn.blur();
    return
  };

  const userAnswer = parseInt(checkedRadio.value);

  if (userAnswer === questions[questionIndex]['correctAnswer']) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {

  const resultTemplate = `
    <h2 class="title">%title%</h2>
    <h3 class="summary">%summary%</h3>
    <p class="result">%result%</p>
  `;

  let title, summary;

  if (score === questions.length) {
    title = 'Congratulations!';
    summary = "You've done all questions!🎉";
  } else if ((score * 100) / questions.length >=50) {
    title = 'Great!';
    summary = "Nice job! You did your best";
  } else {
    title = 'Not bad';
    summary = 'Try to learn more';
  }

  let result = `${score} / ${questions.length}`;

  const finalTemplate = resultTemplate
    .replace('%title%', title)
    .replace('%summary%', summary)
    .replace('%result%', result);

    headerContainer.innerHTML = finalTemplate;
    btn.innerHTML = 'Start again'
    btn.onclick = () => {history.go()};
}