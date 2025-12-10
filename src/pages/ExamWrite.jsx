// pages/ExamWrite.jsx
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useParams, useNavigate } from "react-router-dom";

export default function ExamWrite() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);


  useEffect(() => {
    const fetchExam = async () => {
      const examDoc = await getDoc(doc(db, "exams", id));
      if (examDoc.exists()) setExam(examDoc.data());
    };
    fetchExam();
  }, [id]);

  const handleChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    // Calculate score
    let correctAnswers = 0;
    exam.questions.forEach((q, idx) => {
      if (answers[q.id] === q.correctAnswer) correctAnswers++;
    });
    const score = Math.round((correctAnswers / exam.questions.length) * 100);

    // Save to Firebase (if available)
    if (auth.currentUser) {
      await updateDoc(doc(db, "examResults", id + "_" + auth.currentUser.uid), {
        examId: id,
        studentId: auth.currentUser.uid,
        answers,
        submittedAt: new Date(),
      });
    }

    // Also save to localStorage for display in dashboard
    const result = {
      examName: exam.title,
      schoolName: exam.schoolName || "School",
      date: new Date().toISOString(),
      score: score,
      questions: exam.questions,
      answers: Object.values(answers),
      submittedAt: new Date().toISOString(),
    };

    const savedResults = JSON.parse(localStorage.getItem("examResults") || "[]");
    savedResults.push(result);
    localStorage.setItem("examResults", JSON.stringify(savedResults));

    alert("Exam submitted successfully!");
    navigate("/dashboard/results");
  };

  if (!exam) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">{exam.title}</h1>
      {exam.questions.map((q, index) => (
        <div key={index} className="mb-4">
          <p>{index + 1}. {q.question}</p>
          {q.type === "text" ? (
            <input
              className="border p-2 w-full"
              value={answers[q.id] || ""}
              onChange={e => handleChange(q.id, e.target.value)}
            />
          ) : (
            q.options.map(opt => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  onChange={e => handleChange(q.id, e.target.value)}
                />
                {opt}
              </label>
            ))
          )}
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Submit Exam
      </button>
    </div>
  );
}
useEffect(() => {
  if (timeLeft <= 0) handleSubmit();

  const timer = setInterval(() => {
    setTimeLeft(prev => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);
<div className="text-right font-semibold text-red-600">
  Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
</div>

