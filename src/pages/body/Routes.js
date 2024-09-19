import React from 'react';
import Derdibus from "./../../img/derdibus.png";

function Routes() {
    return (
        <div className='bg-[#FFE5A0] text-black p-4'>
            <h1 className='text-3xl my-10 font-extrabold text-black'>OUR ROUTE</h1>
            <div class="flex items-center justify-center">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">

                    <div class="relative  py-6 px-6 rounded-3xl w-64 my-4 shadow-xl  bg-[#4D6C8F] text-white">
                        <div class="text-white flex items-center absolute rounded-full  shadow-xl bg-pink-500 left-4 -top-6">

                            <img src={Derdibus} class="h-24 w-24" alt="Derdibus Icon" />
                        </div>
                        <div class="mt-16">
                            <p class="text-xl font-semibold my-2">Route 1</p>
                            <p class="">સુરત થી જસદણ, આટકોટ, કો.પીઠા, ઉંટવડ, ચરખા, બાબરા, ચમારડી, વાવડી, ધરાઈ, દેવળીયા, રાં. દડવા, ઝુંડાળા,
                            રાવણા, વાસાવડ, પાટખિલોરી, દેરડી, ચોકી, મો.ઉજળા, અનિડા, સુર્યપ્રતાપગઢ, સ્ટે.ખાખરીયા, અરજણસુખ   </p>
                            
                            
                        </div>
                    </div>
                    <div class="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl ">
                        <div class="text-white flex items-center absolute rounded-full  shadow-xl bg-pink-500 left-4 -top-6">

                            <img src={Derdibus} class="h-24 w-24" alt="Derdibus Icon" />
                        </div>
                        <div class="mt-16">
                            <p class="text-xl font-semibold my-2">Route 2</p>
                            <p class="text-gray-600">સુરત થી લીલાપુર, જસદણ, વિરનગર, આટકોટ. પાંચવડા, જીવાપર, પીપળીયા,
                            નવાગામ, સાણથલી, ડોડીયાળા, કેશવાળા, મેતા ખંભાળીયા, મા.ખીલોરી, દેરડી, રાણસીકી, વિંઝીવડ, મોટા સગપર, ધુડશીયા  </p>
                            
                            
                        </div>
                    </div>
                    <div class="relative  py-6 px-6 rounded-3xl w-64 my-4 shadow-xl  bg-[#4D6C8F] text-white">
                        <div class="text-white flex items-center absolute rounded-full  shadow-xl bg-pink-500 left-4 -top-6">

                            <img src={Derdibus} class="h-24 w-24" alt="Derdibus Icon" />
                        </div>
                        <div class="mt-16">
                            <p class="text-xl font-semibold my-2">Route 3</p>
                            <p class="">સુરત થી ધંધુકા, પાળીયાદ, વીંછીયા, લીલાપુર, જસદણ, આટકોટ, જંગવડ, કોટડાપીઠા, ઉંટવડ, ચરખા, બાબરા, લુણકી, ઈંગોરાળા ગામ,
                            ભીલા, ભીલડી, ચિત્તલ, રાંઢીયા, જીથુડી, લુણીધાર, કોલડા, જંગર, ના.કુંકાવાવ, મો.કુંકાવાવ, ન., જુ.વાધણીયા </p>
                            
                            
                        </div>
                    </div>
                    <div class="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
                        <div class="text-white flex items-center absolute rounded-full  shadow-xl bg-pink-500 left-4 -top-6 ">

                            <img src={Derdibus} class="h-24 w-24" alt="Derdibus Icon" />
                        </div>
                        <div class="mt-16">
                            <p class="text-xl font-semibold my-2">Route 4</p>
                            <p class="">સુરત થી (જસદણ-સુર્યા પંપ), હડમતીયા,shivરાજપુર, ગોખલાણા, વાવડા, કોટડા, કર્ણકી, પાનસડા, ગરણી, થોરખાણ, રાણપર,
                            નડાળા, ત્રંબોડા, દેવળીયા, ફુલઝર, કો.ખીજડીયા, બ.પીપરીયા, સારિંગપુર, દેવગામ </p>
                            
                            
                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
}

export default Routes;
