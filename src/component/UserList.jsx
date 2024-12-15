import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../api/user.js';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import AddUser from './AddUser.jsx';
import ViewUser from './ViewUser.jsx';
import { toast } from 'react-toastify';
import EditUser from './EditUser.jsx';

const UserList = () => {
    // const navigate = useNavigate(); 
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [userId, setUserId] = useState()

    useEffect(() => {
        fetchUsers(search).then((res) => {
            const data = res.data;

            setUsers(data.data)
        });

    }, [search, editModal]);

    const handleDelete = (id) => {
        deleteUser(id).then(() => setUsers(users.filter((user) => user.id !== id)));
        toast.success('User Deleted Successfully');
    };

    const handleViewModal = (id) => {
        setUserId(id)
        setViewModal(true)
    }

    const handleEditModal = (id) => {
        setUserId(id)
        setEditModal(true)
    }
    return (
        <>
            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h2 className="text-lg font-medium text-gray-800 light:text-white">User List</h2>

                    <div className="flex items-center mt-4 gap-x-3">
                        <button onClick={() => setShowModal(true)} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 light:hover:bg-blue-500 light:bg-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            <span>Add User</span>
                        </button>
                    </div>
                </div>

                <div className="mt-6 md:flex md:items-center md:justify-between">
                    <div className="relative flex items-center mt-4 md:mt-0">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 light:text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>

                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 light:bg-gray-900 light:text-gray-300 light:border-gray-600 focus:border-blue-400 light:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                </div>

                {users && (<>
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 light:border-gray-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 light:divide-gray-700">
                                        <thead className="bg-slate-200">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 light:text-gray-400">
                                                    <span>Name</span>
                                                </th>

                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 light:text-gray-400">
                                                    Email
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 light:text-gray-400">
                                                    Date of Birth
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 light:text-gray-400">
                                                    Added On
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 light:text-gray-400">
                                                    Options
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 light:divide-gray-700 light:bg-gray-900">
                                            {users.map((user) => (
                                                <tr>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <div className="flex items-center gap-x-2">
                                                                {/* <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full light:bg-gray-800">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                            </svg>
                                                        </div> */}

                                                                <div>
                                                                    <h2 className="font-normal text-gray-800 light:text-white ">{user.name}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-normal text-gray-700 light:text-white">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 light:text-gray-300 light:text-white">{moment(user.dob * 1000).format("Do MMM, YYYY")}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 light:text-gray-300 light:text-white">{moment(user.createdAt).format("Do MMM, YYYY")}</td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <button onClick={() => handleViewModal(user.id)} className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg light:text-gray-300 hover:bg-gray-100">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                                        </button>
                                                        <button onClick={() => handleEditModal(user.id)} className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg light:text-gray-300 hover:bg-gray-100">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                                        </button>
                                                        <button onClick={() => handleDelete(user.id)} className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg light:text-gray-300 hover:bg-gray-100">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)}
                {users.length === 0 && (<>
                    <div className="flex items-center mt-6 text-center border rounded-lg h-96 light:border-gray-700">
                        <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
                            <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full light:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <h1 className="mt-3 text-lg text-gray-800 light:text-white">No users found</h1>
                            <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
                                <button onClick={() => setSearch("")} className="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg sm:w-auto light:hover:bg-gray-800 light:bg-gray-900 hover:bg-gray-100 light:text-gray-200 light:border-gray-700">
                                    Clear Search
                                </button>
                            </div>
                        </div>
                    </div>
                </>)}
            </section>

            <AddUser showModal={showModal} setShowModal={setShowModal} />
            <ViewUser showModal={viewModal} setShowModal={setViewModal} id={userId} />
            <EditUser showModal={editModal} setShowModal={setEditModal} id={userId} />
        </>
    );
};

export default UserList;