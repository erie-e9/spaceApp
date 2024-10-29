export const getDate = (dateParam = null, format = 'DD/MM/YYYY') => {
  let date;

  if (dateParam) {
    const [day, month, year] = dateParam?.split('/').map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = new Date();
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  let formattedDate;

  switch (format) {
    case 'YYYY/MM/DD':
      formattedDate = `${year}/${month}/${day}`;
      break;
    case 'YYYY-MM-DD':
      formattedDate = `${year}-${month}-${day}`;
      break;
    case 'DD/MM/YYYY':
      formattedDate = `${day}/${month}/${year}`;
      break;
    case 'DD-MM-YYYY':
      formattedDate = `${day}-${month}-${year}`;
      break;
    default:
      formattedDate = `${day}/${month}/${year}`;
  }

  return formattedDate;
};

export const compareDates = (date1: string, date2: string): number => {
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const parsedDate1 = parseDate(date1);
  const parsedDate2 = parseDate(date2);

  if (parsedDate1 < parsedDate2) {
    return -1;
  } else if (parsedDate1 > parsedDate2) {
    return 1;
  } else {
    return 0;
  }
};
