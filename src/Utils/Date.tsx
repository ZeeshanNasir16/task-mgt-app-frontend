import { format } from 'date-fns';

// ----------------------------------------------------------------------

export const shortDate = (date: string | Date) => {
  return format(new Date(date), 'dd MMMM yyyy');
};

export const dateFormat = (date: string | Date, dateFormat: string) => {
  return format(new Date(date), dateFormat);
};

export const getCurrentDate = () => new Date().toLocaleDateString();
