import React from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <div className="bg-green-700 text-white text-center py-16 px-06 rounded-lg mx-6 md:mx-20 lg:mx-40 mt-20">
      <h2 className="text-3xl font-bold">
        Ready to Begin Your Admission Journey?
      </h2>

      <p className="mt-3 text-lg text-gray-100">
        Join thousands of students getting easy access to secondary education in Ekiti State.
      </p>

      <Link
        to="/Auth"
        className="mt-6 inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-semibold shadow"
      >
        Create Account
      </Link>
    </div>
  );
}
