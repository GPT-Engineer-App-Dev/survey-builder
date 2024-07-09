import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

const CreateSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerType, setAnswerType] = useState("text");
  const [textAnswer, setTextAnswer] = useState("");
  const [numericAnswer, setNumericAnswer] = useState("");
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(100);
  const [sliderStep, setSliderStep] = useState(1);
  const [sliderDefault, setSliderDefault] = useState(50);

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      const questionObject = {
        text: newQuestion,
        type: answerType,
      };

      switch (answerType) {
        case "text":
          questionObject.answer = textAnswer;
          break;
        case "number":
          questionObject.answer = numericAnswer;
          break;
        case "slider":
          questionObject.sliderConfig = {
            min: sliderMin,
            max: sliderMax,
            step: sliderStep,
            default: sliderDefault,
          };
          break;
      }

      setQuestions([...questions, questionObject]);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewQuestion("");
    setAnswerType("text");
    setTextAnswer("");
    setNumericAnswer("");
    setSliderMin(0);
    setSliderMax(100);
    setSliderStep(1);
    setSliderDefault(50);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const sendSurvey = () => {
    const surveyBody = questions
      .map((q, index) => {
        let answerDetails = "";
        switch (q.type) {
          case "text":
            answerDetails = `Answer: ${q.answer}`;
            break;
          case "number":
            answerDetails = `Answer: ${q.answer}`;
            break;
          case "slider":
            answerDetails = `Slider range: ${q.sliderConfig.min} to ${q.sliderConfig.max}, Step: ${q.sliderConfig.step}, Default: ${q.sliderConfig.default}`;
            break;
        }
        return `${index + 1}. ${q.text} (${q.type})\n${answerDetails}`;
      })
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
            <span>{question.text} ({question.type})</span>
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
              <SelectItem value="slider">Slider</SelectItem>
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
        {answerType === "slider" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sliderMin">Min Value</Label>
              <Input
                id="sliderMin"
                type="number"
                value={sliderMin}
                onChange={(e) => setSliderMin(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="sliderMax">Max Value</Label>
              <Input
                id="sliderMax"
                type="number"
                value={sliderMax}
                onChange={(e) => setSliderMax(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="sliderStep">Step</Label>
              <Input
                id="sliderStep"
                type="number"
                value={sliderStep}
                onChange={(e) => setSliderStep(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="sliderDefault">Default Value</Label>
              <Input
                id="sliderDefault"
                type="number"
                value={sliderDefault}
                onChange={(e) => setSliderDefault(Number(e.target.value))}
              />
            </div>
          </div>
        )}
        {answerType === "slider" && (
          <div className="mt-4">
            <Label>Preview</Label>
            <Slider
              min={sliderMin}
              max={sliderMax}
              step={sliderStep}
              defaultValue={[sliderDefault]}
              className="mt-2"
            />
          </div>
        )}
        <Button onClick={addQuestion}>Add Question</Button>
      </div>
      
      <Button onClick={sendSurvey} className="w-full">Send Survey</Button>
    </div>
  );
};

export default CreateSurvey;