import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

const CreateSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerType, setAnswerType] = useState("text");

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([...questions, { text: newQuestion, type: answerType }]);
      setNewQuestion("");
      setAnswerType("text");
    }
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const sendSurvey = () => {
    const surveyBody = questions
      .map((q, index) => `${index + 1}. ${q.text} (${q.type === "text" ? "Plain Text" : "Numeric"})`)
      .join("\n");
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
      
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Enter your question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="flex-grow"
        />
        <Select value={answerType} onValueChange={setAnswerType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Answer type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Plain Text</SelectItem>
            <SelectItem value="number">Numeric</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addQuestion}>Add</Button>
      </div>
      
      <Button onClick={sendSurvey} className="w-full">Send Survey</Button>
    </div>
  );
};

export default CreateSurvey;