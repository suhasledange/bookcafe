import React, { useCallback, useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import formatDate from '../util/formatDate';
import service from '../appwrite/service';
import Loader from './Loader';

const OptionsModal = ({  setoption,Id,Due,DueDate,DeliveredDate, book, setOptionsModal, optionsModal }) => {
    const [selectedOption, setSelectedOption] = useState('extend');
    const [days, setDays] = useState(1);
    const [pay,setPay] = useState(5);
    const [extendedday,setExtendeddays] = useState(null)
    const [loading,setLoading] = useState(false);

    const changeDate = useCallback(()=>{
        const date = new Date(DueDate);
        date.setDate(date.getDate() + days);
        setExtendeddays(date)
        setPay(days*5)
    },[days])

    useEffect(()=>{
        changeDate()
    },[days])

    const handleReturnButtonClick = async () => {
        if(Due === 0){
            try {
                setLoading(true)
                const res = await service.returnBook(Id);
                if(res) {
                await setoption((prev)=>!prev)
                setOptionsModal(false)
            }

            } catch (error) {
                console.log("error returning",error)
            }finally{
                setLoading(false)
            }
        }
        
    };
    const handleExtendButtonClick = () => {
        console.log("Extending...", days,pay);
    };

    const handleDays = (e)=>{
        setDays(parseInt(e.target.value))
    }

    return (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div onClick={() => setOptionsModal(false)} className='fixed inset-0 w-full h-full bg-black opacity-40'></div>
            <div className='flex items-center min-h-screen px-4 py-8'>
                <div className='relative w-full max-w-2xl p-4 mx-auto bg-white rounded-sm shadow-lg'>
                    <div className='flex justify-end'>
                        <button onClick={() => setOptionsModal(false)} className='p-2 text-gray-400 rounded-md hover:bg-gray-100'>
                            <IoCloseSharp className='text-2xl' />
                        </button>
                    </div>

                    <div className='w-[90%] mx-auto py-3 space-y-3 text-center'>

                        <h4 className='text-lg font-semibold text-gray-800'>
                            Select Option
                        </h4>


                        <div className='relative mt-3 pb-4'>

                            <button
                                onClick={() => setSelectedOption('extend')}
                                className={`py-2 px-4 rounded-l-full focus:outline-none ${selectedOption === 'extend' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Extend
                            </button>
                            <button
                                onClick={() => setSelectedOption('return')}
                                className={`py-2 px-4 rounded-r-full focus:outline-none ${selectedOption === 'return' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Return
                            </button>
                        </div>

                        {selectedOption === 'extend' && (
                                
                            Due === 0 ?  

                            <div className="mt-2">
                                
                                <div>
                                    <label htmlFor="daysToExtend" className="mr-2">Select days :</label>
                                    <select
                                        id="daysToExtend"
                                        onChange={handleDays}
                                        value={days}
                                        className="border border-gray-300 rounded-md focus:outline-none px-2 py-1"
                                    >
                                        <option value={1}>1 day</option>
                                        <option value={2}>2 days</option>
                                        <option value={3}>3 days</option>
                                    </select>
                                </div>
                        
                                <p className='text-sm text-gray-700'>(Note : you can only extend it once)</p>
                            
                            <div className='mt-4 mb-4'>
                            <table className="border-collapse w-full  ">
                                        <tbody className="text-left">
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Due Date</td>
                                                <td className="border px-4 py-2 font-light text-red-500">{formatDate(DueDate)}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Extended Date</td>
                                                <td className="border px-4 py-2 font-light text-red-500">{formatDate(extendedday)}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Book Name</td>
                                                <td className="border px-4 py-2 font-light">{book.bookName}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                            </div>

                                <button onClick={handleExtendButtonClick} className="mt-2 bg-black active:scale-95 duration-200 text-white px-4 py-2 rounded-sm focus:outline-none">Pay &#8377;{pay}</button>

                            </div>

                            :<div className='mt-2'>
                                <p className='text-red-500 mb-2'>You have Due of : &#8377;{Due}</p>
                                <button
                                onClick={() => setSelectedOption('return')}
                                className={`py-2 px-4 rounded-sm focus:outline-none bg-black text-white`}
                            >
                                Return Book
                            </button>
                            </div>

                        )}

                        {selectedOption === 'return' && (
                            <div className="mt-2">

                                <div className='relative mt-3 mb-4'>
                                    <table className="border-collapse w-full  ">
                                        <tbody className="text-left">

                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Delivered Date</td>
                                                <td className="border px-4 py-2 font-light">{formatDate(DeliveredDate)}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Book Name</td>
                                                <td className="border px-4 py-2 font-light">{book.bookName}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Due</td>
                                                <td className="border px-4 py-2 font-light text-red-500">&#8377;{Due}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className='items-center justify-center flex'>
                                <button onClick={handleReturnButtonClick} className="mt-2 flex items-center gap-3 justify-center bg-black active:scale-95 duration-200 text-white px-4 py-2 rounded-sm focus:outline-none">Return Now
                                {loading && <Loader  className1="w-4 h-4 border-white"/>}
                                </button>
                            </div>

                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default OptionsModal;
