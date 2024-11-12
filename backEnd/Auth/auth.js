import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const auth=(req,res,next)=>{
try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify the token and extract the payload
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = { _id: decoded.userId };
    
} catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
}
}
export default auth;