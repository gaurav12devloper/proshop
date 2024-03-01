import jwt from 'jsonwebtoken';
const generateToken = (res,userId) => {
    const token= jwt.sign({ userId}, process.env.JWT_SECRET, { // jwt.sign(payload, secret, options), jwt is
        expiresIn: '30d'
    });
    
    //set JWT as http-Only cookies
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'devlopment', //set to true in production
        sameSite: 'strict', 
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
    })
}
export default generateToken;