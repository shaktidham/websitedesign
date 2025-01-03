import React, { useState } from 'react';

function Password({ popuppassword, setPopuppassword, setPassword }) {
  const [password, setLocalPassword] = useState('');

  const handlePasswordChange = (e) => {
    setLocalPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword(password);
    setPopuppassword(false); // Close the popup after submitting
  };

  return (
    popuppassword && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg mx-4 overflow-y-auto">
          <h2 className="text-xl font-semibold text-center mb-4">Enter Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default Password;
