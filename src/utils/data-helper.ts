export const getTimestamp = () => {
  const now = new Date();
 
  return now.toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0];
};

export const getReadableDate = () => {
  return new Date().toLocaleDateString('es-ES'); 
};