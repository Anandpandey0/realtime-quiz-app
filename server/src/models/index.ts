interface Submission {
  userId: string;
  problemId: string;
  isCorrect: boolean;
  markedOption: number;
}

interface Problem {
  id: string;
  title: string;
  desc: string;
  options: {
    id: number;
    title: string;
  }[]; //  1 | 2|3|4
  correctOption: number; //  1 | 2|3|4
  startTime: number;
  submissions: Submission[];
}
interface User {
  id: string;
  name: string;
  points: number;
}
