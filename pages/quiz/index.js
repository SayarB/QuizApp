import { StylesProvider } from "@material-ui/core";
import { useRouter } from "next/router";
import styles from "../../styles/Quiz.module.css";
export default function Quiz({ quiz }) {
  return (
    <div>
      {quiz.questions.map((question) => (
        <div>
          <p>{atob(question.question)}</p>
          {question.options.map((option) => (
            <button
              className={
                styles.option + (option.isCorrect ? " " + styles.correct : "")
              }
            >
              {atob(option.text)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { category, number, difficulty } = context.query;
  const res = await fetch("https://opentdb.com/api_token.php?command=request");
  const data = await res.json();

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const response = await fetch(
    `https://opentdb.com/api.php?amount=${number || "10"}${
      category > 0 ? `&category=${category}` : ""
    }${difficulty != "all" ? `&difficulty=${difficulty}` : ""}&token=${
      data.token
    }&type=multiple&encode=base64`
  );
  const quizData = await response.json();
  let questions = [];
  quizData.results.forEach((res) => {
    let ques = { ...res };
    let options = [{ text: res.correct_answer, isCorrect: true }];
    res.incorrect_answers.forEach((incOpt) => {
      options.push({ text: incOpt, isCorrect: false });
    });

    options = shuffleArray(options);
    ques = { ...ques, options: options };
    questions.push(ques);
  });

  let quiz = { questions: questions };

  return {
    props: { quiz: quiz },
  };
}
