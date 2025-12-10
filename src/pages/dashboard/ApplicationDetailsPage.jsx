import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/Button";

function ApplicationDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const application = location.state?.application;

  if (!application) {
    return (
      <div className="p-6 text-red-500">
        No application selected. Please go back to the applications list.
        <button onClick={() => navigate("/dashboard/applications")} className="ml-2 px-3 py-1 bg-green-500 rounded text-black">
          Back
        </button>
      </div>
    );
  }

  const isPaid = application.paymentStatus === "success";

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Application Details</h2>
        <button 
          onClick={() => navigate("/dashboard/applications")} 
          className="text-gray-400 hover:text-white text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Payment Status Banner */}
      {isPaid ? (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-6 p-4 bg-green-600/20 border border-green-500 rounded-lg"
        >
          <p className="text-green-300 font-semibold text-lg">✓ Payment Successful</p>
          <p className="text-green-200 text-sm mt-1">Payment Reference: {application.paymentReference}</p>
        </motion.div>
      ) : (
        <div className="mb-6 p-4 bg-yellow-600/20 border border-yellow-500 rounded-lg">
          <p className="text-yellow-300 font-semibold">Payment Pending</p>
        </div>
      )}

      {/* Application Info */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 space-y-4 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Full Name</p>
            <p className="text-lg font-semibold">{application.fullName || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-lg font-semibold">{application.email || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="text-lg font-semibold">{application.phone || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">School Applied</p>
            <p className="text-lg font-semibold">{application.schoolApplied?.name || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Address</p>
            <p className="text-lg font-semibold">{application.address || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">City</p>
            <p className="text-lg font-semibold">{application.city || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">LGA</p>
            <p className="text-lg font-semibold">{application.lga || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Year</p>
            <p className="text-lg font-semibold">{application.year || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Term</p>
            <p className="text-lg font-semibold">{application.term || "Not filled"}</p>
          </div>
        </div>

        <hr className="border-gray-700 my-4" />

        <h3 className="text-xl font-bold mb-4">Guardian Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Guardian Name</p>
            <p className="text-lg font-semibold">{application.guardianName || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Relationship</p>
            <p className="text-lg font-semibold">{application.guardianRelationship || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Guardian Phone</p>
            <p className="text-lg font-semibold">{application.guardianPhone || "Not filled"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Guardian Email</p>
            <p className="text-lg font-semibold">{application.guardianEmail || "Not filled"}</p>
          </div>
        </div>

        {/* Passport */}
        {application.passport && (
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-gray-400 text-sm mb-3">Passport Photo</p>
            <img src={application.passport} alt="Passport" className="w-40 h-40 rounded-lg border border-gray-600 object-cover" />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <Button 
          variant="outline"
          onClick={() => navigate("/dashboard/applications")}
        >
          Back to Applications
        </Button>
        
        {isPaid && (
          <Button 
            variant="primary"
            onClick={() => navigate("/exams")}
          >
            Take Exams
          </Button>
        )}
      </div>
    </div>
  );
}

export default ApplicationDetailsPage;
