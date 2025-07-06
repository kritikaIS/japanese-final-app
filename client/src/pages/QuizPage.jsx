import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { HiX, HiCheck, HiArrowRight } from 'react-icons/hi';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsFillSkipForwardFill } from 'react-icons/bs';
import { FeedbackMessage, Button } from '../components';
import { CompleteScreen } from './';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_EXPERIENCE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import bgSignal from '../assets/bannerBG/bg-signal.svg';

const QuizPage = ({ quiz }) => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const [selectedOption, setSelectedOption] = useState(null);
  const [questionState, setQuestionState] = useState(null);
  const [question, setQuestion] = useState(quiz.generateQuestion());
  const [quizComplete, setQuizComplete] = useState(false);
  const progress = quiz.getProgress();

  // check answer and update progress
  const checkAnswer = (answer) => {
    if (answer === question.answer) {
      setQuestionState('correct');
      quiz.incrementNumCorrect();
      quiz.incrementProgress();
    } else {
      setQuestionState('incorrect');
      quiz.incrementNumIncorrect();
      quiz.decrementProgress();
    }
  };

  // cycle to next question, or complete quiz
  const cycleNextQuestion = () => {
    if (progress < 100) {
      setQuestion(quiz.generateQuestion());
      setSelectedOption(null);
      setQuestionState(null);
    } else {
      const { xp } = quiz.getScoreAndXP();
      updateUserExperience(xp);
    }
  };

  // get the user's data from the server
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  const [updateExperience, { loading }] = useMutation(UPDATE_EXPERIENCE);

  const updateUserExperience = async (experience) => {
    let currentExperience = user.experience;
    currentExperience += experience;
    try {
      await updateExperience({ variables: { experience: currentExperience } });
    } catch (error) {
      console.error(error);
    } finally {
      setQuizComplete(true);
      setQuestionState(null);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center hero-bg py-6 px-2 relative overflow-x-hidden">
      {/* Quiz Card */}
      {!quizComplete && (
        <div className="w-full max-w-xl mx-auto bg-white dark:bg-palette-6 rounded-[2.5rem] shadow-2xl border-4 border-palette-4/20 dark:border-palette-5/30 p-5 md:p-8 flex flex-col gap-6 relative animate-float-card">
          {/* Header: Back and Progress */}
          <div className="flex items-center gap-2 mb-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="hover:opacity-60 p-2 rounded-full bg-palette-4/10 text-palette-4"
            >
              <HiX className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <div className="w-full h-4 bg-palette-2/40 dark:bg-palette-5/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-palette-4 to-palette-1 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span className="ml-2 font-bold text-palette-4 text-lg">{progress}%</span>
          </div>

          {/* Question */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-palette-4 text-lg font-bold uppercase tracking-wider">Question</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-palette-1 dark:text-palette-2 text-center mb-2 animate-pop">
              <span>{question.questionDirection}</span>{' '}
              <span className="text-palette-4">"{question.questionSubject}"</span>
            </h1>
          </div>

          {/* Choices */}
          <div className="flex flex-col gap-4 mt-2">
            {question.choices.map((choice, idx) => {
              let btnColor = 'bg-white dark:bg-palette-5 border-2 border-palette-3/20 dark:border-palette-5/30';
              if (selectedOption === choice && !questionState) btnColor = 'bg-palette-4/80 text-white border-palette-4 scale-105';
              if (questionState === 'correct' && choice === question.answer) btnColor = 'bg-green-400 text-white border-green-500 scale-105';
              if (questionState === 'incorrect' && selectedOption === choice) btnColor = 'bg-red-400 text-white border-red-500 scale-105';
              return (
                <button
                  key={`id-${choice}`}
                  type="button"
                  className={`w-full py-4 rounded-full font-bold text-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-palette-4 ${btnColor} animate-pop`}
                  onClick={() => setSelectedOption(choice)}
                  disabled={!!questionState}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-between">
            {!questionState ? (
              <Button
                type="button"
                btnStyle="flex justify-center items-center gap-2 text-palette-4 border-2 border-palette-4 bg-transparent hover:bg-palette-4/10 dark:hover:bg-palette-5/20 px-6 py-2 rounded-full font-bold"
                onClick={() => checkAnswer('skip')}
                title="Skip"
                icon={<BsFillSkipForwardFill className="w-6 h-6" />}
              />
            ) : (
              <FeedbackMessage
                questionState={questionState}
                answer={question.answer}
              />
            )}

            {/* Check and Next Buttons */}
            {!questionState ? (
              <Button
                type="button"
                btnStyle={`flex justify-center items-center gap-2 px-8 py-3 rounded-full font-bold text-lg shadow-md transition-all duration-200
                  ${!selectedOption
                    ? 'text-gray-500 bg-gray-300'
                    : 'text-white bg-palette-4 hover:bg-palette-1 focus:ring-4 focus:ring-palette-4/40'}`}
                onClick={() => checkAnswer(selectedOption)}
                disabled={!selectedOption}
                title="Check"
                icon={<HiCheck className="w-6 h-6" />}
              />
            ) : (
              <Button
                type="button"
                btnStyle={`flex justify-center items-center gap-2 px-8 py-3 rounded-full font-bold text-lg shadow-md transition-all duration-200
                  text-white bg-palette-4 hover:bg-palette-1 focus:ring-4 focus:ring-palette-4/40`}
                onClick={cycleNextQuestion}
                title={loading ? '' : 'Next'}
                icon={loading ? <AiOutlineLoading className="animate-spin h-6 w-6 mx-auto" /> : <HiArrowRight className="w-5 h-5" />}
              />
            )}
          </div>
        </div>
      )}

      {/* Quiz Completion Screen */}
      {quizComplete && <CompleteScreen quiz={quiz} />}
      {/* Animations */}
      <style>{`
        .animate-float-card {
          animation: floatCard 3s ease-in-out infinite alternate;
        }
        @keyframes floatCard {
          0% { transform: translateY(0); box-shadow: 0 8px 32px 0 rgba(80,80,160,0.18); }
          100% { transform: translateY(-12px) scale(1.01); box-shadow: 0 16px 48px 0 rgba(80,80,160,0.22); }
        }
        .animate-float {
          animation: floatBg 6s ease-in-out infinite alternate;
        }
        @keyframes floatBg {
          0% { transform: translate(-50%, -50%) scale(1); }
          100% { transform: translate(-50%, -54%) scale(1.04); }
        }
        .animate-float-bg1 {
          animation: floatBg1 7s ease-in-out infinite alternate;
        }
        @keyframes floatBg1 {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(16px) scale(1.04); }
        }
        .animate-float-bg2 {
          animation: floatBg2 8s ease-in-out infinite alternate;
        }
        @keyframes floatBg2 {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-18px) scale(1.03); }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-pop {
          animation: pop 0.3s cubic-bezier(.4,0,.2,1);
        }
        @keyframes pop {
          from { transform: scale(0.96); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default QuizPage;
