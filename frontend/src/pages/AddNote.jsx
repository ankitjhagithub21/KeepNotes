import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { addNote } from '../redux/slices/appSlice'

const AddNote = () => {
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleAddNote = async(e) =>{
    e.preventDefault()
    if(loading) return;
    const url = `${import.meta.env.VITE_SERVER_URL}/api/notes/add`
    try{
      setLoading(true)
      const res = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify({title,content})
      })
      const data = await res.json()

      if(data.success){
        toast.success(data.message)
        dispatch(addNote(data.note))
        setTitle('')
        setContent('')
        navigate("/")
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }

  }
  return (
    <section className='h-screen w-full flex items-center justify-center p-5'>
        <div className='lg:w-1/2 w-full mx-auto'>
        <h2 className='text-center mb-5 text-3xl font-bold'>Add Note</h2>
         <form className='flex flex-col gap-2' onSubmit={handleAddNote}>
         <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='border-2 p-3 rounded-lg  text-lg outline-none'  placeholder='Enter title' />
        <textarea value={content} onChange={(e)=>setContent(e.target.value)} className='border-2 rounded-lg p-3  outline-none resize-none' placeholder='Enter description' rows={5}></textarea>
          <button className='bg-orange-500 text-white p-3 rounded-lg text-lg'>
            {loading && <Loader/>}
            {
              loading ? 'Adding...' :'Add'
            }
          </button>
         </form>

        </div>
    </section>
  )
}

export default AddNote
