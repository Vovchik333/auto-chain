export const formatStringNumber = (num: string) => {
  const [firstPart, secondPart] = num.split('.');

  if (!secondPart) {
    return firstPart;
  }

  return `${firstPart}.${secondPart.slice(0, 8)}`;
}
