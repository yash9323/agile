const d = require('./mongoConnection')

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await d.dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = getCollectionFn('projects');
