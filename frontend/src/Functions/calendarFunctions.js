import { CalendarDate } from "@internationalized/date";

export function stringToCalendarDate(dateString) {
  if (!dateString) return null;

  // Dividir la cadena en día, mes y año utilizando el guion como separador
  const [day, month, year] = dateString.split("-").map(Number); // Convertir a número

  // Verificar si los valores son válidos
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    console.error("Fecha no válida:", dateString);
    return null;
  }

  // Crear un nuevo CalendarDate (CalendarDate usa mes basado en 1, así que month ya está correcto)
  const calendarDate = new CalendarDate(year, month, day);

  return calendarDate;
}

export function handleDateChange(dates, setCheckIn, setCheckOut) {
  const { start, end } = dates;

  if (start) {
    const jsDate = new Date(start);
    const day = String(jsDate.getDate()).padStart(2, "0");
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const year = jsDate.getFullYear();
    setCheckIn(`${year}-${month}-${day}`);
  }

  if (end) {
    const jsDate2 = new Date(end);
    const day2 = String(jsDate2.getDate()).padStart(2, "0");
    const month2 = String(jsDate2.getMonth() + 1).padStart(2, "0");
    const year2 = jsDate2.getFullYear();
    setCheckOut(`${year2}-${month2}-${day2}`);
  }
};

export function handleDateChange2(dates, setCheckIn, setCheckOut) {
  const { start, end } = dates;

  if (start) {
    const jsDate = new Date(start);
    const day = String(jsDate.getDate()).padStart(2, "0");
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const year = jsDate.getFullYear();
    setCheckIn(`${day}-${month}-${year}`);
  }

  if (end) {
    const jsDate2 = new Date(end);
    const day2 = String(jsDate2.getDate()).padStart(2, "0");
    const month2 = String(jsDate2.getMonth() + 1).padStart(2, "0");
    const year2 = jsDate2.getFullYear();
    setCheckOut(`${day2}-${month2}-${year2}`);
  }
};

export function transformDate(date) {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}

export function calculateCheckInOut({ setCheckIn, setCheckOut}) {
  const CHECK_IN_DAYS = 10;
const CHECK_OUT_DAYS = 15;
  const today = new Date();

  const checkInDate = new Date(today);
  checkInDate.setDate(today.getDate() + CHECK_IN_DAYS);

  const checkOutDate = new Date(today);
  checkOutDate.setDate(today.getDate() + CHECK_OUT_DAYS);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes empieza desde 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  setCheckIn(formatDate(checkInDate));
  setCheckOut(formatDate(checkOutDate));
}

export function handleTimeChange(time, type) {
  const hour = String(time.hour).padStart(2, "0");
  const minute = String(time.minute).padStart(2, "0");
  if (type === "checkIn") {
    return `${hour}:${minute}`;
  } else {
    return `${hour}:${minute}`;
  }
}

export function handleTimeChange2(time, type) {
  const [hour, minute] = time.split(":").map(Number);

  if(type === "checkIn"){
    return {hour, minute};
  } else {
    return {hour, minute};
  }
}

export function convertToISODate(date) {
  const [day, month, year] = date.split("-");
  return new Date(`${year}-${month}-${day}`);
}

export function convertToDate(dateStr) {
  const [day, month, year] = dateStr.split('-');
  return new CalendarDate(parseInt(year), parseInt(month) - 1, parseInt(day)); // Mes - 1 porque CalendarDate usa base 0 para los meses
}

export function getTotalDays(arrivalDate, departureDate) {
  // Convertir las fechas al formato 'yyyy-mm-dd' si es necesario
  const formattedArrival = formatDate(arrivalDate);
  const formattedDeparture = formatDate(departureDate);

  const arrival = new Date(formattedArrival);
  const departure = new Date(formattedDeparture);

  // Verificar si las fechas son válidas
  if (isNaN(arrival.getTime()) || isNaN(departure.getTime())) {
    console.error("Fecha no válida");
    return NaN;
  }

  const diffTime = departure - arrival;
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return totalDays;
}

// Función para formatear la fecha en 'yyyy-mm-dd'
function formatDate(date) {
  const parts = date.split('-');
  return `${parts[2]}-${parts[1]}-${parts[0]}`;  // Convertir 'dd-mm-yyyy' a 'yyyy-mm-dd'
}







