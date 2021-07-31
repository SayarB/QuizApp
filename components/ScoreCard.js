import styles from "../styles/Quiz.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
export default function ScoreCard({
  totalQuestions,
  score,
  resetQuiz,
  retakeQuiz,
}) {
  return (
    <div className={styles.quiz_card}>
      <h1>
        {score}/{totalQuestions}
      </h1>
      <CircularProgress
        variant="static"
        value={(score / totalQuestions) * 100}
        size="200px"
        thickness={5}
        color={"hsl(240, 41%, 23%)"}
      />
      <p>Well Done</p>
      <div>
        <Button
          onClick={() => {
            retakeQuiz();
          }}
          color="primary"
          variant="outlined"
        >
          Retake
        </Button>
        <Button
          onClick={() => {
            resetQuiz();
          }}
          color="primary"
          variant="outlined"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
