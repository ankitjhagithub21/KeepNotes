import React, { useEffect } from 'react'
import useFetchNotes from '../hooks/useFetchNotes'
import { useSelector } from 'react-redux'
import Note from '../components/Note'

const Home = () => {
  
  const { notes } = useSelector(state => state.app)
  useFetchNotes()
  return (
    <section>
      <div className="container px-5 py-24 mx-auto">
       
        <div className="flex flex-wrap -m-4">
         {
           notes?.map((note)=>{
            return <Note key={note._id} note={note}/>
           })
         }
         
        </div>
      </div>
    </section>

  )
}

export default Home
