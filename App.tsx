/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AppState, TestResult, UserResponse } from './types';
import Login from './components/Login';
import Instructions from './components/Instructions';
import CBT from './components/CBT';
import Results from './components/Results';
import { generateTestPaper } from './data/questions';

export default function App() {
  const [appState, setAppState] = useState<AppState>('LOGIN');
  const [questions, setQuestions] = useState(generateTestPaper());
  
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);

  // Regenerate questions on mount just to be safe
  useEffect(() => {
    setQuestions(generateTestPaper());
  }, []);

  const handleLogin = () => setAppState('INSTRUCTIONS');
  const handleProceedInstructions = () => setAppState('TEST');
  
  const handleSubmitTest = (result: TestResult, responses: UserResponse[]) => {
    setTestResult(result);
    setUserResponses(responses);
    setAppState('RESULTS');
  };

  const handleLogout = () => {
    setTestResult(null);
    setUserResponses([]);
    setQuestions(generateTestPaper());
    setAppState('LOGIN');
  };

  return (
    <>
      {appState === 'LOGIN' && <Login onLogin={handleLogin} />}
      {appState === 'INSTRUCTIONS' && <Instructions onProceed={handleProceedInstructions} />}
      {appState === 'TEST' && <CBT questions={questions} onSubmit={handleSubmitTest} />}
      {appState === 'RESULTS' && testResult && (
        <Results 
          questions={questions} 
          responses={userResponses} 
          result={testResult} 
          onLogout={handleLogout} 
        />
      )}
    </>
  );
}
