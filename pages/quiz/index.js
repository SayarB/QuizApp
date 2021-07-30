import { useRouter } from "next/router";
export default function Quiz() {
  const {
    query: { category },
  } = useRouter();
  return <h1>Category id is {category}</h1>;
}
