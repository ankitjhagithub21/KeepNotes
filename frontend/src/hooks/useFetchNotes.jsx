import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotes } from '../redux/slices/appSlice'

const useFetchNotes = () => {
    const dispatch = useDispatch()
    const {notes} = useSelector(state=>state.app)
    const fetchNotes = async() =>{
        const url = `${import.meta.env.VITE_SERVER_URL}/api/notes`
        try{
            const res = await fetch(url,{
                credentials:'include'
            })
            const data = await res.json()
           if(data.success){
            dispatch(setNotes(data.notes))
           }
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        if(!notes){
            fetchNotes()
        }
    },[])
}

export default useFetchNotes
