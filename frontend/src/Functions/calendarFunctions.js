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
