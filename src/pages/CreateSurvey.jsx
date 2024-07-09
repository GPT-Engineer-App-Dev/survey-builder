import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Trash2, Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const CreateSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
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
      setCurrentStep(questions.length + 1);
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
    if (currentStep > index) {
      setCurrentStep(currentStep - 1);
    }
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

  const nextStep = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Create Your Survey</h1>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep < questions.length ? (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">{questions[currentStep].text}</h2>
                {questions[currentStep].type === "text" && (
                  <Input placeholder="Enter your answer" className="text-lg" />
                )}
                {questions[currentStep].type === "number" && (
                  <Input type="number" placeholder="Enter a number" className="text-lg" />
                )}
                {questions[currentStep].type === "slider" && (
                  <Slider
                    min={questions[currentStep].sliderConfig.min}
                    max={questions[currentStep].sliderConfig.max}
                    step={questions[currentStep].sliderConfig.step}
                    defaultValue={[questions[currentStep].sliderConfig.default]}
                    className="mt-4"
                  />
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 mb-6">
                  <Input
                    placeholder="Enter your question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="text-lg"
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
                  <Button onClick={addQuestion} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-between mt-8">
        <Button onClick={prevStep} disabled={currentStep === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={nextStep} disabled={currentStep >= questions.length}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <Button onClick={sendSurvey} className="w-full mt-8 text-lg py-6">Send Survey</Button>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Survey Questions</h2>
        <AnimatePresence>
          {questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between mb-2 p-3 bg-secondary rounded-lg"
            >
              <span className="text-sm">{question.text} ({question.type})</span>
              <Button variant="destructive" size="icon" onClick={() => removeQuestion(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreateSurvey;