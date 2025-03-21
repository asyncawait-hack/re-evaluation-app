import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FluentEyeIcon from '../../../public/icons/eye';
import FluentEyeClosedIcon from '../../../public/icons/eye-closed';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

export default function RegisterCardStudent() {
  const navigate = useNavigate();
  const location = useLocation()
  const organization = location.state?.organization
  // console.log("here in registerPageStudent")
  // console.log(organization)
  // const login = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       const userInfo = await axios.get(
  //         'https://www.googleapis.com/oauth2/v3/userinfo',
  //         {
  //           headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
  //         }
  //       );
  //       console.log('Full Google Response:', userInfo.data);
  //       // userInfo.data will now contain: email, name, picture, given_name, family_name, etc.
  //     } catch (error) {
  //       console.error('Error fetching user info:', error);
  //     }
  //   },
  //   onError: (error) => console.error('Login Failed:', error),
  //   scope: 'email profile', // Add this line to request email access
  // });

  const [formData, setFormData] = useState({
    rollNumber: '',
    mobileNumber: '',
    studentName: '',
    email: '',
    password: '',
    department: '',
    semester: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e)

    try {
      const response = await axios.post('/api/students/register', {
        mobileNumber: formData.mobileNumber,
        rollNumber: formData.rollNumber,
        studentName: formData.studentName,
        email: formData.email,
        password: formData.password,
        department: formData.department,
        semester: formData.semester,
        organization: organization.name,
        orgID: organization.id
      });
      console.log("Response is : ", response.data.message);
      if (response.data.message === 'successfully resistered the user') {
        navigate('/student/registration-successful');
      } else if (response.data.message === 'Please enter correct email it is already in use') {
        setErrorMessage('Student already exists with this email');
        setTimeout(() => setErrorMessage(''), 3000);
      }
      else if (response.data.message === 'Please enter correct rollnumber it is already in use') {
        setErrorMessage('Student already exists with this rollnumber');
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        setErrorMessage(response.data.message);
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
    catch (error) {
      console.log(error.message)
      console.error('Error adding student:', error.response || error);
      setErrorMessage('Error adding student. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (


    <div className="h-full flex justify-center font-['Urbanist']">
      <form className="flex flex-col gap-4 w-[300px]" onSubmit={onSubmit}>
        <div className="text-[#1E232C] text-[30px] font-bold leading-[39px] break-words pt-[40px] text-center">
          Hello! Register to get started
        </div>
        <div>
          {errorMessage && (
            <div
              id="error-message"
              className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg"
              style={{ animation: 'fadeOut 2s forwards' }}
            >
              {errorMessage}
            </div>
          )}
        </div>
        <div className='flex flex-col gap-2 '>

          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="Enter Your Roll Number"
            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
            required
          />

          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
            required
          />

          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
          />

          <div className='flex flex-col gap-2'>
            <div className="gap-2 flex">
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
                className="w-1/2 h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
              transition-all duration-300 
              hover:shadow-md hover:border-gray-400 
              focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
              placeholder:text-gray-400"
              />
              <input
                type="number"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="Semester"
                className="w-1/2 h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
              transition-all duration-300 
              hover:shadow-md hover:border-gray-400 
              focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
              placeholder:text-gray-400"
              />
            </div>

          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:shadow-md hover:border-gray-400 
          focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
          placeholder:text-gray-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="w-full h-[50px] bg-[#F7F8F9] rounded-[8px] border border-[#DADADA] px-4 py-2 text-[14px] 
              transition-all duration-300 
              hover:shadow-md hover:border-gray-400 
              focus:outline-none focus:border-[#000000] focus:shadow-lg focus:scale-[1.02]
              placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FluentEyeIcon /> : <FluentEyeClosedIcon />}
            </button>
          </div>

        </div>

        <button
          type="submit"
          className="w-full h-[50px] bg-black text-white rounded-[8px] px-4 py-2 text-[14px] 
          transition-all duration-300 
          hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02]    
          active:scale-95 active:bg-gray-900
          focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          Register
        </button>

        <div className="w-full ">
          <div className="flex justify-center items-center mt-6 mb-4">
            <div className="text-[#1E232C] text-[15px]">Already have an account? </div>
            <Link to='/student/login'>
              <div className="text-[#35C2C1] text-[15px] font-semibold ml-1 cursor-pointer">Login Now</div>
            </Link>
          </div>
        </div>
      </form>
    </div>

  );
};


