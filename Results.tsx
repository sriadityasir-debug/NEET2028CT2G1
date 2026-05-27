import { Question, TestResult, UserResponse } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultsProps {
  questions: Question[];
  responses: UserResponse[];
  result: TestResult;
  onLogout: () => void;
}

export default function Results({ questions, responses, result, onLogout }: ResultsProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans print:bg-white print:m-0">
      <div className="max-w-5xl mx-auto py-8 px-4 print:p-0 print:max-w-none">
        
        {/* Actions (Hidden in Print) */}
        <div className="flex justify-end gap-4 mb-6 print:hidden">
          <button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-md">
            Save as PDF / Print
          </button>
          <button onClick={onLogout} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded shadow-md">
            Logout
          </button>
        </div>

        {/* Scorecard Header */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8 border-t-8 border-blue-800 print:shadow-none print:border-t-0 print:border-b-2 print:border-black print:rounded-none">
          <div className="flex justify-between items-start border-b pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900">NEET (UG) 2026 MOCK TEST</h1>
              <h2 className="text-xl font-bold text-gray-600 mt-1">NTA SIMULATION SCORECARD</h2>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-500 uppercase">Candidate Name</p>
              <p className="text-xl font-black text-blue-900">Dr.Aditya Srivastava</p>
              <p className="text-sm font-bold text-gray-500 uppercase mt-2">Roll Number</p>
              <p className="text-lg font-bold">2026101</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 print:border-black print:bg-white">
              <p className="text-sm font-bold text-blue-800 uppercase print:text-black">Total Marks</p>
              <p className="text-3xl font-black text-blue-900 print:text-black">{result.totalMarks}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 print:border-black print:bg-white">
              <p className="text-sm font-bold text-green-800 uppercase print:text-black">Obtained Marks</p>
              <p className="text-3xl font-black text-green-900 print:text-black">{result.obtainedMarks}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 print:border-black print:bg-white">
              <p className="text-sm font-bold text-yellow-800 uppercase print:text-black">Percentage</p>
              <p className="text-3xl font-black text-yellow-900 print:text-black">{result.percentage.toFixed(2)}%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 print:border-black print:bg-white">
              <p className="text-sm font-bold text-purple-800 uppercase print:text-black">Accuracy</p>
              <p className="text-3xl font-black text-purple-900 print:text-black">
                {result.correctCount + result.incorrectCount > 0 
                  ? ((result.correctCount / (result.correctCount + result.incorrectCount)) * 100).toFixed(1) + '%' 
                  : 'N/A'
                }
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-8 text-sm font-bold justify-center print:border-b print:pb-4 print:border-black">
            <span className="text-green-600 flex items-center gap-1 print:text-black"><CheckCircle size={16}/> Correct: {result.correctCount}</span>
            <span className="text-red-600 flex items-center gap-1 print:text-black"><XCircle size={16}/> Incorrect: {result.incorrectCount}</span>
            <span className="text-gray-500 uppercase print:text-black">Unattempted: {result.unattemptedCount}</span>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 print:bg-white print:border-black">
            <h3 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">Analysis & Prediction</h3>
            <p className="text-blue-800 font-bold text-lg mb-2">{result.predictions}</p>
            <p className="text-gray-700 italic border-l-4 border-blue-500 pl-4 my-4 font-serif text-lg">"{result.motivation}"</p>
            
            {result.weakTopics.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold text-sm uppercase text-gray-600">Topics needing immediate revision:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {result.weakTopics.map(t => (
                    <span key={t} className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded print:border print:border-black print:bg-white">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg print:shadow-none print:p-0">
          <h2 className="text-2xl font-black mb-6 border-b pb-2 uppercase print:mt-8">Question Paper Review</h2>
          
          <div className="space-y-8">
            {questions.map((q) => {
              const resp = responses.find(r => r.questionId === q.id);
              const isEvaluated = resp && (resp.status === 'answered' || resp.status === 'answered_marked_for_review');
              const attempted = resp && resp.selectedOptionIndex !== null;
              
              const isCorrect = isEvaluated && attempted && resp.selectedOptionIndex === q.correctOptionIndex;
              const isWrong = isEvaluated && attempted && resp.selectedOptionIndex !== q.correctOptionIndex;
              const isSkipped = !isEvaluated || !attempted;

              // Only highlight wrong/skipped strongly as per requirements, but let's show all
              return (
                <div key={q.id} className={`p-4 rounded border ${isCorrect ? 'border-green-200 bg-green-50' : isWrong ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'} print:border-black print:bg-white print:break-inside-avoid print:mb-4`}>
                   <div className="flex justify-between items-start mb-2">
                     <span className="font-bold text-gray-700 bg-white px-2 py-1 rounded border shadow-sm print:border-none print:shadow-none">Question {q.numericId} - {q.subject}</span>
                     {isCorrect && <span className="flex items-center gap-1 text-green-600 font-bold bg-white px-2 py-1 rounded print:text-black"><CheckCircle size={18}/> +4 Marks</span>}
                     {isWrong && <span className="flex items-center gap-1 text-red-600 font-bold bg-white px-2 py-1 rounded print:text-black"><XCircle size={18}/> -1 Mark</span>}
                     {isSkipped && <span className="flex items-center gap-1 text-gray-500 font-bold bg-white px-2 py-1 rounded print:text-black">Skipped (0 Marks)</span>}
                   </div>
                   
                   <p className="text-gray-900 font-medium mb-4">{q.text}</p>
                   
                   <div className="space-y-2">
                     {q.options.map((opt, idx) => {
                       const isSelectedOption = resp?.selectedOptionIndex === idx;
                       const isActualCorrectOption = q.correctOptionIndex === idx;
                       
                       let optionClass = "p-2 border rounded ";
                       let icon = null;

                       if (isActualCorrectOption) {
                          optionClass += "bg-green-100 border-green-500 print:font-bold print:border-black";
                          icon = <span className="text-green-600 print:text-black inline-block ml-2"><CheckCircle size={16}/> Correct Answer</span>;
                       } else if (isSelectedOption && isWrong) {
                          optionClass += "bg-red-100 border-red-500 print:border-black";
                          icon = <span className="text-red-600 print:text-black inline-block ml-2"><XCircle size={16}/> Your Wrong Answer</span>;
                       } else {
                          optionClass += "bg-white border-gray-200 print:border-gray-300";
                       }

                       return (
                         <div key={idx} className={optionClass}>
                           <span className="font-bold">({String.fromCharCode(65 + idx)})</span> {opt}
                           {icon}
                         </div>
                       )
                     })}
                   </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
