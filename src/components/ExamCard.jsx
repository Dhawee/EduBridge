// components/ExamCard.jsx
import React from "react";

export default function ExamCard({ exam, onClick }) {
  return (
    <div className="border p-4 rounded cursor-pointer hover:shadow" onClick={onClick}>
      <h2 className="font-bold">{exam.title}</h2>
      <p>{exam.description}</p>
      <p>Duration: {exam.duration} mins</p>
    </div>
  );
}
