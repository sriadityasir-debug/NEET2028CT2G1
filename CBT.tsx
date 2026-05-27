import { useEffect, useState, useMemo } from 'react';
import { Question, UserResponse, Subject, TestResult } from '../types';
import { UserCircle } from 'lucide-react';

interface CBTProps {
  questions: Question[];
  onSubmit: (result: TestResult, userResponses: UserResponse[]) => void;
}

export default function CBT({ questions, onSubmit }: CBTProps) {
  const [timeLeft, setTimeLeft] = useState(200 * 60); // 200 minutes
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeSubject, setActiveSubject] = useState<Subject>('Physics');
  
  const [responses, setResponses] = useState<UserResponse[]>(() => {
    return questions.map(q => ({
      questionId: q.id,
      selectedOptionIndex: null,
      status: 'not_visited'
    }));
  });

  // Mark first question as 'not_answered' when starting
  useEffect(() => {
    setResponses(prev => {
      const next = [...prev];
      if (next[0].status === 'not_visited') {
        next[0].status = 'not_answered';
      }
      return next;
    });
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Subject filtering for tabs
  const subjects: Subject[] = ['Physics', 'Chemistry', 'Botany', 'Zoology'];
  const questionsInActiveSubject = useMemo(() => questions.filter(q => q.subject === activeSubject), [questions, activeSubject]);

  const updateResponse = (questionId: number, update: Partial<UserResponse>) => {
    setResponses(prev => prev.map(r => r.questionId === questionId ? { ...r, ...update } : r));
  };

  const moveToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      const nextQ = questions[nextIndex];
      // Switch active subject if needed
      if (nextQ.subject !== activeSubject) {
         setActiveSubject(nextQ.subject);
      }
      // Update status if it was not visited
      setResponses(prev => {
         const newResp = [...prev];
         const r = newResp[nextIndex];
         if(r.status === 'not_visited') {
           r.status = 'not_answered';
         }
         return newResp;
      });
    }
  };

  const handleSaveAndNext = () => {
    const currentResp = responses.find(r => r.questionId === currentQuestion.id);
    if (currentResp?.selectedOptionIndex !== null) {
      updateResponse(currentQuestion.id, { status: 'answered' });
    } else {
      updateResponse(currentQuestion.id, { status: 'not_answered' });
    }
    moveToNextQuestion();
  };

  const handleClearResponse = () => {
    updateResponse(currentQuestion.id, { selectedOptionIndex: null, status: 'not_answered' });
  };

  const handleSaveAndMarkReview = () => {
    updateResponse(currentQuestion.id, { status: 'answered_marked_for_review' });
    moveToNextQuestion();
  };

  const handleMarkReviewAndNext = () => {
    updateResponse(currentQuestion.id, { status: 'marked_for_review' });
    moveToNextQuestion();
  };

  const jumpToQuestion = (qId: number) => {
    const idx = questions.findIndex(q => q.id === qId);
    setCurrentQuestionIndex(idx);
    setActiveSubject(questions[idx].subject);
    setResponses(prev => {
      const newResp = [...prev];
      if(newResp[idx].status === 'not_visited') {
        newResp[idx].status = 'not_answered';
      }
      return newResp;
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'not_visited': return 'bg-gray-100 border border-gray-400 text-black';
      case 'not_answered': return 'bg-red-500 text-white custom-clip-unanswered border-none';
      case 'answered': return 'bg-green-500 text-white custom-clip-answered border-none';
      case 'marked_for_review': return 'bg-purple-600 text-white rounded-full border-none';
      case 'answered_marked_for_review': return 'bg-purple-600 text-white rounded-full relative overflow-visible border-none after:content-[""] after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:bg-green-400 after:rounded-full';
      default: return 'bg-gray-100';
    }
  };

  const getCounts = () => {
    const counts = { not_visited: 0, not_answered: 0, answered: 0, marked_for_review: 0, answered_marked_for_review: 0 };
    responses.forEach(r => counts[r.status]++);
    return counts;
  };
  const counts = getCounts();

  const handleFinalSubmit = () => {
    if(timeLeft > 0 && !window.confirm("Are you sure you want to submit the test?")) return;
    
    let totalMarks = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    responses.forEach(r => {
      const q = questions.find(qu => qu.id === r.questionId);
      if (!q) return;

      const isEvaluated = r.status === 'answered' || r.status === 'answered_marked_for_review';
      
      if (isEvaluated && r.selectedOptionIndex !== null) {
        if (r.selectedOptionIndex === q.correctOptionIndex) {
          correctCount++;
          totalMarks += 4;
        } else {
          incorrectCount++;
          totalMarks -= 1;
        }
      } else {
        unattemptedCount++;
      }
    });

    const percentage = ((totalMarks) / (questions.length * 4)) * 100;
    
    // Calculate weak topics
    const topicScores: Record<string, { total: number, correct: number }> = {};
    responses.forEach(r => {
      const q = questions.find(qu => qu.id === r.questionId);
      if(!q) return;
      if (!topicScores[q.topic]) topicScores[q.topic] = { total: 0, correct: 0 };
      topicScores[q.topic].total++;
      
      const isEvaluated = r.status === 'answered' || r.status === 'answered_marked_for_review';
      if (isEvaluated && r.selectedOptionIndex !== null && r.selectedOptionIndex === q.correctOptionIndex) {
        topicScores[q.topic].correct++;
      }
    });

    const weakTopics = Object.keys(topicScores).filter(t => {
       const score = topicScores[t].correct / topicScores[t].total;
       return score < 0.5; // less than 50% accuracy means weak
    });

    import('../data/colleges').then(module => {
      const rank = module.estimateRank(totalMarks);
      const prediction = module.getCollegePrediction(rank);

      const result: TestResult = {
        totalMarks: questions.length * 4,
        obtainedMarks: totalMarks,
        correctCount,
        incorrectCount,
        unattemptedCount,
        percentage: Math.max(0, percentage),
        predictions: `Estimated AIR: ${rank} | ${prediction.college}`,
        motivation: prediction.motivation,
        weakTopics
      };
      onSubmit(result, responses);
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 border-t-4 border-blue-900 font-sans overflow-hidden">
      {/* Top Header */}
      <header className="bg-blue-800 text-white flex justify-between items-center px-4 py-2 text-sm shadow-md z-10 shrink-0">
        <div className="font-bold">NEET (UG) - 2026</div>
        <div className="flex gap-4 items-center">
          <div className="font-mono bg-blue-900 px-3 py-1 rounded text-red-100 font-bold tracking-widest border border-blue-700">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Area - Question Side */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Subject Tabs */}
          <div className="flex border-b border-gray-300 bg-gray-100 shrink-0">
            {subjects.map(subj => (
              <button
                key={subj}
                onClick={() => {
                  const firstQ = questions.find(q => q.subject === subj);
                  if (firstQ) jumpToQuestion(firstQ.id);
                }}
                className={`px-6 py-2 text-sm font-bold border-r border-gray-300 transition-colors ${activeSubject === subj ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Question Area */}
          <div className="flex-1 overflow-auto p-6">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold text-gray-800">Question {currentQuestion.numericId}</h2>
              <span className="text-sm font-medium text-blue-800 bg-blue-100 px-2 py-1 rounded">Subject: {currentQuestion.subject}</span>
            </div>
            
            <div className="text-lg text-gray-800 mb-8 max-w-4xl leading-relaxed whitespace-pre-wrap">
              {currentQuestion.text}
            </div>

            <div className="space-y-4 max-w-3xl">
              {currentQuestion.options.map((opt, idx) => {
                const currentResp = responses.find(r => r.questionId === currentQuestion.id);
                const isSelected = currentResp?.selectedOptionIndex === idx;
                
                return (
                  <label key={idx} className={`flex items-center gap-4 p-3 border rounded cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-blue-600' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name={`q-${currentQuestion.id}`}
                      checked={isSelected}
                      onChange={() => updateResponse(currentQuestion.id, { selectedOptionIndex: idx })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-gray-700 font-medium">
                      ({String.fromCharCode(65 + idx)}) {opt}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bg-gray-100 border-t border-gray-300 p-4 flex gap-4 shrink-0 shadow-inner flex-wrap">
            <button onClick={handleSaveAndNext} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-bold rounded shadow-sm text-sm">Save & Next</button>
            <button onClick={handleClearResponse} className="bg-white hover:bg-gray-100 text-black border border-gray-400 px-4 py-2 font-bold rounded shadow-sm text-sm">Clear Response</button>
            <button onClick={handleSaveAndMarkReview} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 font-bold rounded shadow-sm text-sm">Save & Mark for Review</button>
            <button onClick={handleMarkReviewAndNext} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-bold rounded shadow-sm text-sm">Mark for Review & Next</button>
            <div className="flex-1"></div>
            <button onClick={handleFinalSubmit} className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 font-bold rounded shadow-md text-sm">Submit Test</button>
          </div>
        </div>

        {/* Right Sidebar - Question Palette */}
        <div className="w-72 bg-blue-50 border-l border-blue-200 flex flex-col shrink-0">
          <div className="p-4 bg-white border-b border-gray-200 flex items-center gap-3">
            <UserCircle size={48} className="text-gray-400" />
            <div>
              <div className="font-bold text-gray-800 text-sm">Dr.Aditya Srivastava</div>
              <div className="text-xs text-gray-500">Roll No: 2026101</div>
            </div>
          </div>
          
          <div className="p-4 grid grid-cols-2 gap-y-2 gap-x-2 text-xs font-semibold bg-white border-b border-gray-200 shadow-sm shrink-0">
            <div className="flex items-center gap-1"><div className="w-5 h-5 flex items-center justify-center bg-gray-100 border border-gray-400">{counts.not_visited}</div> Not Visited</div>
            <div className="flex items-center gap-1"><div className="w-5 h-5 flex items-center justify-center text-white bg-red-500 custom-clip-unanswered">{counts.not_answered}</div> Not Answered</div>
            <div className="flex items-center gap-1"><div className="w-5 h-5 flex items-center justify-center text-white bg-green-500 custom-clip-answered">{counts.answered}</div> Answered</div>
            <div className="flex items-center gap-1"><div className="w-5 h-5 flex items-center justify-center text-white bg-purple-600 rounded-full">{counts.marked_for_review}</div> Marked w/o Ans</div>
            <div className="flex items-center gap-1 col-span-2 relative">
               <div className="w-5 h-5 flex items-center justify-center text-white bg-purple-600 rounded-full">{counts.answered_marked_for_review}</div> 
               <div className="absolute left-[14px] top-3 w-1.5 h-1.5 bg-green-400 rounded-full border border-white"></div>
               <span className="ml-1">Ans & Marked for Review</span>
            </div>
          </div>

          <div className="bg-blue-600 text-white text-sm font-bold p-2 text-center shadow-inner">
            {activeSubject}
          </div>

          <div className="flex-1 overflow-auto p-4 custom-scrollbar bg-blue-50/50">
            <h3 className="font-bold text-gray-700 mb-3 text-sm">Choose a Question</h3>
            <div className="grid grid-cols-4 gap-2">
              {questionsInActiveSubject.map((q) => {
                const r = responses.find(resp => resp.questionId === q.id)!;
                return (
                  <button
                    key={q.id}
                    onClick={() => jumpToQuestion(q.id)}
                    className={`w-10 h-10 flex items-center justify-center font-bold text-sm shadow-sm transition-transform hover:scale-105 ${getStatusClass(r.status)}`}
                  >
                    {q.numericId}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
