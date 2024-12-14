import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
// import Bus from "./../img/image 4.png";
// import { ReactComponent as Vector } from "../svg/Vector.svg";
import Cookies from "js-cookie";
import Footer from "../../userpages/body/footer";
import Header from "../../userpages/header";

const Adminlogin = () => {
  const initialdata = {
    email: "",
    password: "",
  };
  const [inputlogindata, setInputlogindata] = useState(initialdata);
  const [showerror, setShowerror] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  // Handle change using useCallback to prevent unnecessary re-renders
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputlogindata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before the API call
    setShowerror(false); // Reset error state

    try {
      const response = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputlogindata),
      });

      if (response.ok) {
        const result = await response.json();
        // Set token in cookie with 7 days expiry
        Cookies.set("authToken", result.data, { expires: 7 });

        setInputlogindata(initialdata); // Reset form fields
        navigate("/home"); // Redirect to home page
      } else {
        // Display specific error message based on response
        const errorResult = await response.json();
        setShowerror(true);
        console.error(
          "Login failed:",
          errorResult.message || "Invalid username or password"
        );
      }
    } catch (error) {
      setShowerror(true);
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(false); // Reset loading state after API call
    }
  };

  return (
    <div className="">
      <Header />
      <div className="flex items-center justify-center w-full lg:w-1/3">
        <div className="main rounded-lg p-6 sm:p-8 md:p-10 w-full sm:w-80 md:w-96">
          {showerror && (
            <div className="text-red-500 font-bold text-center mb-3">
              Invalid username or password
            </div>
          )}
          <h1 className="text-black text-2xl sm:text-3xl mb-4 sm:mb-6">
            Login Details
          </h1>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="text-left text-gray-700 font-bold block"
            >
              Username
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={inputlogindata.email}
              id="email"
              placeholder="Enter your Username"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />

            <label
              htmlFor="password"
              className="text-left text-gray-700 font-bold block mt-4 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={inputlogindata.password}
              placeholder="Enter your Password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
              required
            />

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-300 w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

   <Footer/>
    </div>
  );
};

export default Adminlogin;
