import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordEmail() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to send OTP to the email
    navigate('/verify-otp', { state: { email } });
  };

  return (
    <div className="h-screen flex justify-center items-center font-['Urbanist'] bg-[#F7F8F9]">
      <form className="flex flex-col gap-4 w-[300px]" onSubmit={handleSubmit}>
        <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] text-center">
          Forgot Password
        </div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
          required
        />
        <button
          type="submit"
          className="w-full h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
          active:scale-95 active:bg-gray-900
          focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

// export default ForgotPasswordEmail;
