import React from "react";
import { ReactComponent as Show } from "./../../svg/eyes.svg";
import { ReactComponent as Whatapp } from "./../../svg/whatapp.svg";
import { ReactComponent as Edit } from "./../../svg/edit.svg";
import { ReactComponent as Plush } from "./../../svg/plush.svg";
import { ReactComponent as Delete } from "./../../svg/delete.svg";
import { useNavigate } from "react-router-dom";

// Modular component for the seat cell
const SeatCell = ({
  seat,
  matchingSeat,
  handleDelete,
  passengers,
  Details,
  date,
  route,
  handlewhatapp,
}) => {
  const navigate = useNavigate();

  return (
    <td
      className={`border border-black text-sm text-center h-[150px] ${
        matchingSeat?.to ? "bg-red-100 font-bold" : ""
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Top section with Edit or Plush icon */}
        <div className="flex justify-between">
          <div
            className={`cursor-pointer ${
              matchingSeat?.mobile ? "" : "flex justify-end"
            }`}
            onClick={() =>
              navigate("/Bookingform", {
                state: {
                  id: route,
                  date: date,
                  label: seat,
                  passengers: passengers,
                  matchingSeat: matchingSeat,
                },
              })
            }
          >
            {matchingSeat?.to ? (
              <Edit className="lg:h-6 lg:w-6 h-8 w-8" />
            ) : (
              <Plush className="lg:h-6 lg:w-6 h-8 w-8" />
            )}
          </div>
          {matchingSeat?.to && (
            <div
              className="cursor-pointer"
              onClick={() => Details(matchingSeat)}
            >
              <Show className="lg:h-6 lg:w-6 h-8 w-8" />
            </div>
          )}
        </div>

        {/* Middle section: Seat number and matching seat details */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-lg font-bold text-red-600">{seat}</div>
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
        {matchingSeat?.to ? (
          <div className="flex justify-between m-2">
            <div
              className="cursor-pointer"
              onClick={() => handlewhatapp(matchingSeat)}
            >
              <Whatapp fill="green" className="lg:h-6 lg:w-6 h-8 w-8" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => handleDelete(matchingSeat.id)}
            >
              <Delete className="lg:h-6 lg:w-6 h-8 w-8" />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </td>
  );
};

export const generateTableRows = (
  data,
  passengers,
  handleDelete,
  Details,
  date,
  route,
  handlewhatapp
) => {
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

export const GeneratesTableRows = ({
  kabin,
  chartData,
  route,
  date,
  handlewhatapp,
  handleDelete,
  Details,
}) => {
  const navigate = useNavigate();
  const cellStyle = "p-1";

  return (
    <>
      {kabin?.map((number, index) => {
        return (
          <tr key={index} className="border border-black">
            {number.map((seatNumber) => {
              const item = chartData?.find(
                (item) => item.seatNumber === seatNumber
              );

              return item ? (
                <>
                  <td
                    className={`border border-black ${cellStyle} pt-[-20px] font-bold text-sm text-center w-[20%]`}
                  >
                    {seatNumber}
                  </td>
                  <td className={` ${cellStyle}  font-bold text-sm text-left`}>
                    {item.to || ""}
                  </td>
                  <td className={` ${cellStyle}  font-bold text-sm text-left`}>
                    {item.name || ""}
                  </td>
                  <td className={` ${cellStyle}  font-bold text-sm text-left`}>
                    {item.mobile || ""}
                  </td>

                  <td
                    className={`border border-black ${cellStyle}  font-bold text-sm text-left w-[5%]`}
                    onClick={() =>
                      navigate("/Bookingform", {
                        state: {
                          id: route,
                          date: date,
                          label: seatNumber,
                          passengers: chartData,
                          matchingSeat: item,
                        },
                      })
                    }
                  >
                    <Edit className="lg:h-6 lg:w-6 h-8 w-8" />
                  </td>
                  <td
                    className={`border border-black ${cellStyle} cursor-pointer font-bold text-sm text-left w-[5%]`}
                    onClick={() => Details(item)}
                  >
                    <Show className="lg:h-6 lg:w-6 h-8 w-8" />
                  </td>
                  <td
                    className={`border border-black ${cellStyle} cursor-pointer  font-bold text-sm text-left w-[5%]`}
                    onClick={() => handlewhatapp(item)}
                  >
                    <Whatapp fill="green" className="lg:h-6 lg:w-6 h-8 w-8" />
                  </td>
                  <td
                    className={`border border-black ${cellStyle} cursor-pointer  font-bold text-sm text-left w-[5%]`}
                    onClick={() => handleDelete(item.id)}
                  >
                    <Delete className="lg:h-6 lg:w-6 h-8 w-8" />
                  </td>
                </>
              ) : (
                <>
                  <td
                    className={`border border-black ${cellStyle} text-sm text-center w-[20%]`}
                  >
                    {seatNumber}
                  </td>
                  <td></td>
                  <td></td>

                  <td></td>

                  <td
                    className={`border border-black ${cellStyle} text-center cursor-pointer font-bold text-sm text-left w-[5%]`}
                    onClick={() =>
                      navigate("/Bookingform", {
                        state: {
                          id: route,
                          date: date,
                          label: seatNumber,
                          passengers: chartData,
                          matchingSeat: item,
                        },
                      })
                    }
                  >
                    <Plush className="lg:h-6 lg:w-6 h-8 w-8" />
                  </td>
                </>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};
