const formatDate = (dateTime: string) => {
  if (!dateTime) return '';
  return new Date(dateTime).toLocaleDateString('en-US');
};

export default formatDate;
