import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { updateNote } from '../redux/slices/appSlice'



const AddNote = () => {
    
    const { id } = useParams()
    const fetchNote = async() =>{
        const url = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`
        try{
          
            const res = await fetch(url,{
                credentials:'include'
            })
            const data = await res.json()
        
            if(data.success){
                setTitle(data.note.title)
                setContent(data.note.content)
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    
    const handleUpdateNote = async (e) => {
        e.preventDefault()
        if (loading) return;
        const url = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`
        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ title, content })
            })
            const data = await res.json()

            if (data.success) {
                toast.success(data.message)
                dispatch(updateNote(data.note))
                navigate("/")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(()=>{
        fetchNote()
    },[id])
    if(loading){
        return <Loader/>
    }
    return (
        <section className='h-screen w-full flex items-center justify-center p-5'>
            <div className='lg:w-1/2 w-full mx-auto'>
                <h2 className='text-center mb-5 text-3xl font-bold'>Add Note</h2>
                <form className='flex flex-col gap-2' onSubmit={handleUpdateNote}>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 p-3 rounded-lg  text-lg outline-none' placeholder='Enter title' />
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} className='border-2 rounded-lg p-3  outline-none resize-none' placeholder='Enter description' rows={5}></textarea>
                    <button className='bg-orange-500 text-white p-3 rounded-lg text-lg'>
                        {loading && <Loader />}
                        {
                            loading ? '...' : 'Save Changes'
                        }
                    </button>
                </form>

            </div>
        </section>
    )
}

export default AddNote
