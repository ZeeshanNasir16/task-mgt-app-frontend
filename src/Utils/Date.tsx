import { format } from 'date-fns';

// ----------------------------------------------------------------------

export const shortDate = (date: string | Date) => {
  return format(new Date(date), 'dd MMMM yyyy');
};
