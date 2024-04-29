import { genRandonString } from "./helpers";

export class Quiz {
  private hasStarted: boolean;
  private activeProblem: Problem | null;
  private problems: Problem[];
  private hasEnded: boolean;
  private users: User[];
  public roomId: string;

  constructor(roomId: string) {
    this.hasStarted = false;
    this.roomId = roomId;
    this.activeProblem = null;
    this.problems = [];
    this.hasEnded = false;
    this.users = [];
  }

  addUser(name: string) {
    const id = genRandonString(8);
    this.users.push({
      id,
      name,
      points: 0,
    });
  }
  addProblem(problem: Problem) {
    this.problems.push(problem);
  }

  start() {
    this.hasStarted = true;
    this.activeProblem = this.problems[0];
    //Send the question
  }
  next() {
    if (this.activeProblem === null) {
      // If there's no active problem, do nothing
      console.log("No active problem");
      return;
    }

    const currentIndex = this.problems.indexOf(this.activeProblem);

    if (currentIndex === this.problems.length - 1) {
      // If the current active problem is the last one, end the quiz
      console.log("Quiz  problems has ended");

      this.endQuiz();
    } else {
      // Otherwise, set the next problem as active
      this.activeProblem = this.problems[currentIndex + 1];
      // Send the next question if needed
    }
  }
  endQuiz() {
    this.hasEnded = true;
    this.getLeaderboard();
  }
  sendLeaderboard() {
    console.log("Leather board has been consoled log");
  }
  submit(userId: string, problemId: string, markedOption: number) {
    const problem = this.problems.find((prob) => prob.id === problemId);
    const user = this.users.find((u) => u.id === userId);
    if (!problem || !user) {
      console.log(
        "No problem or User found ",
        "userId : ",
        userId,
        "problem: ",
        problem
      );
      return;
    }
    const existingSubmission = problem.submissions.find(
      (sub) => sub.userId === userId
    );
    if (existingSubmission) {
      console.log("Already made one submission , Can't Change it");
      return;
    }
    problem.submissions.push({
      userId,
      problemId,
      isCorrect: problem.correctOption === markedOption,
      markedOption,
    });
  }
  getLeaderboard() {
    return this.users
      .sort((a, b) => (a.points < b.points ? 1 : -1))
      .slice(0, 20);
  }
}
