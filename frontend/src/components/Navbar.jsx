import React from 'react'
import { Link } from 'react-router-dom'
import {setUser} from "../redux/slices/appSlice"
import {useDispatch} from "react-redux"
import {toast} from "react-toastify"
const Navbar = () => {
  const dispatch = useDispatch()
  const handleLogout = async() =>{
    const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`
    try{
      const res = await fetch(url,{
        credentials:'include'
      })
      const data = await res.json()
      if(data.success){
        dispatch(setUser(null))
        toast.success(data.message)
      }
    }catch(error){  
      console.log(error)
    }
  }
  return (
    <nav className='w-full fixed top-0'>
        <div className="container mx-auto p-5 flex items-center flex-wrap justify-between">
            <div className='flex items-center gap-1'>
                <img src="/vite.svg" alt="logo" />
                <span className='font-bold'>KeepNotes</span>
            </div>
            <div className='flex gap-5 items-center'>
                <Link to={"/"}>Home</Link>
                <Link to={"/add"}>Add Note</Link>
                <button className='px-4 py-1 bg-red-500 text-white rounded-lg' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
