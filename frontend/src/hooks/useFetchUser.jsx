import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/appSlice'

const useFetchUser = () => {
    const dispatch = useDispatch()
    const getUserFromServer = async() =>{
        const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/user`
        try{
            
            const res = await fetch(url,{
                credentials:'include'
            })
            const data = await res.json()

            if(data.success){
                dispatch(setUser(data.user))
            }else{
                dispatch(setUser(null))
            }
        }catch(error){
            console.log(error)
        }
    }
  useEffect(()=>{
    getUserFromServer()
  },[])
}

export default useFetchUser
