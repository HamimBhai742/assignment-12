import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { CgUnblock } from "react-icons/cg";
import { FaUser, FaUsers } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { MdBlock, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Helmet } from "react-helmet";

const ManageUser = () => {
    const [users,reUse] = useUser()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPages = Math.ceil(users?.length / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()]
    const handelSelectedBtn = e => {
        const val = parseInt(e.target.value)
        setItemsPerPage(val)
        setCurrentPage(0)
    }

    const handelPrevBtn = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handelNextBtn = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const { data: perPageUser = [], refetch } = useQuery({
        queryKey: [currentPage, itemsPerPage, 'perPageUser'],
        queryFn: async () => {
            const results = await axiosSecure.get(`/manage-users?page=${currentPage}&size=${itemsPerPage}`)
            // console.log(results.data);
            return results.data;
        }
    })


    const totalUser = users.filter(u => u.role === 'User')
    const totalCreator = users.filter(u => u.role === 'Creator')
    const totalAdmin = users.filter(u => u.role === 'Admin')
    const handelBlockBtn = async (id) => {
        const findUser = perPageUser.find(user => user._id === id)
        if (findUser?.role === "Admin") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can't bolck admin!",
            });
            return
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to block this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Block!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/blocking/${id}`)
                // console.log(res.data);
                Swal.fire({
                    title: "Block!",
                    text: "User have been block",
                    icon: "success"
                });
                reUse()
                refetch()
            }
        });
    }
    const handelUnBlockBtn = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to unblock this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Unblock!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/unblocking/${id}`)
                console.log(res.data);
                Swal.fire({
                    title: "Unblock!",
                    text: "User have been unblock",
                    icon: "success"
                });
                reUse()
                refetch()
            }
        });

    }
    const handelDeleteBtn = async (id) => {
        console.log(id);
        const findUser = perPageUser.find(user => user._id === id)
        if (findUser?.role === "Admin") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can't delete admin!",
            });
            return
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to be delete this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${id}`)
                console.log(res.data);
                Swal.fire({
                    title: "Deleted!",
                    text: "User deleted successfully.",
                    icon: "success"
                });
                reUse()
                refetch()
            }
        });
    }
    const handelRoleSelectedBtn = async (e) => {
        const roleValue = e.target.value;
        const roleCheaker = roleValue.split(',')[0]
        const id = roleValue.split(',')[1]
        const findCurent = users.find(u => u._id === id)
        // console.log(findCurent);
        const curretUser = findCurent?.email === user?.email
        // console.log(curretUser);
        if (roleCheaker === 'admin') {
            const res = await axiosSecure.patch(`/users/admin/${id}`)
            console.log(res.data);
            reUse()
            refetch()
        }

        if (roleCheaker === 'contestCreator') {
            if (curretUser) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You can't change the role!",
                });
                return
            }
            const res = await axiosSecure.patch(`/users/contest/creator/${id}`)
            console.log(res.data);
            reUse()
            refetch()
        }

        if (roleCheaker === 'user') {
            if (curretUser) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You can't change the role!",
                });
                return
            }
            const res = await axiosSecure.patch(`/users/${id}`)
            console.log(res.data);
            reUse()
            refetch()
        }
        // else {

        // }
    }
    return (
        <section className="container px-4 mt-5 max-w-[900px] ml-12">
             <Helmet>
                <title>Manage User</title>
            </Helmet>
            <div className="flex justify-around">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-2xl text-gray-800 dark:text-white font-lato font-bold">Total User</h2>

                    <span className="px-3 py-1  text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-bold">{totalUser?.length}</span>
                </div>
                <div className="flex items-center gap-x-3">
                    <h2 className="text-2xl text-gray-800 dark:text-white font-lato font-bold">Total Creator</h2>

                    <span className="px-3 py-1  text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-bold">{totalCreator?.length}</span>
                </div>
                <div className="flex items-center gap-x-3">
                    <h2 className="text-2xl text-gray-800 dark:text-white font-lato font-bold">Total Admin</h2>

                    <span className="px-3 py-1  text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-bold">{totalAdmin?.length}</span>
                </div>
            </div>
            <table className="table-auto w-[880px] bg-white rounded-t-xl shadow mt-6">
                <thead>
                    <tr className=" text-gray-700 font-inter text-sm leading-normal">
                        <th className="py-3 px-6 bg-slate-300 rounded-tl-lg">Sl.</th>
                        <th className="py-3 px-6 bg-slate-300 text-left">Name</th>
                        <th className="py-3 px-6 bg-slate-300 text-left">Status</th>
                        <th className="py-3 px-6 bg-slate-300 text-left">Role</th>
                        <th className="py-3 px-6 bg-slate-300 text-left">Role Controller</th>
                        <th className="py-3 px-6 bg-slate-300 rounded-tr-lg text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-lato">
                    {
                        perPageUser.map((user, idx) => <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 font-bold">{idx + 1}</td>
                            <td className="py-3 px-6 "> <div className="flex items-center gap-x-2">
                                <img className="object-cover w-10 h-10 rounded-full" src={user.photoUrl} alt="" />
                                <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white ">{user.name}</h2>
                                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{user.email}</p>
                                </div>
                            </div></td>
                            <td className="py-3 px-6 ">
                                {user.status === 'Active' ? <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                    <h2 className="text-sm font-normal text-emerald-500">{user?.status || "Active"}</h2>
                                </div> : <div className="bg-gray-400 px-3 w-fit py-1 text-center rounded-full"><p className="flex text-slate-800 items-center gap-1 "><span><MdBlock></MdBlock></span>{user?.status}</p></div>}
                            </td>
                            <td>
                                {user?.role === "Admin" && <h2 className="text-sm font-semibold text-center py-1 rounded-full bg-pink-200 text-pink-700">{user?.role}</h2>}
                                {user?.role === "Creator" && <h2 className="text-sm font-semibold text-center py-1 rounded-full bg-blue-200 text-blue-600">{user?.role}</h2>}
                                {user?.role === "User" && <div className="text-center text-2xl bg-sky-200 px-4 py-2 rounded-lg w-fit"><FaUser></FaUser></div>}
                            </td>
                            <td className="py-3 px-6">
                                <select disabled={user?.status === 'Block'} onChange={handelRoleSelectedBtn} className="select w-full max-w-xs">
                                    <option disabled selected>Select your role</option>
                                    <option disabled={user?.role === "Admin"} value={`admin,${user?._id}`}>Admin</option>
                                    <option disabled={user?.role === "Creator"} value={`contestCreator,${user?._id}`}>Contest Creator</option>
                                    <option disabled={user?.role === "User"} value={`user,${user?._id}`}>User</option>
                                </select>
                            </td>
                            <td className="py-3 px-6 ">
                                <div className="dropdown dropdown-right">
                                    <label tabIndex="0" className="btn btn-ghost text-xl m-1">⋮</label>
                                    <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-28">
                                        <li>{user?.status === 'Block' ? <button onClick={() => handelUnBlockBtn(user?._id)} className="flex items-center"><span><CgUnblock></CgUnblock></span>Unblock</button> : <button onClick={() => handelBlockBtn(user?._id)} className="flex items-center"><span><MdBlock></MdBlock></span>Block</button>}</li>
                                        <li><button onClick={() => handelDeleteBtn(user?._id)} className="flex items-center"><span><MdDelete></MdDelete></span>Delete</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <div className='text-center flex gap-5 items-center justify-center my-5'>
                <button onClick={handelPrevBtn}><div className='text-xl flex items-center justify-center border-[2px] hover:bg-blue-500 border-blue-500 w-10 h-10 rounded-full'><IoIosArrowBack></IoIosArrowBack></div></button>
                <div className='flex gap-3 '>
                    {
                        pages?.map(page => <button onClick={() => setCurrentPage(page)} className={currentPage === page ? 'rounded-full w-10 h-10 border-[2px] border-blue-500 px-3 bg-blue-500 font-semibold' : 'border-[2px] border-blue-500 w-10 h-10 rounded-full '} key={page}>{page + 1}</button>)
                    }
                </div>
                <button onClick={handelNextBtn}><span className='text-xl flex items-center justify-center border-[2px] hover:bg-blue-500 border-blue-500 w-10 h-10 rounded-full'><IoIosArrowForward></IoIosArrowForward></span></button>
                <select onChange={handelSelectedBtn} defaultValue={itemsPerPage} className=' border-2 h-10 w-28 font-medium font-inter border-slate-600 rounded-lg px-1' id="">
                    <option value="5">5 / Page</option>
                    <option value="10">10 / Page</option>
                    <option value="20">20 / Page</option>
                    <option value="30">50 / Page</option>
                </select>

            </div>
        </section>
    );
};

export default ManageUser;