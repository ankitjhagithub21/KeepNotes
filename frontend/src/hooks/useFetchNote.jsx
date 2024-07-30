import { useEffect, useState } from 'react'


const useFetchNote = (noteId) => {
    const [note,setNote] = useState(null)
        const fetchNote = async() =>{
        const url = `${import.meta.env.VITE_SERVER_URL}/api/notes/${noteId}`
        try{
            const res = await fetch(url,{
                credentials:'include'
            })
            const data = await res.json()
        
            if(data.success){
                setNote(data.note)
            }
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
      fetchNote()
    },[noteId])
    return note
}

export default useFetchNote
