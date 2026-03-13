import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);

export const formatRelativeTime = (date) => {
  if (!date) return 'just now';
  
  const parsedDate = dayjs(date);
  if (!parsedDate.isValid()) return 'invalid date';
  
  return parsedDate.fromNow();
};

export default formatRelativeTime;

