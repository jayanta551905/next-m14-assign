const setAuthToken = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    req.headers["authorization"] = `Bearer ${token}`;
  }

  next();
};

module.exports = setAuthToken;
