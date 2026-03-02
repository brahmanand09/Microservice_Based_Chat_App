import type { Request, NextFunction, Response } from "express";
import type { IUser } from "../model/user.js";
import jwt, { type JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
};

export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Please login - No Auth Header",
            });
            return;
        }

        const token = authHeader.split(" ")[1];

        const decodedValue = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (!decodedValue || !decodedValue.user) {
            res.status(401).json({
                message: "Invalid Token",
            });
            return;
        }

        req.user = decodedValue.user;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Please Login - JWT Error",
        });
    }
};
