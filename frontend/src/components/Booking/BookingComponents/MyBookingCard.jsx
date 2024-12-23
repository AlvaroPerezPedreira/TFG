import React, {
  startTransition,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useNavigate } from "react-router-dom";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {
  CancelBookingIcon,
  CancelBookingIcon2,
} from "../../../icons/CancelBookingIcon";
import RateBookingIcon from "../../../icons/RateBookingIcon";
import { useThemeContext } from "../../../context/ThemeContext";
import { convertToISODate } from "../../../Functions/calendarFunctions";
import useBookings from "../../../hooks/useBookings";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

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

  const useDisclosure = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);
    const onOpenChange = useCallback(() => setIsOpen((prev) => !prev), []);

    return { isOpen, onOpen, onClose, onOpenChange };
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleCancel = (e) => {
    console.log("cancel");
    startTransition(() => {
      cancelBooking({ token, bookingId: booking.id, setIsBookingCancelled });
    });
  };

  const handleRate = (e) => {
    console.log("rate");
    startTransition(() => {
      navigate(`/bookings/rateBooking/${booking.id}`);
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
            <>
              <Button
                children={t("cancel")}
                variant="bordered"
                color="danger"
                startContent={<CancelBookingIcon2 />}
                onPress={onOpen}
              />
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                size="sm"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        {t("confirmCancel")}
                      </ModalHeader>
                      <ModalBody>
                        <div className="flex justify-between">
                          <Button
                            color="danger"
                            variant="bordered"
                            onPress={onClose}
                            children={t("close")}
                            startContent={<CancelBookingIcon />}
                          />
                          <Button
                            color={color}
                            children={t("confCancel")}
                            variant="bordered"
                            onPress={handleCancel}
                            startContent={<CancelBookingIcon2 />}
                          />
                        </div>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          )}
          {(isBookingCancelled || isOver) &&
            !booking.is_reviewed &&
            !isBookingCancelled && (
              <Button
                children={t("review")}
                variant="bordered"
                color={color}
                startContent={<RateBookingIcon />}
                onPress={handleRate}
              />
            )}
        </CardFooter>
      </Card>
    </>
  );
}
