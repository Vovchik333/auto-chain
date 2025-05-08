import { ValueOf } from "@/common/types/value-of.type";
import { ContentType, HttpMethod } from "../enums";

type HttpOptions = {
    method: ValueOf<typeof HttpMethod>;
    payload: BodyInit | null;
    hasAuth: boolean;
    contentType: ValueOf<typeof ContentType> | null;
    query?: Record<string, unknown>;
    expectsBlob?: boolean;
}

export { type HttpOptions };
