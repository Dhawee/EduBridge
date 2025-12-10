// pages/Payments.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { Keypair, TransactionBuilder, Networks, Server, BASE_FEE, Operation } from "stellar-sdk";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState(1000); // default fee

  useEffect(() => {
    const fetchPayments = async () => {
      const q = query(collection(db, "payments"), where("studentId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      setPayments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPayments();
  }, []);

  const handlePay = async () => {
    try {
      const server = new Server("https://horizon-testnet.stellar.org");
      const sourceKeypair = Keypair.random(); // Student generates keypair
      const destination = "YOUR_STELLAR_RECEIVER_ADDRESS";

      const account = await server.loadAccount(sourceKeypair.publicKey());
      const tx = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET
      })
        .addOperation(Operation.payment({
          destination,
          asset: StellarSdk.Asset.native(),
          amount: amount.toString(),
        }))
        .setTimeout(180)
        .build();

      tx.sign(sourceKeypair);
      await server.submitTransaction(tx);

      // Save payment record
      await addDoc(collection(db, "payments"), {
        studentId: auth.currentUser.uid,
        amount,
        status: "paid",
        date: new Date(),
      });

      alert("Payment successful!");
    } catch (err) {
      console.error(err);
      alert("Payment failed!");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Pay Your Fees</h1>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        className="border p-2 mb-4"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handlePay}>
        Pay with Stellar
      </button>

      <h2 className="text-xl font-semibold mt-10 mb-3">Payment History</h2>
      <ul>
        {payments.map(p => (
          <li key={p.id}>
            Amount: {p.amount} | Status: {p.status} | Date: {p.date.toDate().toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
setShowSuccess(true);
{showSuccess && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-bold">Payment Successful 🎉</h2>
      <p>You can now take your exam.</p>
      <button onClick={() => navigate("/exams")} className="bg-green-500 text-white px-4 py-2 mt-3 rounded">
        Continue
      </button>
    </div>
  </div>
)}
