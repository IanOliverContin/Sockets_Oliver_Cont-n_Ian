import { Request, Response, NextFunction } from "express";
import { TokenDecoder } from "@Shared/domain/TokenDecoder/TokenDecoder";
import { CannotDecode } from "@Shared/domain/TokenDecoder/Errors/CannotDecode";

export class AuthMiddleware {
    constructor(private readonly decoder: TokenDecoder) { }

    async run(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                ok: false,
                message: "Authorization token required"
            });
        }

        try {
            const token = authHeader.replace("Bearer ", "");
            const data = this.decoder.run(token);

            res.locals.userId = data.id;
            next();
        } catch (e) {
            if (e instanceof CannotDecode) {
                return res.status(401).json({
                    ok: false,
                    message: "Invalid or expired token"
                });
            }

            return res.status(500).send();
        }
    }
}
