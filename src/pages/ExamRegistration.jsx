import { useNavigate, useParams } from "react-router-dom";

const ExamRegistration = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(`/payments?examId=${examId}`);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Exam Registration</h1>
      
      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-5"
      >
        Register & Pay 
      </button>
    </div>
  );
};

export default ExamRegistration;
