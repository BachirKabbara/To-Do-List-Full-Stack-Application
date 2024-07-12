import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Authorization token is missing' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Invalid or expired token' });
  }
};

export default isAuth;
