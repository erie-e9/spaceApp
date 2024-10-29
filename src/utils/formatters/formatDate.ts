type DateFormat =
  | 'DD/MM/YY'
  | 'DD/MM/YYYY'
  | 'YY/MM/DD'
  | 'YYYY/MM/DD'
  | 'DD-MM-YY'
  | 'DD-MM-YYYY'
  | 'YY-MM-DD'
  | 'YYYY-MM-DD';

export const formatDate = (dateStr: string, format: DateFormat): string => {
  let day: number, month: number, year: number;

  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts[0].length === 4) {
      [year, month, day] = parts.map(Number);
    } else {
      [day, month, year] = parts.map(Number);
    }
  } else if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts[0].length === 4) {
      [year, month, day] = parts.map(Number);
    } else {
      [day, month, year] = parts.map(Number);
    }
  } else {
    throw new Error('Invalid date format');
  }

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error('Invalid date format');
  }

  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');
  const fullYear = String(year);
  const shortYear = fullYear.slice(-2);

  switch (format) {
    case 'DD/MM/YY':
      return `${formattedDay}/${formattedMonth}/${shortYear}`;
    case 'DD/MM/YYYY':
      return `${formattedDay}/${formattedMonth}/${fullYear}`;
    case 'YY/MM/DD':
      return `${shortYear}/${formattedMonth}/${formattedDay}`;
    case 'YYYY/MM/DD':
      return `${fullYear}/${formattedMonth}/${formattedDay}`;
    case 'DD-MM-YY':
      return `${formattedDay}-${formattedMonth}-${shortYear}`;
    case 'DD-MM-YYYY':
      return `${formattedDay}-${formattedMonth}-${fullYear}`;
    case 'YY-MM-DD':
      return `${shortYear}-${formattedMonth}-${formattedDay}`;
    case 'YYYY-MM-DD':
      return `${fullYear}-${formattedMonth}-${formattedDay}`;
    default:
      throw new Error('Invalid format');
  }
};
