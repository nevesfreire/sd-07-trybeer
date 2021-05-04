const getImage = async (req, res) => {
  try {
    res.sendFile(req.url, { root: '../' });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getImage,
};