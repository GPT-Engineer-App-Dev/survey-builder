import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Create Your Survey</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Easily create and share surveys with our intuitive survey builder. Get started now!
      </p>
      <Button size="lg" onClick={() => navigate("/create-survey")}>
        Start Survey
      </Button>
    </div>
  );
};

export default Index;