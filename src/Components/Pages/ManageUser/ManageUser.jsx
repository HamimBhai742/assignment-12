import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { CgUnblock } from "react-icons/cg";
import { FaUser, FaUsers } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { MdBlock, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";

const ManageUser = () => {
    // const [roleValue, setRoleValue] = useState('')
    // const { data: users = [], refetch } = useQuery({
    //     queryKey: ["Users"],
    //     queryFn: async () => {
    //         const res = await axios.get('http://localhost:5000/users')
    //         return res.data;
    //     }
    // })
    const [users, refetch] = useUser()
    console.log(users);
    // console.log(users);
    const handelBlockBtn = async (id) => {
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
                const res = await axios.patch(`http://localhost:5000/users/blocking/${id}`)
                console.log(res.data);
                Swal.fire({
                    title: "Block!",
                    text: "User have been block",
                    icon: "success"
                });
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
                const res = await axios.patch(`http://localhost:5000/users/unblocking/${id}`)
                console.log(res.data);
                Swal.fire({
                    title: "Unblock!",
                    text: "User have been unblock",
                    icon: "success"
                });
                refetch()
            }
        });

    }
    const handelDeleteBtn = async (id) => {
        console.log(id);


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
                const res = await axios.delete(`http://localhost:5000/users/${id}`)
                console.log(res.data);
                Swal.fire({
                    title: "Deleted!",
                    text: "User deleted successfully.",
                    icon: "success"
                });
                refetch()
            }
        });
    }
    const handelRoleSelectedBtn = async (e) => {
        const roleValue = e.target.value;
        const roleCheaker = roleValue.split(',')[0]
        const id = roleValue.split(',')[1]
        console.log(roleCheaker);
        // console.log(email);
        // const admin=document.getElementById('admin').value
        // console.log(admin);
        console.log(e.target.value);
        // const roleValue = e.target.value
        if (roleCheaker === 'admin') {
            const res = await axios.patch(`http://localhost:5000/users/admin/${id}`)
            console.log(res.data);
            refetch()
        }

        if (roleCheaker === 'contestCreator') {
            const res = await axios.patch(`http://localhost:5000/users/contest/creator/${id}`)
            console.log(res.data);
            refetch()
        }
        // else {

        // }
    }

    // console.log(roleValue);
    // const hadel = (email) => {
    //     console.log(email);
    //     console.log(roleValue);
    // }
    return (
        <section className="container px-4 mt-5 max-w-[900px] ml-16">
            <div className="flex items-center gap-x-3">
                <h2 className="text-2xl text-gray-800 dark:text-white font-lato font-bold">Total User</h2>

                <span className="px-3 py-1  text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-bold">{users?.length}</span>
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
                        users.map((user, idx) => <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 font-bold">{idx + 1}</td>
                            <td className="py-3 px-6 "> <div className="flex items-center gap-x-2">
                                <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
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
        </section>
    );
};

export default ManageUser;