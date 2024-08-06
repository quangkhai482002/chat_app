import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { PiUserCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const CheckEmail = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/checkemail`;
    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);
      if (response.data.success) {
        setData({
          email: "",
        });
        navigate("/password", { state: response?.data?.data });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2">
          <PiUserCircle size={80} />
        </div>
        <h3 className="text-center">Welcome to chat app!</h3>
        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleOnchange}
              required
            />
          </div>
          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed -tracking-wide">
            Let's Go
          </button>
        </form>
        <p className="my-3 text-center">
          New Users ?{" "}
          <Link to={"/register"} className="hover:text-primary font-semibold">
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
