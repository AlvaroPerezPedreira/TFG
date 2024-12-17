import React, { startTransition, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useNavigate } from "react-router-dom";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import CancelBookingIcon from "../../../icons/CancelBookingIcon";
import RateBookingIcon from "../../../icons/RateBookingIcon";
import { useThemeContext } from "../../../context/ThemeContext";
import { convertToISODate } from "../../../Functions/calendarFunctions";
import useBookings from "../../../hooks/useBookings";

export default function MyBookingCard({ index, booking }) {
  let navigate = useNavigate();
  const [t] = useTranslation(["booking"]);
  const { color } = useThemeContext();
  const token = JSON.parse(localStorage.getItem("authUser")).serviceToken;
  const { cancelBooking } = useBookings();

  const [isBookingCancelled, setIsBookingCancelled] = useState(
    booking.is_cancelled
  );

  const departureDate = convertToISODate(booking.departure_time);
  const isOver = departureDate < new Date();

  const handleCancel = (e) => {
    console.log("cancel");
    startTransition(() => {
      cancelBooking({ token, bookingId: booking.id });
      setIsBookingCancelled(true);
    });
  };

  return (
    <>
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
            <p className="text-xs text-default-500">
              {t("status")}
              {": "}{" "}
              {isOver
                ? t("over")
                : isBookingCancelled
                ? t("cancelled")
                : t("active")}
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
          {!isBookingCancelled && !isOver && (
            <Button
              children={t("cancel")}
              variant="bordered"
              color="danger"
              startContent={<CancelBookingIcon />}
              onPress={handleCancel}
            />
          )}
          {(isBookingCancelled || isOver) &&
            !booking.is_reviewed &&
            !isBookingCancelled && (
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
    </>
  );
}
