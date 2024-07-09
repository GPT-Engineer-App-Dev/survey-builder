import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

const CreateSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerType, setAnswerType] = useState("text");
  const [textAnswer, setTextAnswer] = useState("");
  const [numericAnswer, setNumericAnswer] = useState("");

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([...questions, { 
        text: newQuestion, 
        type: answerType,
        answer: answerType === "text" ? textAnswer : numericAnswer
      }]);
      setNewQuestion("");
      setAnswerType("text");
      setTextAnswer("");
      setNumericAnswer("");
    }
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const sendSurvey = () => {
    const surveyBody = questions
      .map((q, index) => `${index + 1}. ${q.text} (${q.type === "text" ? "Plain Text" : "Numeric"})\nAnswer: ${q.answer}`)
      .join("\n\n");
    const mailtoLink = `mailto:?subject=New Survey&body=${encodeURIComponent(surveyBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Survey Creation</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        {questions.map((question, index) => (
          <div key={index} className="flex items-center justify-between mb-2 p-2 bg-secondary rounded">
            <span>{question.text} ({question.type === "text" ? "Plain Text" : "Numeric"})</span>
            <Button variant="destructive" size="icon" onClick={() => removeQuestion(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col gap-4 mb-6">
        <Input
          placeholder="Enter your question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <div className="flex gap-4">
          <Select value={answerType} onValueChange={setAnswerType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Answer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Plain Text</SelectItem>
              <SelectItem value="number">Numeric</SelectItem>
            </SelectContent>
          </Select>
          {answerType === "text" && (
            <div className="flex-grow">
              <Label htmlFor="textAnswer" className="sr-only">Text Answer</Label>
              <Input
                id="textAnswer"
                placeholder="Enter sample text answer"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
              />
            </div>
          )}
          {answerType === "number" && (
            <div className="w-32">
              <Label htmlFor="numericAnswer" className="sr-only">Numeric Answer</Label>
              <Input
                id="numericAnswer"
                type="number"
                placeholder="Enter number"
                value={numericAnswer}
                onChange={(e) => setNumericAnswer(e.target.value)}
              />
            </div>
          )}
        </div>
        <Button onClick={addQuestion}>Add Question</Button>
      </div>
      
      <Button onClick={sendSurvey} className="w-full">Send Survey</Button>
    </div>
  );
};

export default CreateSurvey;