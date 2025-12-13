// src/pages/dashboard/ApplyPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { initializePaystackPayment } from "../../utils/paystackConfig";

function ApplyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSchool = location.state?.school;

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [passportPreview, setPassportPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const APPLICATION_FEE = 5000;

  const initialFormData = {
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    lga: "",
    year: "",
    term: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianRelationship: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const draft = localStorage.getItem("applyDraft");
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    const dataToLoad = draft
      ? JSON.parse(draft)
      : {
          ...initialFormData,
          fullName: userData.fullName || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          city: userData.city || "",
          lga: userData.lga || "",
          guardianName: userData.guardianName || "",
          guardianPhone: userData.guardianPhone || "",
          guardianEmail: userData.guardianEmail || "",
          guardianRelationship: userData.guardianRelationship || "",
        };

    setFormData(dataToLoad);
  }, []);

  useEffect(() => {
    localStorage.setItem("applyDraft", JSON.stringify(formData));
  }, [formData]);

  if (!selectedSchool) {
    return (
      <p className="p-6 text-red-500">
        No school selected. Please go back and select one.
      </p>
    );
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePassportUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPassportPreview(URL.createObjectURL(file));
  };

  const showMessage = (message, type = "success") => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const saveDraft = () => {
    localStorage.setItem("applyDraft", JSON.stringify(formData));
    showMessage("Draft saved successfully!", "success");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentError("");
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    setPaymentLoading(true);
    setPaymentError("");

    try {
      const userEmail =
        formData.email || localStorage.getItem("userEmail") || "student@edubridge.com";
      const reference = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Initialize Paystack payment
      const paystackResponse = await initializePaystackPayment({
        email: userEmail,
        amount: APPLICATION_FEE * 100,
        reference,
        metadata: {
          school: selectedSchool.name,
          studentName: formData.fullName,
          applicationForm: JSON.stringify(formData),
        },
      });

      if (paystackResponse && paystackResponse.status) {
        // Save application
        const application = {
          ...formData,
          passport: passportPreview,
          schoolApplied: selectedSchool,
          paymentReference: paystackResponse.reference,
          paymentStatus: "success",
          appliedAt: new Date().toISOString(),
        };

        const savedApps = JSON.parse(localStorage.getItem("submittedApplications") || "[]");
        savedApps.push(application);
        localStorage.setItem("submittedApplications", JSON.stringify(savedApps));
        localStorage.removeItem("applyDraft");

        // Show success modal
        setShowModal(false);
        setShowSuccessModal(true);

        // Redirect to Exams after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/dashboard/exams");
        }, 3000);
      } else {
        throw new Error("Payment not completed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(error.message || "Payment failed. Please try again.");
      showMessage("Payment failed: " + (error.message || "Please try again"), "error");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Apply to School</h2>
        <div className="bg-blue-600/20 border border-blue-500 p-4 rounded-lg">
          <p className="text-lg font-semibold text-blue-300">
            School: <span className="text-white">{selectedSchool.name}</span>
          </p>
          <p className="text-sm text-blue-200 mt-2">
            Application Fee: ₦{APPLICATION_FEE.toLocaleString()}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-xl"
      >
        <h3 className="text-xl font-bold mb-4">Complete Application Form</h3>

        <div className="bg-green-600/10 p-4 rounded-lg border border-green-500">
          <p className="text-green-300 text-sm mb-3 font-semibold">
            Your Profile Information
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Full Name</p>
              <p className="text-white text-lg font-semibold">
                {formData.fullName || "Not found"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white text-lg font-semibold">
                {formData.email || "Not found"}
              </p>
            </div>
          </div>
        </div>

        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-gray-800"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          name="term"
          value={formData.term}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-gray-800"
        >
          <option value="">Select Term</option>
          <option value="First Term">First Term</option>
          <option value="Second Term">Second Term</option>
          <option value="Third Term">Third Term</option>
        </select>

        <div className="flex justify-between mt-6 items-center">
          <button
            type="button"
            onClick={saveDraft}
            className="px-4 py-2 bg-yellow-500 rounded text-black font-semibold hover:bg-yellow-600 transition"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 rounded text-black font-semibold hover:bg-green-600 transition"
          >
            Submit & Pay
          </button>
        </div>
      </form>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 px-6 py-3 rounded shadow-lg text-white font-semibold ${
              toastMessage.includes("failed") ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submission Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-xl max-w-md w-full border border-gray-700 shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4">Confirm & Pay</h3>
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-gray-300 mb-2">Application Fee:</p>
                <p className="text-3xl font-bold text-green-400">
                  ₦{APPLICATION_FEE.toLocaleString()}
                </p>
              </div>
              <p className="text-gray-300 mb-6">
                You will be redirected to Paystack to complete payment securely.
              </p>

              {paymentError && (
                <div className="bg-red-500/20 border border-red-500 p-3 rounded mb-4 text-red-300 text-sm">
                  {paymentError}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                  onClick={() => setShowModal(false)}
                  disabled={paymentLoading}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                  onClick={confirmSubmit}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Processing...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-xl max-w-md w-full border border-green-600 shadow-xl text-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <div className="mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: 1 }}
                  className="text-6xl mb-4 text-green-400"
                >
                  ✓
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-300 mb-6">
                Your application has been submitted.
              </p>
              <p className="text-gray-400 text-sm">
                Redirecting to your exams...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ApplyPage;
