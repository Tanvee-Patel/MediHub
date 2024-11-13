import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  // Check if token exists in cookies or authorization headers
  if (req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
    try {
      token = req.cookies.token || req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Attach the decoded user to the request
      req.user = decoded;
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
};
