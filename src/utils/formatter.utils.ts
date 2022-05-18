export const formatDate = (date: string) => {
  const _date = new Date(date);

  return _date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
