const generateToken = (user) => {
  return jwt.sign({ email: user.email }, "your-secret-key", {
    expiresIn: "1h",
  });
};

const verifyAndDecodeToken = (token) => {
  return jwt.verify(token, "your-secret-key");
};

module.exports = { generateToken, verifyAndDecodeToken };
