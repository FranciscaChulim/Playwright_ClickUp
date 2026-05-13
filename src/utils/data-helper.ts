export const getTimestamp = () => {
  const now = new Date();
 
  return now.toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0];
};

export const getReadableDate = () => {
  return new Date().toLocaleDateString('es-ES'); 
};

export const TitleGenerator = {
  getToDoTaskTitle: () => `Automated To Do Task ${getTimestamp()}`,
  getInProgressTaskTitle: () => `Automated In Progress Task ${getTimestamp()}`,
  getSpaceTitle: () => `Automated In Progress Task ${getTimestamp()}`
};
