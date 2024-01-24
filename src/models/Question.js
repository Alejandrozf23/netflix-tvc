import mongoose from "mongoose";

const NewQuestionSchema = new mongoose.Schema(
  {
    uid: String,
    key: String,
    question: String,
    answer: String,
  },
  { timestamps: false }
);

const Question = mongoose.models.Question || mongoose.model('Question', NewQuestionSchema)

export default Question;
