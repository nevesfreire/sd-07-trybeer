const path = require('path');

const getImageByName = async (req, res) => {
  const { name } = req.params;

  res.status(200).sendFile(path.join(__dirname, `../../uploads/${name}.jpg`));
};

module.exports = { getImageByName };
