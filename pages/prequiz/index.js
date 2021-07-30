import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
import styles from "../../styles/PreQuiz.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

export default function PreQuiz({ category }) {
  const router = useRouter();
  const [numOfQuestions, setNumOfQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("all");

  const difficulties = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "easy",
      label: "Easy",
    },
    {
      value: "medium",
      label: "Medium",
    },
    {
      value: "hard",
      label: "Hard",
    },
  ];
  return (
    <div className={styles.prequiz_container}>
      <div className={styles.prequiz_form}>
        <TextField
          id="standard-select-currency"
          select
          label="Difficulty"
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
          }}
          helperText="Select your Difficulty"
          margin="normal"
        >
          {difficulties.map((diff) => (
            <MenuItem key={diff.value} value={diff.value}>
              {diff.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="standard-number"
          label="Number"
          type="number"
          value={numOfQuestions}
          onChange={(e) => {
            setNumOfQuestions(e.target.value);
          }}
          margin="normal"
        />
        <Button
          onClick={() => {
            router.push({
              pathname: "/quiz",
              query: {
                category: category.id,
                difficulty: difficulty,
                number: numOfQuestions,
              },
            });
          }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { categoryid, categoryname } = context.query;

  return {
    props: {
      category: {
        id: categoryid,
        name: categoryname,
      },
    },
  };
}
