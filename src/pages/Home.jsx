import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToNotes } from '../app/NotesSlice';


const Home = () => {
    const dispatch = useDispatch();

    const [notesData, setNotesData] = useState({
        title: '',
        description: '',
    });

    const addNote = (e) => {
        e.preventDefault();
        const newNote = { ...notesData, id: new Date().getTime().toString() };
        dispatch(addToNotes(newNote)); // Dispatch the action
        setNotesData({
            title: '',
            description: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotesData({ ...notesData, [name]: value });
    };

    return (
        <section>
            <div className="grid grid-cols-1 ">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 shadow-2xl rounded-2xl mt-20 md:mt-18 lg:mt-10"
                // style={{
                //     backgroundImage: `url("https://images.pexels.com/photos/5634855/pexels-photo-5634855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
                //     backgroundRepeat: "no-repeat",
                //     backgroundPosition: "center",
                //     backgroundSize: "cover"
                // }}
                >
                    <div className="w-full md:max-w-md">
                        <h2 className="text-3xl font-bold font-serif leading-tight text-black sm:text-4xl">Unleash your thoughts, one note at a time</h2>

                        <form action="#" method="POST" className="mt-8" onSubmit={addNote}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="title" className="font-medium text-black">
                                        Enter Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            name='title'
                                            value={notesData.title}
                                            placeholder="Enter title ..."
                                            onChange={handleChange}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="text-base font-medium text-black">
                                        Enter Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            cols="30" rows="10"
                                            className="flex h-10 w-full rounded-md border text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Enter description ..."
                                            name="description"
                                            value={notesData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Add to Notes <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home