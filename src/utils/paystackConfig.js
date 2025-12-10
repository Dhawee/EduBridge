// Paystack Configuration
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_51234567890"; // Replace with your actual key

/**
 * Initialize Paystack payment
 * @param {Object} paymentDetails - Payment details
 * @param {string} paymentDetails.email - Customer email
 * @param {number} paymentDetails.amount - Amount in kobo (multiply naira by 100)
 * @param {string} paymentDetails.reference - Unique reference
 * @param {Object} paymentDetails.metadata - Additional data
 */
export const initializePaystackPayment = (paymentDetails) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;

    script.onload = () => {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: paymentDetails.email,
        amount: paymentDetails.amount, // Amount in kobo
        ref: paymentDetails.reference,
        currency: "NGN",
        metadata: paymentDetails.metadata || {},
        onClose: () => {
          reject(new Error("Payment window closed"));
        },
        onSuccess: (response) => {
          resolve(response);
        },
      });

      handler.openIframe();
    };

    script.onerror = () => {
      reject(new Error("Failed to load Paystack"));
    };

    document.head.appendChild(script);
  });
};

/**
 * Verify payment with backend
 * @param {string} reference - Payment reference from Paystack
 */
export const verifyPaystackPayment = async (reference) => {
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_PUBLIC_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data.status ? data.data : null;
  } catch (error) {
    console.error("Payment verification failed:", error);
    return null;
  }
};
