import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      ppsn: user.ppsn,
      isAdmin: user.isAdmin,
      prsiUsed: user.prsiUsed,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};
