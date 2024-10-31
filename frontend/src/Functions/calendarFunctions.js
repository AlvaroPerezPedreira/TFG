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