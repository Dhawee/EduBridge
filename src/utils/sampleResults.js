// src/utils/sampleResults.js

/* ✅ HARD-CODED SCHOOL NAMES (NO DATA IMPORTS) */
const schoolNames = [
  "Ado Comm High Schl, Ado Ekiti",
  "Ado Grammar School, Ado Ekiti",
  "All Souls Ang Gram Schl, Ado Ekiti",
  "Amure Comm High Schl, Ado Ekiti",
];

// Helper functions
const getRandomScore = () => Math.floor(Math.random() * 41) + 50; // 50–90
const maybeIncorrect = (correct) =>
  Math.random() < 0.7 ? correct : "Wrong Answer";

// Create sample exam results
export const sampleExamResults = schoolNames.map((school, idx) => ({
  examName: [
    "Mathematics Final Exam",
    "English Literature",
    "Physics Mid-Term",
    "Chemistry Quiz",
  ][idx],
  schoolName: school,
  date: new Date(
    Date.now() - (idx + 1) * 24 * 60 * 60 * 1000
  ).toISOString(),
  score: getRandomScore(),
  questions: [
    { question: `Sample Question 1 for ${school}`, correctAnswer: "Answer 1" },
    { question: `Sample Question 2 for ${school}`, correctAnswer: "Answer 2" },
    { question: `Sample Question 3 for ${school}`, correctAnswer: "Answer 3" },
  ],
  answers: ["Answer 1", "Answer 2", "Answer 3"].map(maybeIncorrect),
  submittedAt: new Date(
    Date.now() - (idx + 1) * 24 * 60 * 60 * 1000
  ).toISOString(),
}));

// Force overwrite localStorage
export const initializeSampleResults = () => {
  localStorage.setItem("examResults", JSON.stringify(sampleExamResults));
};
