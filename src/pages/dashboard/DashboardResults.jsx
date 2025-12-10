import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import { sampleExamResults, initializeSampleResults } from "../../utils/sampleResults";

// Convert score to grade
const getGrade = (score) => {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
};

// Grade color
const gradeColor = (grade) => {
  switch (grade) {
    case "A": return "bg-green-600 text-white";
    case "B": return "bg-blue-600 text-white";
    case "C": return "bg-yellow-500 text-black";
    case "D": return "bg-orange-600 text-white";
    case "F": return "bg-red-600 text-white";
    default: return "bg-gray-600 text-white";
  }
};

export default function DashboardResults() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Initialize with sample data if needed
    initializeSampleResults();
    
    const savedResults = JSON.parse(localStorage.getItem("examResults") || "[]");
    setResults(savedResults.length > 0 ? savedResults : sampleExamResults);
  }, []);

  // Filter by search term
  const filteredResults = results.filter((res) =>
    res.schoolName?.toLowerCase().includes(search.toLowerCase()) ||
    res.examName?.toLowerCase().includes(search.toLowerCase())
  );

  if (results.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-white">
        <h2 className="text-3xl font-bold mb-6">Exam Results</h2>
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-lg">No exam results yet.</p>
          <p className="text-gray-500 text-sm mt-2">Results will appear here after you complete an exam.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6">Exam Results</h2>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by school or exam name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Results List */}
      <div className="grid gap-4">
        {filteredResults.map((result, index) => {
          const grade = getGrade(result.score);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 hover:bg-gray-800 transition cursor-pointer"
              onClick={() => setSelectedResult(result)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-400">{result.schoolName}</h3>
                  <p className="text-gray-400 mt-1">{result.examName}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(result.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className={`text-3xl font-bold px-4 py-2 rounded-lg ${gradeColor(grade)}`}>
                    {result.score}%
                  </p>
                  <p className="text-gray-400 text-sm mt-2">Grade: <span className="font-bold">{grade}</span></p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm hover:text-green-400 transition">
                  Click to view details →
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Result Details Modal */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedResult(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-xl max-w-2xl w-full border border-gray-700 shadow-xl my-8"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-linear-to-r from-green-600/20 to-blue-600/20 p-6 border-b border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold">{selectedResult.schoolName}</h2>
                    <p className="text-gray-400 mt-1">{selectedResult.examName}</p>
                  </div>
                  <button
                    onClick={() => setSelectedResult(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Score Summary */}
              <div className="p-6 border-b border-gray-700">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-gray-400 text-sm mb-2">Total Score</p>
                    <p className={`text-4xl font-bold ${gradeColor(getGrade(selectedResult.score))}`}>
                      {selectedResult.score}%
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-gray-400 text-sm mb-2">Grade</p>
                    <p className={`text-4xl font-bold ${gradeColor(getGrade(selectedResult.score))}`}>
                      {getGrade(selectedResult.score)}
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-gray-400 text-sm mb-2">Date Taken</p>
                    <p className="text-xl font-semibold">
                      {new Date(selectedResult.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Questions and Answers */}
              {selectedResult.questions && selectedResult.questions.length > 0 ? (
                <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                  <h3 className="text-xl font-bold">Questions & Answers</h3>
                  {selectedResult.questions.map((question, idx) => {
                    const userAnswer = selectedResult.answers?.[idx];
                    const isCorrect = userAnswer === question.correctAnswer;
                    return (
                      <div key={idx} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="flex gap-2 items-start">
                          <span className="text-green-400 font-bold">{idx + 1}.</span>
                          <div className="flex-1">
                            <p className="font-semibold mb-3">{question.question}</p>
                            <div className="space-y-2 ml-4">
                              <p className={`text-sm ${isCorrect ? "text-green-400" : "text-gray-400"}`}>
                                <span className="font-semibold">Your Answer:</span> {userAnswer || "Not answered"}
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-blue-400">
                                  <span className="font-semibold">Correct Answer:</span> {question.correctAnswer}
                                </p>
                              )}
                              <p className={`text-xs font-semibold mt-2 px-2 py-1 rounded w-fit ${
                                isCorrect ? "bg-green-600/30 text-green-300" : "bg-red-600/30 text-red-300"
                              }`}>
                                {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-400">
                  No question details available
                </div>
              )}

              {/* Action Buttons */}
              <div className="bg-gray-800 p-6 border-t border-gray-700 flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedResult(null)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    window.print();
                  }}
                >
                  Print
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    const resultText = `
Exam Result - ${selectedResult.schoolName}
Exam: ${selectedResult.examName}
Date: ${new Date(selectedResult.date).toLocaleDateString()}
Score: ${selectedResult.score}%
Grade: ${getGrade(selectedResult.score)}

Questions & Answers:
${selectedResult.questions?.map((q, idx) => `
${idx + 1}. ${q.question}
Your Answer: ${selectedResult.answers?.[idx] || "Not answered"}
Correct Answer: ${q.correctAnswer}
Status: ${selectedResult.answers?.[idx] === q.correctAnswer ? "Correct" : "Incorrect"}
`).join("\n") || "No details available"}
                    `;
                    const blob = new Blob([resultText], { type: "text/plain" });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${selectedResult.schoolName}-${selectedResult.examName}-result.txt`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                  }}
                >
                  Save
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
