import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  saveQuestionToFile,
  mapDifficultyToWave,
  type QuestionData,
} from "@/lib/questionUtils";
import { toast } from "sonner";

interface Skill {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  color: string;
}

interface AddQuestionFormProps {
  skills: Skill[];
  onQuestionAdded: () => void;
}

const AddQuestionForm = ({ skills, onQuestionAdded }: AddQuestionFormProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuestionData>({
    question: "",
    choices: ["", "", "", ""],
    correctAnswer: "",
    skill: "",
    grade: "",
    level: "",
  });

  const difficultyLevels = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
    { value: "expert", label: "Expert" },
  ];

  const grades = [
    { value: "1", label: "Grade 1" },
    { value: "2", label: "Grade 2" },
    { value: "3", label: "Grade 3" },
    { value: "4", label: "Grade 4" },
    { value: "5", label: "Grade 5" },
    { value: "6", label: "Grade 6" },
    { value: "7", label: "Grade 7" },
    { value: "8", label: "Grade 8" },
    { value: "9", label: "Grade 9" },
    { value: "10", label: "Grade 10" },
    { value: "11", label: "Grade 11" },
    { value: "12", label: "Grade 12" },
  ];

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...formData.choices];
    newChoices[index] = value;
    setFormData({ ...formData, choices: newChoices });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    if (!formData.correctAnswer) {
      toast.error("Please select the correct answer");
      return;
    }

    if (!formData.skill) {
      toast.error("Please select a skill");
      return;
    }

    if (!formData.grade) {
      toast.error("Please select a grade");
      return;
    }

    if (!formData.level) {
      toast.error("Please select a difficulty level");
      return;
    }

    // Check if all choices are filled
    if (formData.choices.some((choice) => !choice.trim())) {
      toast.error("Please fill in all choices");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save question to backend
      const result = await saveQuestionToFile(formData);

      if (result.success) {
        // Show success toaster with review message
        toast.success("Question Submitted Successfully!", {
          description:
            "Your question has been submitted for review. It will be added to the question bank after approval.",
          duration: 5000,
        });

        // Reset form
        setFormData({
          question: "",
          choices: ["", "", "", ""],
          correctAnswer: "",
          skill: "",
          grade: "",
          level: "",
        });

        setOpen(false);
        onQuestionAdded();
      } else {
        toast.error(result.message || "Failed to submit question");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      question: "",
      choices: ["", "", "", ""],
      correctAnswer: "",
      skill: "",
      grade: "",
      level: "",
    });
    setOpen(false);
  };

  const getSelectedSkillName = () => {
    const skill = skills.find((s) => s.id === formData.skill);
    return skill ? skill.title : "Unknown Skill";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit New Question</DialogTitle>
          <DialogDescription>
            Create a new math question with LaTeX support. Your question will be
            reviewed and approved before being added to the question bank.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="question">Question Text</Label>
            <Textarea
              id="question"
              placeholder="Enter your question here. You can use LaTeX for equations: $x^2 + 2x + 1 = 0$"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="min-h-[100px]"
            />
            <p className="text-xs text-gray-500">
              Use LaTeX syntax for equations: $equation$ for inline,
              $$equation$$ for block
            </p>
          </div>

          {/* Choices */}
          <div className="space-y-4">
            <Label>Answer Choices</Label>
            <RadioGroup
              value={formData.correctAnswer}
              onValueChange={(value) =>
                setFormData({ ...formData, correctAnswer: value })
              }
            >
              <div className="grid gap-3">
                {formData.choices.map((choice, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={choice} id={`choice-${index}`} />
                    <Input
                      placeholder={`Choice ${String.fromCharCode(65 + index)}`}
                      value={choice}
                      onChange={(e) =>
                        handleChoiceChange(index, e.target.value)
                      }
                    />
                    <Badge variant="outline" className="text-xs">
                      {String.fromCharCode(65 + index)}
                    </Badge>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Skill Selection */}
            <div className="space-y-2">
              <Label htmlFor="skill">Skill</Label>
              <Select
                value={formData.skill}
                onValueChange={(value) =>
                  setFormData({ ...formData, skill: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.map((skill) => (
                    <SelectItem key={skill.id} value={skill.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{skill.title}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "ml-2 text-xs",
                            skill.difficulty === "Easy" &&
                              "border-green-200 text-green-700 bg-green-50",
                            skill.difficulty === "Medium" &&
                              "border-yellow-200 text-yellow-700 bg-yellow-50",
                            skill.difficulty === "Hard" &&
                              "border-red-200 text-red-700 bg-red-50"
                          )}
                        >
                          {skill.difficulty}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Grade Selection */}
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select
                value={formData.grade}
                onValueChange={(value) =>
                  setFormData({ ...formData, grade: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade.value} value={grade.value}>
                      {grade.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-2">
              <Label htmlFor="level">Difficulty Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  setFormData({ ...formData, level: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionForm;
