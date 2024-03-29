import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, Pencil, Trash2 } from 'lucide-react';
import { removeAllNotes, removeFromNotes, updateNote } from '../app/NotesSlice';

const Notes = () => {
    const notes = useSelector((state) => state.notes);
    const dispatch = useDispatch();
    const [editNoteId, setEditNoteId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const deleteNote = (id) => {
        dispatch(removeFromNotes(id));
    };

    const openEditModal = (id) => {
        const noteToEdit = notes.find((note) => note.id === id);
        setEditNoteId(id);
        setEditTitle(noteToEdit.title);
        setEditDescription(noteToEdit.description);
    };

    const closeEditModal = () => {
        setEditNoteId(null);
    };

    const handleUpdateNote = (e) => {
        e.preventDefault();
        dispatch(updateNote(
            {
                id: editNoteId,
                title: editTitle,
                description: editDescription
            }));
        setEditNoteId(null);
        setEditTitle('');
        setEditDescription('');
    };

    const deleteAllNotes = () => {
        dispatch(removeAllNotes())
    }

    if (notes.length <= 0) {
        return (
            <>
                <div className='w-[100%] h-[80vh] flex justify-center items-center'>
                    <p className='text-3xl font-bold font-serif text-center'>No Notes found</p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-8'>
                {notes.map((note) => (
                    <div className="w-[300px]" key={note.id}>
                        <img
                            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                            alt="Laptop"
                            className="h-[200px] w-full rounded-t-md object-cover"
                        />
                        <div className="p-4 rounded-b-md w-[300px] shadow-2xl">
                            <h1 className="text-lg font-semibold">{note.title}</h1>
                            <p className="mt-3 text-sm text-gray-600">{note.description}</p>
                            <div className='mt-3 py-3 flex gap-2 justify-center items-center'>
                                <button onClick={() => openEditModal(note.id)}>
                                    <Pencil />
                                </button>
                                <button onClick={() => deleteNote(note.id)}>
                                    <Trash2 />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className='flex justify-center p-3'>
                <button className='flex border justify-center gap-4 bg-green-700  rounded-2xl px-4 py-3'
                    onClick={deleteAllNotes} >
                    <span className='text-gray-200'>Delete All Notes</span> <span className='text-white'><Trash2 /></span>
                </button>
            </div>
            {/* Modal starts */}
            {editNoteId && (
                <div
                    id="authentication-modal"
                    className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                >
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[80%] md:w-[70%] lg:w-[50%]"
                    >
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Edit Note
                            </h3>
                            <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={closeEditModal}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <form onSubmit={handleUpdateNote}>
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="title" className="font-medium text-gray-900">
                                            Update Title
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                name='title'
                                                placeholder="Update title ..."
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                            ></input>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="text-base font-medium text-gray-900">
                                            Update Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                cols="30" rows="10"
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Update description ..."
                                                name="description"
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        >
                                            Update Note <ArrowRight className="ml-2" size={16} />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal ends */}
        </>
    );
};

export default Notes;
