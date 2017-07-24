const path = require('path');

const getPathObject = (target, level = '../') => {
  const pathToParse = path.join(target, level);

  return {
    path: path.dirname(pathToParse),
    name: path.basename(path.dirname(pathToParse)),
  }
};

export const getRootPath = () => {
  const guiPath = process.cwd();

  console.log(getPathObject(process.cwd()));
  console.log(getPathObject(process.cwd(), '../../'));
  console.log(getPathObject(process.cwd(), '../../../'));
};
