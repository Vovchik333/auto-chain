import { ApiPath } from "@/common/enums/api/api-path.enum";

export const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;
export const API_PORT = process.env.NEXT_PUBLIC_API_PORT;

export const API_PATH = `${API_ORIGIN}:${API_PORT}${ApiPath.API}`;
