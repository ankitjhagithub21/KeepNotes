import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../redux/slices/appSlice';
import { useNavigate } from 'react-router-dom';
const Note = ({ note }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
     const handleRemoveNote = async () => {
        
      

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteNote()
                dispatch(deleteNote(note._id))
            }
        });
        const handleDeleteNote = async() =>{
                
            const url = `${import.meta.env.VITE_SERVER_URL}/api/notes/${note._id}`;
            try {
                const res = await fetch(url, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.success) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: data.message,
                        icon: 'success',
                    });
                    dispatch(deleteNote(note._id));
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: data.message,
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while deleting the note.',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <div className="p-4 lg:w-1/3 md:w-1/2 w-full">
            <div className="flex rounded-lg h-full bg-gray-300 p-5 flex-col shadow-lg">
                <h2 className="text-xl font-bold">{note.title}</h2>
                <p>{note.content}</p>
                <div className="flex gap-4 mt-5 items-center">
                    <FaTrash color="red" className='cursor-pointer' size={20} onClick={handleRemoveNote} />
                    <FaEdit color="blue" className='cursor-pointer' size={25} onClick={()=>navigate(`/note/${note._id}`)}/>
                </div>
            </div>
        </div>
    );
};

export default Note;
