import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config";
class JwtService {
    static generateToken(payload, secret=JWT_SECRET) {
        return jsonwebtoken.sign(payload, secret, { expiresIn: "1h" });
    }
    
    static verifyToken(token,secret=JWT_SECRET) {
        return jsonwebtoken.verify(token,secret);
    }
}

export default JwtService;