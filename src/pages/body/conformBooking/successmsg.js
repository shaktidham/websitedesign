import React from 'react';
import Header from '../../header';
import Footer from '../footer';

function SuccessMsg() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center text-center p-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Your ticket has been booked <span className='text-green-500'>successfully</span>!</h1>
          <p>
            Click <a href="/download-ticket" className="text-blue-500 hover:underline">here</a> to download your ticket.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SuccessMsg;
