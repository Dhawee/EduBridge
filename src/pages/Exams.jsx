// pages/Exams.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import ExamCard from "../components/ExamCard";
import { useNavigate } from "react-router-dom";

export default function Exams() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      const q = query(collection(db, "exams"), where("students", "array-contains", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      const examsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExams(examsList);
    };
    fetchExams();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Your Exams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map(exam => (
          <ExamCard
            key={exam.id}
            exam={exam}
            onClick={() => navigate(`/exam/${exam.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
useEffect(() => {
  if (!hasPaid) {
    alert("You must register and pay before accessing this exam.");
  }
}, [hasPaid]);
