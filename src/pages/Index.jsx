import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary/10 to-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-6 text-primary">Create Your Survey</h1>
        <p className="text-xl mb-8 text-center max-w-md text-muted-foreground">
          Easily create and share surveys with our intuitive survey builder. Get started now!
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/create-survey")}
          className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Start Survey
        </Button>
      </motion.div>
    </div>
  );
};

export default Index;