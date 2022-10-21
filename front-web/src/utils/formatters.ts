export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-br', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};
