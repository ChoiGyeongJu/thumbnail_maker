export const generatePastelColor = () => {
  const r = Math.floor(Math.random() * 256 + 20);
  const g = Math.floor(Math.random() * 256 + 20);
  const b = Math.floor(Math.random() * 256 + 20);

  return `rgb(${r}, ${g}, ${b})`;
};

export const generateColor = () => {
  const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

  return color;
};
