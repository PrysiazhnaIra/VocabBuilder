import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom";
import WellDoneModal from "../../components/WellDoneModal/WellDoneModal";
import {
  useGetTasksQuery,
  useSubmitAnswersMutation,
} from "../../redux/api/wordApi";
import type { TrainingAnswer, TrainingResult } from "../../types/types";
import s from "./TrainingPage.module.css";

export default function TrainingPage() {
  const navigate = useNavigate();
  const { data: tasksResponse, isLoading, isError } = useGetTasksQuery();
  const [submitAnswers] = useSubmitAnswersMutation();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [answers, setAnswers] = useState<TrainingAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<TrainingResult | null>(null);

  const tasks = tasksResponse?.words || [];

  useEffect(() => {
    console.log("Training Tasks Response:", tasksResponse);
    console.log("Parsed Tasks:", tasks);
  }, [tasksResponse, tasks]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load training tasks");
    }
  }, [isError]);

  const handleNext = () => {
    if (tasks && currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
    }
  };

  const handleSave = async (translation: string) => {
    if (!tasks || tasks.length === 0) return;

    const currentTask = tasks[currentTaskIndex];

    // Add answer to the list if translation is provided
    if (translation.trim()) {
      const newAnswer: TrainingAnswer = {
        _id: currentTask._id,
        en: translation, // User's English translation
        ua: currentTask.ua, // Original Ukrainian word
      };
      setAnswers((prev) => [...prev, newAnswer]);
    }

    // If this is the last task, submit all answers
    if (currentTaskIndex === tasks.length - 1) {
      try {
        const finalAnswers = translation.trim()
          ? [
              ...answers,
              {
                _id: currentTask._id,
                en: translation,
                ua: currentTask.ua,
              },
            ]
          : answers;

        const result = await submitAnswers(finalAnswers).unwrap();
        setResults(result);
        setShowResults(true);
      } catch (error) {
        toast.error(
          "Failed to save your progress. Redirecting to dictionary..."
        );
        setTimeout(() => navigate("/dictionary"), 2000);
      }
    } else {
      // Move to next task
      handleNext();
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    navigate("/dictionary");
  };

  const handleAddWord = () => {
    navigate("/dictionary", { state: { openAddModal: true } });
  };

  const progress =
    tasks && tasks.length > 0
      ? Math.round(((currentTaskIndex + 1) / tasks.length) * 100)
      : 0;

  if (isLoading) {
    return (
      <div className={s.container}>
        <div className={s.loading}>Loading training tasks...</div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className={s.container}>
        <div className={s.emptyState}>
          <div className={s.illustration}>
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet="/images/paper_tab_desk.png 1x, /images/paper_tab_desk_2x.png 2x"
              />
              <img
                src="/images/paper_mob.png"
                srcSet="/images/paper_mob.png 1x, /images/paper_mob_2x.png 2x"
                alt="No words to learn"
                className={s.emptyImage}
              />
            </picture>
          </div>
          <h2 className={s.emptyTitle}>
            You don't have a single word to learn right now.
          </h2>
          <p className={s.emptyDescription}>
            Please create or add a word to start the workout. We want to
            improve your vocabulary and develop your knowledge, so please share
            the words you are interested in adding to your study.
          </p>
          <button onClick={handleAddWord} className={s.addWordButton}>
            Add word
          </button>
          <button onClick={() => navigate("/dictionary")} className={s.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <ProgressBar progress={progress} size={26} strokeWidth={3} />
      </div>

      <TrainingRoom
        word={tasks[currentTaskIndex].ua}
        onNext={currentTaskIndex < tasks.length - 1 ? handleNext : undefined}
        onSave={handleSave}
        isLastTask={currentTaskIndex === tasks.length - 1}
      />

      {showResults && results && (
        <WellDoneModal results={results} onClose={handleCloseResults} />
      )}
    </div>
  );
}
