import "./styles/mybookings.css";
import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppNavbar from "../AppNavbar";
import useBookings from "../../hooks/useBookings";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useNavigate } from "react-router-dom";
import { Link } from "@nextui-org/link";
import CancelBookingIcon from "../../icons/CancelBookingIcon";
import { Button } from "@nextui-org/button";
import { convertToISODate } from "../../Functions/calendarFunctions";
import { useThemeContext } from "../../context/ThemeContext";
import RateBookingIcon from "../../icons/RateBookingIcon";

function MyBookings() {
  const [t] = useTranslation(["booking"]);
  let navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const { getMyBookings } = useBookings();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  const { color } = useThemeContext();

  useEffect(() => {
    getMyBookings({ token, setBookings });
  }, []);

  console.log(bookings);

  return (
    <Suspense fallback="loading">
      <AppNavbar />
      <div className="myBookings-container">
        <div className="myBookings-titleContainer">
          <span className="myBookings-title">{t("myBookingsTitle")}</span>
        </div>
        {bookings.length === 0 && (
          <div className="myBookings-noBookings">
            <span>{t("noBookings")}</span>
          </div>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {Array.isArray(bookings) &&
            bookings.map((booking, index) => {
              const departureDate = convertToISODate(booking.departure_time);
              const isOver = departureDate < new Date();
              return (
                <Card key={index} isHOrerable className="py-4">
                  <CardHeader className="font-bold text-xl pb-2 text-left text-pretty">
                    <h2 className="font-bold text-xl pb-2 text-left text-pretty">
                      <Link
                        onPress={() => {
                          startTransition(() => {
                            const queryParams = new URLSearchParams({
                              checkIn: booking.check_in,
                              checkOut: booking.check_out,
                            });
                            const path = booking.is_api
                              ? `/lodgeApi/${
                                  booking.lodgeEmail
                                }?${queryParams.toString()}`
                              : `/lodge/${booking.lodgeEmail}`;
                            navigate(path);
                          });
                        }}
                        size="sm"
                      >
                        {booking.lodgeEmail}
                      </Link>
                      <p
                        className="text-s text-default-500"
                        style={{ color: "var(--text-color" }}
                      >
                        {t("price")}
                        {": "}
                        {booking.total_price}
                        {" €"}
                      </p>
                    </h2>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 flex-1 h-full justify-end w-full">
                    <p
                      className="text-s text-default-500"
                      style={{ color: "var(--text-color" }}
                    >
                      {t("arrivalTime")}
                      {": "}
                      {booking.arrival_time}
                    </p>
                    <p
                      className="text-s text-default-500"
                      style={{ color: "var(--text-color" }}
                    >
                      {t("departureTime")}
                      {": "}
                      {booking.departure_time}
                    </p>
                    <p
                      className="text-s text-default-500"
                      style={{ color: "var(--text-color" }}
                    >
                      {t("checkIn")}
                      {": "}
                      {booking.check_in}
                    </p>
                    <p
                      className="text-s text-default-500"
                      style={{ color: "var(--text-color" }}
                    >
                      {t("checkOut")}
                      {": "}
                      {booking.check_out}
                    </p>
                    <p
                      className="text-s text-default-500"
                      style={{ color: "var(--text-color" }}
                    >
                      {t("bookingDate")}
                      {": "}
                      {booking.booking_date}
                    </p>
                  </CardBody>
                  <CardFooter className="flex justify-center mx-auto gap-5">
                    {!booking.is_cancelled && !isOver && (
                      <Button
                        children={t("cancel")}
                        variant="bordered"
                        color="danger"
                        startContent={<CancelBookingIcon />}
                        onPress={() => console.log("cancel")}
                      />
                    )}
                    {(booking.is_cancelled || isOver) &&
                      !booking.is_reviewed && (
                        <Button
                          children={t("review")}
                          variant="bordered"
                          color={color}
                          startContent={<RateBookingIcon />}
                          onPress={() => console.log("review")}
                        />
                      )}
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </div>
    </Suspense>
  );
}

export default MyBookings;
