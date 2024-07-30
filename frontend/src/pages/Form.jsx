import React, { useState } from 'react';
import { CiUser, CiLock, CiMail } from "react-icons/ci";
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/appSlice';

const Form = () => {
  const [page, setPage] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/${page}`;

    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(data.user));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='h-screen w-full flex items-center justify-center p-5 bg-zinc-900'>
      <div className='lg:w-1/3 md:w-1/2 rounded-lg shadow-lg w-full bg-[#E9EAE6] p-5 flex flex-col gap-4'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          {page === "login" ? <h2 className='text-center text-3xl font-bold'>Sign In</h2> : <h2 className='text-center text-3xl font-bold'>Sign Up</h2>}
          {page === "register" && (
            <div className='flex flex-col gap-1 w-full relative'>
              <label htmlFor="name">Name</label>
              <div className='flex items-center'>
                <input
                  type="text"
                  placeholder='Enter your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='outline-none border-b border-b-[#F15813] text-lg text-[#F15813] bg-transparent w-full'
                />
                <CiUser className='absolute right-0' size={25} />
              </div>
            </div>
          )}
          <div className='flex flex-col gap-1 w-full relative'>
            <label htmlFor="email">Email</label>
            <div className='flex items-center'>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='outline-none border-b border-b-[#F15813] text-lg text-[#F15813] bg-transparent w-full'
              />
              <CiMail className='absolute right-0' size={25} />
            </div>
          </div>
          <div className='flex flex-col gap-1 w-full relative'>
            <label htmlFor="password">Password</label>
            <div className='flex items-center'>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                className='outline-none border-b border-b-[#F15813] text-lg text-[#F15813] bg-transparent w-full'
              />
              <CiLock className='absolute right-0' size={25} />
            </div>
          </div>
          <button
            type='submit'
            className='px-6 py-2 bg-[#F15813] text-white flex items-center gap-2 rounded-full w-fit mx-auto'
          >
            {loading && <Loader />}
            {page === "login" ? 'Login' : 'Register'}
          </button>
        </form>
        {page === "login" ? (
          <p className='text-center text-sm'>New User? <button onClick={() => setPage("register")} className='hover:underline'>Sign Up</button></p>
        ) : (
          <p className='text-center text-sm'>Already have an account? <button className='hover:underline' onClick={() => setPage("login")}>Sign In</button></p>
        )}
      </div>
    </section>
  );
};

export default Form;
