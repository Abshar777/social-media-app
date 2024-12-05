import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { config } from "dotenv";

config();

class Jwt {
  private accessSecret: string;
  private refreshSecret: string;
  constructor() {
    this.accessSecret = process.env.JWT_ACCESS_SECRET ?? "";
    this.refreshSecret = process.env.JWT_REFRESH_SECRET ?? "";
  }
  generateAccessToken(userId: string) {
    console.log("access secret", this.accessSecret);

    const token = jwt.sign({ userId }, this.accessSecret, {
      expiresIn: "2m",
    });
    return token;
  }

  generateRefreshToken(userId: string) {
    console.log("refresh secret", this.refreshSecret);
    const token = jwt.sign({ userId }, this.refreshSecret, {
      expiresIn: "30d",
    });
    return token;
  }

  verifyAccessToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.accessSecret); 
      return decoded; 
    } catch (error) {
      throw new Error("Invalid or expired token"); 
    }
  }
  verifyRefreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.refreshSecret); 
      return decoded; 
    } catch (error) {
      throw new Error("Invalid or expired token"); 
    }
  }

}

export default Jwt;
