import jwt from "jsonwebtoken";
import { TokenData, TokenGenerator } from "../../domain/TokenGenerator/TokenGenerator";

export class JwtTokenGenerator implements TokenGenerator {
    async generate(data: TokenData): Promise<string> {
        const secret = process.env.JWT_SECRET || "private";
        return jwt.sign({ sub: data.id }, secret, {
            algorithm: "HS256"
        });
    }
}