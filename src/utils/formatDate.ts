const formatDate = (dateTime: string) => {
  if (!dateTime) return '';
  const dateAll = new Date(dateTime).toLocaleString('en-US');
  const todayDateAll = new Date().toLocaleString('en-US');
  const dateDate = dateAll.slice(0, 8);
  const todayDate = todayDateAll.slice(0, 8);

  if (dateDate === todayDate) return dateAll.slice(10);

  return dateDate;
};

export default formatDate;
