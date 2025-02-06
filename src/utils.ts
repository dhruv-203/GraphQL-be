export const parseDate = (dateString: string) => {
  const [date, time] = dateString.split(" "); // Split by '/'
  const [day, month, year] = date.split("/"); // Split by '/'
  return `${month}/${day}/${year} ${time}`; // Rearrange to ISO format
};


