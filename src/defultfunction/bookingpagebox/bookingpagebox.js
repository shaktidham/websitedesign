import React from "react";
import { ReactComponent as Show } from "./../../svg/eyes.svg";
import { ReactComponent as Whatapp } from "./../../svg/whatapp.svg";
import { ReactComponent as Edit } from "./../../svg/edit.svg";
import { ReactComponent as Plush } from "./../../svg/plush.svg";
import { ReactComponent as Delete } from "./../../svg/delete.svg";
import { useNavigate } from "react-router-dom";

// Modular component for the seat cell
const SeatCell = ({ seat, matchingSeat, handleDelete,passengers, Details,date,route }) => {
    const navigate=useNavigate()
console.log(route,"route");
  return (
    <td
      className="border border-black text-sm text-center h-24 w-24 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24"
      style={{ height: "210px", width: "120px" }}
    >
      <div className="flex flex-col justify-between h-full">
     
        <div className="flex justify-between m-2">
        <div
            className={`cursor-pointer ${
              matchingSeat?.mobile ? "" : "flex justify-end"
            }`}
            onClick={() => navigate("/Bookingform", { state: { id:route, date: date ,label:seat,passengers:passengers,matchingSeat:matchingSeat} })}  

          >
            {matchingSeat?.mobile ? <Edit /> : <Plush />}
          </div>
          {matchingSeat?.mobile && (
            <div
              className="cursor-pointer"
              onClick={() => Details(matchingSeat)}
            >
              <Show />
            </div>
          )}

        
        </div>

        {/* Middle section: Seat number and matching seat details */}
        <div className="flex flex-col items-center justify-center ">
          <div className="text-2xl font-bold text-red-600 mb-2">{seat}</div>
          {matchingSeat && (
            <>
              <div className="text-lg font-bold">{matchingSeat.name}</div>
              <div className="text-lg font-bold">{matchingSeat.mobile}</div>
              <div className="text-lg font-bold">{matchingSeat.to}</div>
            </>
          )}
        </div>

        {/* Bottom section: WhatsApp and Delete icons */}
        {matchingSeat?.mobile ? (
          <div className="flex justify-between m-2">
            <div className="cursor-pointer">
              <Whatapp fill="green" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handleDelete(matchingSeat.id)}
            >
              <Delete />
            </div>
          </div>
        ):(<div></div>)}
      </div>
    </td>
  );
};

// Main function to generate rows for the table
export const generateTableRows = (data, passengers, handleDelete, Details,date,route) => {
  return data.map((row, index) => (
    <tr className="border border-black" key={index}>
      {row.map((cell, idx) => {
        const matchingSeat = passengers.find(
          (seat) => seat.seatNumber === cell
        );
        return (
          <SeatCell
            key={idx}
            seat={cell}
            matchingSeat={matchingSeat}
            handleDelete={handleDelete}
            Details={Details}
            date={date}
            passengers={passengers}
            route={route}
          />
        );
      })}
    </tr>
  ));
};
