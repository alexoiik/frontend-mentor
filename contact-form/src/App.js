import { useState } from "react";
import successIcon from "./assets/images/icon-success-check.svg";

function App() {
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    query: "",
    message: "",
    consent: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.first.trim()) newErrors.first = "This field is required";
    if (!form.last.trim()) newErrors.last = "This field is required";

    // Email validation.
    if (!form.email.trim()) {
      newErrors.email = "Please enter a valid email address";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.query) newErrors.query = "Please select a query type";

    if (!form.message.trim()) newErrors.message = "This field is required";

    if (!form.consent) newErrors.consent = "To submit this form, please consent to being contacted";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowSuccess(true);
      setForm({
        first: "",
        last: "",
        email: "",
        query: "",
        message: "",
        consent: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#e0f1e7] flex items-center justify-center p-6 font-karla">
      {/* Success PopUp */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start p-4 z-50">
          <div className="bg-[#2a4244] rounded-xl px-6 pt-6 max-w-lg w-full shadow-lg text-center">
            {/* Header Row */}
            <div className="flex items-center gap-4 justify-left mb-4">
              <img
                src={successIcon}
                alt="Success"
                className="w-7 h-7"
              />
              <h2 className="text-white text-2xl font-bold">
                Message Sent!
              </h2>
            </div>
            {/* Message */}
            <p className="text-[#afc7c8] mb-6 text-left">
              Thanks for completing the form. We'll be in touch soon!
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">
                First Name <span className="text-[#8aaba0]">*</span>
              </label>
              <input
                type="text"
                value={form.first}
                onChange={(e) => setForm({ ...form, first: e.target.value })}
                className="w-full border border-gray-300 hover:border-[#0c7d69] rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
              {errors.first && (
                <p className="text-red-500 text-sm mt-1">{errors.first}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Last Name <span className="text-[#8aaba0]">*</span>
              </label>
              <input
                type="text"
                value={form.last}
                onChange={(e) => setForm({ ...form, last: e.target.value })}
                className="w-full border border-gray-300 hover:border-[#0c7d69] rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
              {errors.last && (
                <p className="text-red-500 text-sm mt-1">{errors.last}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">
              Email Address <span className="text-[#8aaba0]">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 hover:border-[#0c7d69] rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Query Type */}
          <div>
            <label className="block font-semibold mb-2">
              Query Type <span className="text-[#8aaba0]">*</span>
            </label>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              {/* General Enquiry */}
              <label
                className={`w-full flex items-center gap-4 cursor-pointer p-4 rounded-md transition border ${form.query === "general" ? "border-[#0c7d69] bg-[#e0f1e7]" : "border-gray-300"}`}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.query === "general" ? "border-[#0c7d69]" : "border-gray-400"}`}
                >
                  {form.query === "general" && (
                    <span className="w-3 h-3 bg-[#0c7d69] rounded-full"></span>
                  )}
                </span>

                <input
                  type="radio"
                  className="hidden"
                  value="general"
                  onChange={() => setForm({ ...form, query: "general" })}
                />
                <span>General Enquiry</span>
              </label>

              {/* Support Request */}
              <label
                className={`w-full flex items-center gap-4 cursor-pointer p-4 rounded-md transition border ${form.query === "support" ? "border-[#0c7d69] bg-[#e0f1e7]" : "border-gray-300"}`}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.query === "support" ? "border-[#0c7d69]" : "border-gray-400"}`}
                >
                  {form.query === "support" && (
                    <span className="w-3 h-3 bg-[#0c7d69] rounded-full"></span>
                  )}
                </span>

                <input
                  type="radio"
                  className="hidden"
                  value="support"
                  onChange={() => setForm({ ...form, query: "support" })}
                />
                <span>Support Request</span>
              </label>


            </div>
            {errors.query && (
              <p className="text-red-500 text-sm mt-1">{errors.query}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block font-semibold mb-1">
              Message <span className="text-[#8aaba0]">*</span>
            </label>
            <textarea
              rows="4"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-3 resize-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 mt-1"
              onChange={(e) =>
                setForm({ ...form, consent: e.target.checked })
              }
            />
            <label className="text-gray-700">
              I hereby consent to being contacted by the team{" "}
              <span className="text-[#8aaba0]">*</span>
            </label>
          </div>
          {errors.consent && (
            <p className="text-red-500 text-sm">{errors.consent}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#0c7d69] hover:bg-[#0a6d5c] text-white font-semibold py-3 rounded-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
