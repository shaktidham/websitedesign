import React from "react";
import { ReactComponent as Show } from "./../../svg/eyes.svg";
import { ReactComponent as Whatapp } from "./../../svg/whatapp.svg";
import { ReactComponent as Edit } from "./../../svg/edit.svg";
import { ReactComponent as Plush } from "./../../svg/plush.svg";
import { ReactComponent as Delete } from "./../../svg/delete.svg";
import { useNavigate } from "react-router-dom";

// Modular component for the seat cell
const SeatCell = ({ seat, matchingSeat, handleDelete, passengers, Details, date, route,handlewhatapp }) => {
  const navigate = useNavigate();
  
  return (
      <td className="border border-black text-sm text-center h-[150px]">
          <div className="flex flex-col justify-between h-full">
              {/* Top section with Edit or Plush icon */}
              <div className="flex justify-between">
                  <div
                      className={`cursor-pointer ${matchingSeat?.mobile ? "" : "flex justify-end"}`}
                      onClick={() => navigate("/Bookingform", { state: { id: route, date: date, label: seat, passengers: passengers, matchingSeat: matchingSeat } })}
                  >
                      {matchingSeat?.mobile ? <Edit height="15px" width="15px" /> : <Plush height="15px" width="15px" />}
                  </div>
                  {matchingSeat?.mobile && (
                      <div
                          className="cursor-pointer"
                          onClick={() => Details(matchingSeat)}
                      >
                          <Show height="15px" width="15px" />
                      </div>
                  )}
              </div>

              {/* Middle section: Seat number and matching seat details */}
              <div className="flex flex-col items-center justify-center">
                  <div className="text-sm font-bold text-red-600">{seat}</div>
                  {matchingSeat && (
                      <>
                          <div className="text-sm">{matchingSeat.name}</div>
                          <div className="text-sm">{matchingSeat.mobile}</div>
                          <div className="text-sm">{matchingSeat.to}</div>
                          <div className="text-sm">{matchingSeat.extradetails}</div>
                      </>
                  )}
              </div>

              {/* Bottom section: WhatsApp and Delete icons */}
              {matchingSeat?.mobile ? (
                  <div className="flex justify-between m-2">
                      <div className="cursor-pointer" onClick={ ()=>handlewhatapp(matchingSeat)}>
                          <Whatapp fill="green" height="15px" width="15px" />
                      </div>
                      <div
                          className="cursor-pointer"
                          onClick={() => handleDelete(matchingSeat.id)}
                      >
                          <Delete height="15px" width="15px" />
                      </div>
                  </div>
              ):(<div></div>)}
          </div>
      </td>
  );
};


export const generateTableRows = (data, passengers, handleDelete, Details, date, route,handlewhatapp) => {
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
                      handlewhatapp={handlewhatapp}
                  />
              );
          })}
      </tr>
  ));
};

