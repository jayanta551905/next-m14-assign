const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  jwt.verify(token.split(" ")[1], "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
