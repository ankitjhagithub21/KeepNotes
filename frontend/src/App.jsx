import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddNote from './pages/AddNote'
import Form from './pages/Form'
import UpdateNote from './pages/UpdateNote'
import "./App.css"
import { useSelector } from 'react-redux'
import useFetchUser from './hooks/useFetchUser'
import Navbar from './components/Navbar'



const App = () => {

  const user = useSelector(state => state.app.user)
  useFetchUser()

  return (
    <>
      {
        user ? <>
        <Navbar/>
         
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/add' element={<AddNote />} />
            <Route path='/note/:id' element={<UpdateNote />} />
          </Routes>
        </> : <Form />
      }
    </>
  )
}

export default App
