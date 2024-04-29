import { Quiz } from "../Quiz";
import { genRandonString } from "../helpers";

class QuizManager {
  private quizes: Quiz[];
  constructor() {
    this.quizes = [];
  }
  getQuiz(roomId: string) {
    return this.quizes.find((quiz) => quiz.roomId === roomId) ?? null;
  }
  addQuiz(roomId: string) {
    if (this.getQuiz(roomId)) {
      console.log("Already have one quiz intiated in this room");
      return;
    }
    const quiz = new Quiz(roomId);
    this.quizes.push(quiz);
  }
  start(roomId: string) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No quiz Found ");
      return;
    }
    quiz.start();
  }
  addProblem(roomId: string, problem: Problem) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      console.log("No quiz Found ");
      return;
    }
    const newId = genRandonString(7);
    quiz.addProblem({
      ...problem,
      id: newId,
      startTime: new Date().getTime(),
      submissions: [],
    });
    console.log("Sucessfully added the Problem , Msg From QuizManager");
  }
  next(roomId: string) {
    const quiz = this.getQuiz(roomId);
    if (!quiz) {
      return;
    }
    quiz.next();
  }
  addUser(roomId: string, name: string) {
    return this.getQuiz(roomId)?.addUser(name);
  }
  submit(
    userId: string,
    roomId: string,
    problemId: string,
    markedOption: 0 | 1 | 2 | 3
  ) {
    this.getQuiz(roomId)?.submit(userId, problemId, markedOption);
  }
}
