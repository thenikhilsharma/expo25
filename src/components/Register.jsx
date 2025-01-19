import React, { useState } from "react";
import { validateForm } from "../FormValidation";
import { registerUser } from "../Api";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    startUpSector: "",
    headquarter: "",
    linkedin: "",
    description: "",
  });

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Register.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const responseMessage = await registerUser(formData); // Expecting only the message
      setMessage(responseMessage); // Set the success message
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage(error.message || "An error occurred"); // Display error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="reg"
      className="bg-black flex flex-col justify-center items-center"
    >
      <h1 className="text-5xl text-red-600 mt-10 font-bold">REGISTER NOW</h1>

      <div className="flex flex-col mt-10 w-5/6 md:w-1/2 mx-5 bg-neutral-950 p-2 text-white border-red-600 border-2 rounded-2xl">
        <div className="h-1/7 flex justify-center items-center">
          <p className="text-red-600 text-2xl">Register as a Startup</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col h-6/7">
          <div className="h-1/6 flex flex-col">
            <label htmlFor="" className="mt-3">
              Startup Name<span className="text-red-600">*</span>
            </label>
            <input
              className="text-black"
              placeholder="Enter your Startup Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <span style={{ color: "red" }}>{errors.name}</span>
          </div>
          <div className="h-1/6 flex flex-col">
            <label htmlFor="" className="mt-3">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              className="text-black"
              placeholder="Enter your email address"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span style={{ color: "red" }}>{errors.email}</span>
          </div>
          <div className="h-1/6 flex flex-col">
            <label htmlFor="" className="mt-3">
              Startup's Sector<span className="text-red-600">*</span>
            </label>
            <input
              className="text-black"
              placeholder="Sector of your Startup"
              type="text"
              name="startUpSector"
              value={formData.startUpSector}
              onChange={handleChange}
            />
            <span style={{ color: "red" }}>{errors.startUpSector}</span>
          </div>
          <div className="h-1/6 flex flex-col">
            <label htmlFor="" className="mt-3">
              Startup Headquarter<span className="text-red-600">*</span>
            </label>
            <input
              className="text-black"
              placeholder="Place of Startup Headquarter"
              type="text"
              name="headquarter"
              value={formData.headquarter}
              onChange={handleChange}
            />
            <span style={{ color: "red" }}>{errors.headquarter}</span>
          </div>
          <div className="h-1/6 flex flex-col">
            <label htmlFor="" className="mt-3">
              LinkedIn/Website of your Startup
              <span className="text-red-600">*</span>
            </label>
            <input
              className="text-black"
              placeholder="Enter your LinkedIn or Website URL"
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
            />
            <span style={{ color: "red" }}>{errors.linkedin}</span>
          </div>
          <div className="h-2/6 flex flex-col">
            <label htmlFor="" className="mt-3">
              Description of Startup<span className="text-red-600">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Brief description of idea/product/service"
              className="text-black"
              cols="30"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <span style={{ color: "red" }}>{errors.description}</span>
          </div>
          <div className="flex justify-center my-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={checkboxChecked}
              onChange={() => setCheckboxChecked(!checkboxChecked)}
            />
            <label htmlFor="" className="ml-2 text-white">
              I hereby declare that I have read the brochure and the details
              furnished above are correct to the best of my knowledge.
            </label>
          </div>

          <div className="flex justify-center m-auto">
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-red-500 py-4 px-8 text-base text-white"
            >
              {loading ? "LOADING..." : "REGISTER"}
            </button>
          </div>
        </form>
        <p className="m-auto text-white">{message}</p>
      </div>
    </div>
  );
}
