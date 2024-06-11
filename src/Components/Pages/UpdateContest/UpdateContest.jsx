import { format } from 'date-fns';
import React from 'react';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const API_KEY = import.meta.env.VITE_IMAGE_API_KEY
const Hosting = `https://api.imgbb.com/1/upload?key=${API_KEY}`

const UpdateContest = () => {
    // formState: { errors }, 
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { register, handleSubmit, control, reset } = useForm()
    // const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams()
    const { data: updateContest } = useQuery({
        queryKey: ['updateContest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/update/${id}`)
            return res.data;
        }
    })
    console.log(updateContest);
    // const { prizeMoney, deadLine, contestPrice, contestTag, contestDes, contestImg, contestName ,taskDetails} = updateContest
    const onSubmit = async (data) => {
        console.log(data);
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
        console.log(formattedData.deadLine);
        const updateInfo = {
            contestName: data.contestName,
            contestImg: res.data.data.display_url,
            contestDes: data.contestDescription,
            taskDetails: data.taskDeatils,
            contestTag: data.contestTag,
            contestPrice: data.contestPrice,
            deadLine: formattedData.deadLine,
            prizeMoney: data.prizeMoney,
            addUserEmail: user?.email
        }
        const result = await axiosPublic.patch(`/my-contest/update/${id}`, updateInfo)
        if (result.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You have been succcessfully update contest",
                showConfirmButton: false,
                timer: 1500
            });
        }
        // console.log(result.data.modifiedCount);
        // console.log(contestInfo);
        // console.log(contestInfo);
        // const result = await axiosSecure.post('/contest', contestInfo)
        // console.log(result.data);
        // if (result.data.insertedId) {
        //     reset()
        //     Swal.fire({
        //         position: "top-end",
        //         icon: "success",
        //         title: "You have been succcessfully added contest",
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        // }


    }
    return (
        <section className="dark:bg-gray-100 dark:text-gray-900 bg-sky-100 rounded-lg mx-16 my-6">
            <Helmet>
                <title>Update Contest</title>
            </Helmet>
            <div className="space-y-2 col-span-full lg:col-span-1 text-center pt-5">
                <p className="font-cinzel text-4xl font-bold">Add Contest</p>
                <p className="text-xs max-w-96 mx-auto font-inter">Add your favorite contest.Mention the price along with the contest.Also mention the date line of adding the contest.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="container p-6 font-lato">
                <fieldset className="grid grid-cols-2 gap-6 p-6 rounded-md dark:bg-gray-50">
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Contest Name</label>
                            <input {...register('contestName')} type="text" defaultValue={updateContest?.contestName} className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Contest Price</label>
                            <input {...register("contestPrice")} type="number" defaultValue={updateContest?.contestPrice} className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                        </div>
                        {/* <div className="col-span-full sm:col-span-3">
                        <label htmlFor="email" className="text-sm">Email</label>
                        <input id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                    </div> */}
                        <div className="col-span-full">
                            <label className="text-sm font-semibold">Contest Description</label>
                            <textarea {...register('contestDescription')} defaultValue={updateContest?.contestDes} className="w-full pt-1 pl-3 h-20 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></textarea>
                        </div>
                        <div className="col-span-full">
                            <label className="text-sm font-semibold">Details of Task</label>
                            <textarea {...register('taskDeatils')} defaultValue={updateContest?.taskDetails} className="w-full pt-1 pl-3 h-20 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></textarea>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Prize Money</label>
                            <input {...register('prizeMoney')} type="number" defaultValue={updateContest?.prizeMoney} className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Contest Tag</label>
                            <select defaultValue={updateContest?.contestTag} {...register('contestTag')} className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select your contest tag</option>
                                <option value='Image Design'>Image Design</option>
                                <option value='Article Writing'>Article Writing</option>
                                <option value='Digital advertisement'>Digital advertisement</option>
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
                                    render={({ field }) => (<DatePicker className='h-12 w-80 pl-3 rounded-md'
                                        placeholderText="Select date"
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        dateFormat="dd/MM/yyyy"></DatePicker>
                                    )}>

                                </Controller>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <button className='btn w-full bg-sky-500 font-bold text-lg text-slate-800'>Update Contest</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default UpdateContest;