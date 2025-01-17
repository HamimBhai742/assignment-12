import { format } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet';
import useUser from '../../../hooks/useUser';

const API_KEY = import.meta.env.VITE_IMAGE_API_KEY
const Hosting = `https://api.imgbb.com/1/upload?key=${API_KEY}`

const AddContest = () => {
    // formState: { errors }, 
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [users] = useUser()
    const { register, handleSubmit, control, reset } = useForm()
    // const [startDate, setStartDate] = useState(new Date());
    const findCurrentCreator = users.find(cc => cc?.email === user?.email)
    console.log(findCurrentCreator);
    const onSubmit = async (data) => {
        console.log(data);
        if (findCurrentCreator?.status === 'Block') {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "You cannot add any contests.Because you have been blocked",
            });
            return
          }

        const imgeFile = { image: data.contestImg[0] }
        console.log(imgeFile);
        const res = await axiosPublic.post(Hosting, imgeFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data.data.display_url);
        const formattedData = {
            ...data,
            deadLine: format(data.deadLine, 'dd/MM/yyyy'),
        };
        console.log(data.deadLine);
        const contestInfo = {
            contestName: data.contestName,
            contestImg: res.data.data.display_url,
            contestDes: data.contestDescription,
            taskDetails: data.taskDeatils,
            contestTag: data.contestTag,
            contestPrice: data.contestPrice,
            deadLine: formattedData?.deadLine,
            prizeMoney: data.prizeMoney,
            addUserEmail: user?.email,
            sortByDate: data.deadLine
        }
        // console.log(contestInfo);
        const result = await axiosSecure.post('/contest', contestInfo)
        console.log(result.data);
        if (result.data.insertedId) {
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You have been succcessfully added contest",
                showConfirmButton: false,
                timer: 1500
            });
        }


    }
    return (
        <section className="dark:bg-gray-100 dark:text-gray-900 max-sm:w-[350px] mx3 bg-teal-100 rounded-lg lg:mx-16 my-6">
            <Helmet>
                <title>Add Contest</title>
            </Helmet>
            <div className="space-y-2 col-span-full lg:col-span-1 text-center pt-5">
                <p className="font-cinzel lg:text-4xl text-2xl font-bold">Add Contest</p>
                <p className="text-xs max-w-96 mx-auto font-inter">Add your favorite contest.Mention the price along with the contest.Also mention the date line of adding the contest.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="container p-6 font-lato">
                <fieldset className="grid grid-cols-2 gap-6 p-6 rounded-md dark:bg-gray-50">
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Contest Name</label>
                            <input {...register('contestName')} type="text" placeholder="Contest Name" className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Contest Price</label>
                            <input {...register("contestPrice")} type="number" placeholder="Contest Price" className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                        </div>
                        {/* <div className="col-span-full sm:col-span-3">
                            <label htmlFor="email" className="text-sm">Email</label>
                            <input id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                        </div> */}
                        <div className="col-span-full">
                            <label className="text-sm font-semibold">Contest Description</label>
                            <textarea {...register('contestDescription')} placeholder='Contest Description....' className="w-full pt-1 pl-3 h-20 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></textarea>
                        </div>
                        <div className="col-span-full">
                            <label className="text-sm font-semibold">Details of Task</label>
                            <textarea {...register('taskDeatils')} placeholder=' Details of Task....' className="w-full pt-1 pl-3 h-20 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></textarea>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Prize</label>
                            <input {...register('prizeMoney')} type="text" placeholder="Prize Money" className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Contest Tag</label>
                            <select {...register('contestTag')} className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select your contest tag</option>
                                <option value='Image Design'>Image Design</option>
                                <option value='Article Writing'>Article Writing</option>
                                <option value='Digital Advertisement'>Digital Advertisement</option>
                                <option value='Business Idea Concerts'>Business Idea Concerts</option>
                                <option value='Movie Review'>Movie Review</option>
                                <option value='Gaming Review'>Gaming Review</option>
                                <option value='Marketing Strategy'>Marketing Strategy</option>
                            </select>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="state" className="text-sm font-semibold">Contest Image</label>
                            <input {...register('contestImg')} type="file" className="file-input w-full" />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="zip" className="text-sm font-semibold">Contest Deadline</label>
                            {/* <input id="zip" type="text" placeholder=""  /> */}
                            <div className="w-full   focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
                                {/* <DatePicker {...register('deadLine')} className='h-12 pl-3 rounded-md' selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                                <Controller
                                    name='deadLine'
                                    control={control}
                                    defaultValue={null}
                                    render={({ field }) => (<DatePicker className='h-12 md:w-80 pl-3 rounded-md'
                                        placeholderText="Select date"
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}

                                        // timeFormat="HH:mm"
                                        dateFormat="dd/MM/yy"></DatePicker>
                                    )}>

                                </Controller>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <button className='btn w-full btn-accent font-bold text-lg text-slate-800'>Add Contest</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default AddContest;