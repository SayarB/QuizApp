import styles from "../styles/Quiz.module.css";
export default function QuizCard({ question, number, optionClickHandler }) {
  const decode = (text) => {
    return atob(text);
  };

  return (
    <div className={styles.quiz_card + " " + styles.quiz_question}>
      <div className={styles.text_div}>
        <p>{decode(question.question)}</p>
      </div>
      <div className={styles.options_div}>
        {question.options.map((option) => (
          <button
            className={
              (option.isCorrect ? styles.correct : "") +
              " " +
              styles.option_button
            }
            onClick={() => {
              optionClickHandler(option.isCorrect);
            }}
          >
            {decode(option.text)}
          </button>
        ))}
      </div>
    </div>
  );
}
