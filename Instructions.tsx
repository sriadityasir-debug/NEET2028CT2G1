import { SetStateAction } from 'react';

export default function Instructions({ onProceed }: { onProceed: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-blue-800 text-white py-3 px-6 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">NEET (UG) - 2026 MOCK CBT</h1>
        </div>
        <div className="text-sm font-medium">Candidate: Dr.Aditya Srivastava</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-6 bg-white shadow-sm my-6 rounded border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 underline">General Instructions</h2>
        
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-4">
          <p><strong>Please read the instructions carefully:</strong></p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Total duration of examination is <strong>200 minutes</strong> (3 hours 20 minutes).</li>
            <li>The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself.</li>
            <li>The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
              <ul className="list-none pl-2 mt-2 space-y-2">
                <li className="flex items-center gap-2"><div className="w-6 h-6 bg-gray-200 border border-gray-400 flex items-center justify-center text-xs">1</div> You have not visited the question yet.</li>
                <li className="flex items-center gap-2"><div className="w-6 h-6 bg-red-500 text-white custom-clip-unanswered flex items-center justify-center text-xs">2</div> You have not answered the question.</li>
                <li className="flex items-center gap-2"><div className="w-6 h-6 bg-green-500 text-white custom-clip-answered flex items-center justify-center text-xs">3</div> You have answered the question.</li>
                <li className="flex items-center gap-2"><div className="w-6 h-6 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs">4</div> You have NOT answered the question, but have marked the question for review.</li>
                <li className="flex items-center gap-2 relative">
                   <div className="w-6 h-6 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs">5</div>
                   <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full"></div>
                   The question(s) "Answered and Marked for Review" will be considered for evaluation.
                </li>
              </ul>
            </li>
            <li>You can click on the "&gt;" arrow which appears to the left of question palette to collapse the question palette thereby maximizing the question window.</li>
          </ol>

          <h3 className="font-bold mt-4 text-lg">Marking Scheme</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Correct Answer: <strong>+4 Marks</strong></li>
            <li>Incorrect Answer: <strong>-1 Mark</strong></li>
            <li>Unanswered: <strong>0 Marks</strong></li>
          </ul>

          <h3 className="font-bold mt-4 text-lg">Syllabus Covered</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Physics:</strong> Units and Measurements</li>
            <li><strong>Chemistry:</strong> Structure of Atom</li>
            <li><strong>Botany:</strong> Cell: The Unit of Life, Diversity, Basic Classification</li>
            <li><strong>Zoology:</strong> Structural Organization in Animals - Tissue Only</li>
          </ul>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col items-center">
          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" required id="agree" />
            <span className="text-sm font-medium text-gray-800">I have read and understood the instructions. All computer hardware is in proper working condition.</span>
          </label>
          <button 
             onClick={() => {
               if((document.getElementById('agree') as HTMLInputElement).checked) {
                 onProceed();
               } else {
                 alert("Please accept the terms to proceed.");
               }
             }}
             className="px-8 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition-colors shadow-sm"
          >
            PROCEED
          </button>
        </div>

      </main>
    </div>
  );
}
