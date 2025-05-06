import { ValueOf } from "@/common/types/value-of.type";
import { ContentType, HttpMethod } from "../enums";

type HttpOptions = {
    method: ValueOf<typeof HttpMethod>;
    payload: BodyInit | null;
    hasAuth: boolean;
    contentType: ValueOf<typeof ContentType>;
    query?: Record<string, unknown>;
}

export { type HttpOptions };
