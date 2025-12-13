// src/pages/dashboard/DashboardResults.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { initializeSampleResults } from "../../utils/sampleResults.js";

/* ================= HELPERS ================= */

const getGrade = (score) => {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
};

const gradeColor = (grade) => {
  switch (grade) {
    case "A":
      return "bg-green-600 text-white";
    case "B":
      return "bg-blue-600 text-white";
    case "C":
      return "bg-yellow-500 text-black";
    case "D":
      return "bg-orange-600 text-white";
    case "F":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

/* ================= COMPONENT ================= */

export default function DashboardResults() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [search, setSearch] = useState("");

  /* ---------- LOAD RESULTS ---------- */
  useEffect(() => {
    initializeSampleResults();
    const saved = JSON.parse(localStorage.getItem("examResults") || "[]");
    setResults(saved);
  }, []);

  /* ---------- FILTER ---------- */
  const filteredResults = results.filter(
    (res) =>
      res.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      res.examName.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- PDF DOWNLOAD ---------- */
  const downloadPDF = async () => {
    const element = document.getElementById("print-result");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = 210;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("Exam_Result.pdf");
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6">Exam Results</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by school or exam name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-6 bg-gray-800 border border-gray-700 rounded-lg"
      />

      {/* LIST */}
      <div className="grid gap-4">
        {filteredResults.map((result, index) => {
          const grade = getGrade(result.score);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400">
                    {result.schoolName}
                  </h3>
                  <p className="text-gray-400">{result.examName}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(result.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`text-3xl font-bold px-4 py-2 rounded-lg ${gradeColor(
                      grade
                    )}`}
                  >
                    {result.score}%
                  </p>
                  <p className="text-sm mt-2">
                    Grade: <strong>{grade}</strong>
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-700 pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedResult(result)}
                  className="text-green-400 font-semibold hover:underline"
                >
                  View Details →
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedResult(null)}
          >
            <motion.div
              className="bg-gray-900 w-full max-w-3xl rounded-xl overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* PRINT AREA */}
              <div id="print-result" className="p-6 text-white relative">
                {/* HEADER */}
                <div className="border-b border-gray-700 pb-4 mb-6">
                  <h2 className="text-2xl font-bold">
                    {selectedResult.examName}
                  </h2>
                  <p className="text-gray-400">
                    {selectedResult.schoolName}
                  </p>
                </div>

                {/* SUMMARY */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-400">Score</p>
                    <p className="text-3xl font-bold">
                      {selectedResult.score}%
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-400">Grade</p>
                    <p className="text-3xl font-bold">
                      {getGrade(selectedResult.score)}
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-lg font-semibold">
                      {new Date(selectedResult.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* QUESTIONS */}
                <div className="space-y-4">
                  {selectedResult.questions.map((q, i) => {
                    const userAnswer = selectedResult.answers[i];
                    const correct = userAnswer === q.correctAnswer;

                    return (
                      <div
                        key={i}
                        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                      >
                        <p className="font-semibold mb-2">
                          Q{i + 1}. {q.question}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-400">Your Answer:</span>{" "}
                          <span
                            className={
                              correct ? "text-green-400" : "text-red-400"
                            }
                          >
                            {userAnswer}
                          </span>
                        </p>
                        <p className="text-sm mt-1">
                          <span className="text-gray-400">
                            Correct Answer:
                          </span>{" "}
                          <span className="text-green-400">
                            {q.correctAnswer}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="p-6 border-t border-gray-700 flex justify-end gap-6 no-print">
                <button
                  onClick={downloadPDF}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  Download PDF
                </button>

                <button
                  onClick={() => setSelectedResult(null)}
                  className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
