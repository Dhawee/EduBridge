import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";

function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedApplications = JSON.parse(localStorage.getItem("submittedApplications") || "[]");
    setApplications(savedApplications);
  }, []);

  const handleDelete = (index) => {
    const updatedApps = applications.filter((_, i) => i !== index);
    setApplications(updatedApps);
    localStorage.setItem("submittedApplications", JSON.stringify(updatedApps));
    setDeleteConfirm(null);
  };

  if (applications.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-white">
        <h2 className="text-3xl font-bold mb-6">My Applications</h2>
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400 text-lg">No applications submitted yet.</p>
          <Button 
            variant="primary"
            onClick={() => navigate("/dashboard/schools")}
            className="mt-4"
          >
            Apply to a School
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6">My Applications</h2>
      
      <div className="grid gap-4">
        {applications.map((app, index) => {
          const isPaid = app.paymentStatus === "success";
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 hover:bg-gray-800 transition"
            >
              <div className="flex justify-between items-start">
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => navigate("/dashboard/application-details", { state: { application: app } })}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{app.fullName}</h3>
                    {isPaid && (
                      <span className="px-2 py-1 bg-green-600/30 text-green-300 text-xs font-semibold rounded-full">
                        ✓ Paid
                      </span>
                    )}
                    {!isPaid && (
                      <span className="px-2 py-1 bg-yellow-600/30 text-yellow-300 text-xs font-semibold rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                  
                  <p className="text-blue-400 font-semibold">{app.schoolApplied?.name}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {app.year} • {app.term}
                  </p>
                  
                  {app.paymentReference && (
                    <p className="text-gray-500 text-xs mt-2">
                      Ref: {app.paymentReference.substring(0, 20)}...
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="text-right text-gray-400 text-sm">
                    <p>{new Date(app.appliedAt).toLocaleDateString()}</p>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(index);
                    }}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition"
                    title="Delete application"
                  >
                    🗑️
                  </button>
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm !== null && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-6 rounded-xl max-w-sm w-full border border-red-600 shadow-xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <h3 className="text-2xl font-bold text-red-400 mb-2">Delete Application?</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this application? This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-white font-semibold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ApplicationsPage;
