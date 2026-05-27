export function getCollegePrediction(rank: number): { college: string, motivation: string } {
  if (rank <= 50) {
    return { college: 'AIIMS New Delhi', motivation: 'Spectacular run! You are at the absolute top of the country.' };
  } else if (rank <= 500) {
    return { college: 'MAMC Delhi / VMMC / JIPMER', motivation: 'Outstanding performance! A top premier institute awaits you.' };
  } else if (rank <= 2000) {
    return { college: 'Top State Government Medical College', motivation: 'Brilliant! You have secured a very prestigious medical seat.' };
  } else if (rank <= 15000) {
    return { college: 'Government Medical College (All India Quota/State)', motivation: 'Great job! You have cleared the cutoff for a Government Medical College.' };
  } else if (rank <= 30000) {
    return { college: 'New Government Medical Colleges / Top Semi-Govt', motivation: 'Good effort! You can get a government seat in newer colleges or state quota.' };
  } else if (rank <= 100000) {
    return { college: 'Private Medical Colleges / Deemed Universities', motivation: 'You have qualified, but getting a free Govt seat is tough at this rank. Do not lose hope. Review your weak areas, especially where you got negative marks. A little more push and you will cross the line! Keep grinding.' };
  } else {
    return { college: 'BDS / BAMS / BHMS or Management Quota MBBS', motivation: 'This is a practice test. Your current score indicates a need for serious structural revision. Focus heavily on NCERT line-by-line reading and identify your weakest topics from this test. Do not give up, consistency is key!' };
  }
}

export function estimateRank(score: number): number {
  if (score >= 715) return Math.floor(Math.random() * 50) + 1;
  if (score >= 700) return Math.floor(Math.random() * 450) + 50;
  if (score >= 680) return Math.floor(Math.random() * 1500) + 500;
  if (score >= 650) return Math.floor(Math.random() * 5000) + 2000;
  if (score >= 610) return Math.floor(Math.random() * 15000) + 7000;
  if (score >= 580) return Math.floor(Math.random() * 25000) + 22000;
  if (score >= 500) return Math.floor(Math.random() * 50000) + 50000;
  if (score >= 400) return Math.floor(Math.random() * 100000) + 100000;
  if (score >= 300) return Math.floor(Math.random() * 200000) + 200000;
  return Math.floor(Math.random() * 500000) + 500000;
}
