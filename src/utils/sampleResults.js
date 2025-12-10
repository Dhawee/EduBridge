// Sample exam results for testing
export const sampleExamResults = [
  {
    examName: "Mathematics Final Exam",
    schoolName: "Lagos State University",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    score: 88,
    questions: [
      { question: "What is 2 + 2?", correctAnswer: "4" },
      { question: "What is the square root of 144?", correctAnswer: "12" },
      { question: "What is 15 × 8?", correctAnswer: "120" },
    ],
    answers: ["4", "12", "120"],
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    examName: "English Literature",
    schoolName: "University of Ibadan",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    score: 75,
    questions: [
      { question: "Who wrote Romeo and Juliet?", correctAnswer: "William Shakespeare" },
      { question: "What is the main theme of Hamlet?", correctAnswer: "Revenge" },
    ],
    answers: ["William Shakespeare", "Revenge"],
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    examName: "Physics Mid-Term",
    schoolName: "Obafemi Awolowo University",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    score: 92,
    questions: [
      { question: "What is the SI unit of force?", correctAnswer: "Newton" },
      { question: "What is the speed of light?", correctAnswer: "3 × 10^8 m/s" },
    ],
    answers: ["Newton", "3 × 10^8 m/s"],
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Initialize sample data if no results exist
export const initializeSampleResults = () => {
  const existing = localStorage.getItem("examResults");
  if (!existing || JSON.parse(existing).length === 0) {
    localStorage.setItem("examResults", JSON.stringify(sampleExamResults));
  }
};
