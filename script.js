const questions = [
    {
        question: "Siapa nama ibu arkana?",
        answers: [
            { text: "Jessica", correct: false},
            { text: "Nurul", correct: true},
            { text: "Raisa", correct: false},
            { text: "Isyana", correct: false},
        ]
    },
    {
        question: "Siapa nama ayah arkana?",
        answers: [
            { text: "John", correct: false},
            { text: "David", correct: false},
            { text: "Dwika", correct: true},
            { text: "Ronald", correct: false},
        ]
    },
    {
    question: "Berapa tanggal lahir arkana",
        answers: [
            { text: "23-11-2019", correct: true},
            { text: "20-08-2018", correct: false},
            { text: "27-11-2019", correct: false},
            { text: "25-02-2019", correct: false},
        ]
    },
    {
        question: "Apa makanan kesukaan arkana?",
            answers: [
                { text: "Telor", correct: false},
                { text: "Ikan Nila", correct: false},
                { text: "Ayam Goreng", correct: false},
                { text: "Ikan Lele", correct: true},
            ]
        }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Skor kamu ${score} dari ${questions.length}!`;
    nextButton.innerHTML = "Main Lagi";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
})

startQuiz();