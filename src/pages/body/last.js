import React from 'react';
import { ReactComponent as Time } from './../../svg/time.svg';
import { ReactComponent as Privacy } from './../../svg/privacy.svg';
import { ReactComponent as Smile } from './../../svg/smile.svg';

function Last() {
    return (
        <div className='bg-[#FFE5A0] py-10'>
            <div className='text-center mb-10'>
                <h1 className='text-3xl font-bold text-black mb-4'>Why Choose Shaktidham?</h1>
                <h2 className='text-xl font-bold text-black'>See how we go the extra mile to make sure you have the best experience.</h2>
            </div>
            <div className='flex flex-wrap justify-center'>
                <div className='border border-black border-2 p-10 w-full sm:w-1/3 md:w-1/4 mx-2 mb-6'>
                    <div className='bg-red-400 w-fit p-4 rounded-full flex justify-center mx-auto mb-5'>
                        <Smile className='h-8 w-8' fill='white' />
                    </div>
                    <h1 className='text-gray-500 text-2xl font-bold mb-4'>Customer Gratification</h1>
                    <p>We value our customers' smiles over anything else, and offer services that go beyond industry standards.</p>
                </div>
                
                <div className='border border-black border-2 p-5 w-full sm:w-1/3 md:w-1/4 mx-2 mb-6'>
                    <div className='bg-blue-400 w-fit p-4 rounded-full flex justify-center mx-auto mb-5'>
                        <Time className='h-8 w-8' fill='white' />
                    </div>
                    <h1 className='text-gray-500 text-2xl font-bold mb-4'>Time Efficiency</h1>
                    <p>Our processes are designed to save you time, ensuring that you get the service you need when you need it.</p>
                </div>
                
                <div className='border border-black border-2 p-5 w-full sm:w-1/3 md:w-1/4 mx-2 mb-6  '>
                    <div className='bg-green-400 w-fit p-4 rounded-full flex justify-center mx-auto mb-5'>
                        <Privacy className='h-8 w-8' fill='white' />
                    </div>
                    <div className='text-gray-500 text-2xl font-bold mb-4'>Privacy Protection</div>
                    <div>Your privacy is our priority. We implement the best practices to protect your personal information.</div>
                </div>
            </div>
        </div>
    );
}

export default Last;
