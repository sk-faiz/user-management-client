import React, { useEffect, useState } from 'react';
import { createUser } from '../api/user.js';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

const AddUser = ({ showModal, setShowModal }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [dob, setDob] = useState("")
    const [date, setDate] = useState("")
    const [errors, setErrors] = useState()

    const handleDateChange = (e) => {
        setDate(e.target.value)
        const timestampValue = Math.floor(new Date(e.target.value).getTime() / 1000).toString();
        setDob(timestampValue);
    };

    const handleSubmit = () => {
        if (!name || !email || !pass || !dob) {
            toast.error("Please fill all the fields!");
            return;
        }

        createUser({ name, email, password: pass, dob }).then((res) => {
            console.log(res)
            if (res.status === 201) {
                setShowModal(false)
                toast.success(res.data.message);
            }
        })
    }

    return (<>
        {showModal ? (
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Add User
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <form className="mt-2" action="/submit" method="post">
                                    <label htmlFor="name" className="text-sm text-gray-700 light:text-gray-200">
                                        Name
                                    </label>
                                    <input type="text" required name="name" id="name" onChange={(e) => setName(e.target.value)} placeholder="user@email.xyz" value={name} className="mb-2 block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 light:border-gray-600 light:bg-gray-900 light:text-gray-300 light:focus:border-blue-300" />

                                    <label htmlFor="email" className="text-sm text-gray-700 light:text-gray-200">
                                        Email
                                    </label>
                                    <input type="email" required name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="user@email.xyz" value={email} className="mb-2 block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 light:border-gray-600 light:bg-gray-900 light:text-gray-300 light:focus:border-blue-300" />

                                    <label htmlFor="password" className="text-sm text-gray-700 light:text-gray-200">
                                        Password
                                    </label>
                                    <input type="password" required name="password" id="password" onChange={(e) => setPass(e.target.value)} placeholder="user@email.xyz" value={pass} className="mb-2 block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 light:border-gray-600 light:bg-gray-900 light:text-gray-300 light:focus:border-blue-300" />

                                    <label htmlFor="password" className="text-sm text-gray-700 light:text-gray-200">
                                        Date of Birth
                                    </label>
                                    <input type="date" required name="password" id="dob" onChange={(e) => handleDateChange(e)} placeholder="user@email.xyz" value={date} className="mb-2 block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 light:border-gray-600 light:bg-gray-900 light:text-gray-300 light:focus:border-blue-300" />
                                </form>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                    onClick={() => handleSubmit()}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
    </>)
}

export default AddUser;
