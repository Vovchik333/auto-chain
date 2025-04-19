import { JwtPayload } from "jsonwebtoken";

type AppRequest = {
    headers: {
        authorization?: string;
    },
    user: string | JwtPayload;
};

export { type AppRequest };
