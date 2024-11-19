import React from 'react';
import { ReactComponent as CloseButton } from "./../../../svg/close.svg";

function Pointshow({ popup, setPopup, itemToEdit }) {
    console.log(itemToEdit, "itemTossssEdit");
    return (
        <div>
            {popup && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/2 p-6 rounded-lg shadow-lg mx-4 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <div></div>
                            <div
                                className="cursor-pointer"
                                onClick={() => setPopup(!popup)}
                            >
                                <CloseButton fill="black" className="h-8 w-8" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1">
                                <h1 className="text-xl font-semibold mb-2">Pickup Point</h1>
                                <div className="overflow-y-auto max-h-60">
                                    <table className="min-w-full mt-4 table-auto bg-white">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/4">Village</th>
                                                <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/2">Point</th>
                                                <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/4">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemToEdit.from.map((point) => (
                                                <tr key={point._id}>
                                                    <td className="px-4 py-2 border border-gray-400 text-center">{point.village}</td>
                                                    <td className="px-4 py-2 border border-gray-400">{point.point}</td>
                                                    <td className="px-4 py-2 border border-gray-400">{point.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h1 className="text-xl font-semibold mb-2">Drop Point</h1>
                                <div className="overflow-y-auto max-h-60">
                                    <table className="min-w-full mt-4 table-auto bg-white">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/4">Village</th>
                                                <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/2">Point</th>
                                                <th className="px-4 py-2 border bg-gray-200 border-gray-400 w-1/4">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemToEdit.to.map((point) => (
                                                <tr key={point._id}>
                                                    <td className="px-4 py-2 border border-gray-400 text-center">{point.village}</td>
                                                    <td className="px-4 py-2 border border-gray-400">{point.point}</td>
                                                    <td className="px-4 py-2 border border-gray-400">{point.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pointshow;
