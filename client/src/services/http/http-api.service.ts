import { ValueOf } from "@/common/types/value-of.type";
import { ContentType, HttpCode, HttpHeader, HttpMethod } from "./enums";
import { HttpError } from "./errors";
import { mapObjectToQuery } from "./helpers/map-object-to-query";
import { HttpOptions } from "./types";
import { StorageKey } from "@/common/enums/storage-key.enum";

class HttpApi {
    public async load<T>(
        url: string, 
        options: Partial<HttpOptions> = {}
    ): Promise<T> {
        const {
            method = HttpMethod.GET,
            payload = null,
            hasAuth = false,
            contentType = ContentType.JSON,
            query
        } = options;
        const headers = this.#getHeaders({
            hasAuth,
            contentType
        });
        const fullUrl = this.#getUrl(url, query);

        try {
            const res = await fetch(
                fullUrl, 
                {
                    method,
                    headers,
                    body: payload
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new HttpError({
                    status: res.status as ValueOf<typeof HttpCode>,
                    message: (data as Record<'message', string>).message
                });
            }

            return data as T;
        } catch(err) {
            throw err;
        }
    }

    #getHeaders({
        hasAuth,
        contentType
    }: Pick<HttpOptions, 'hasAuth' | 'contentType'>): Headers {
        const headers = new Headers();

        if (contentType) {
            headers.append(HttpHeader.CONTENT_TYPE, ContentType.JSON);
        }

        if (hasAuth) {
            const token = localStorage.getItem(StorageKey.TOKEN);

            headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
        }

        return headers;
    }

    #getUrl(url: string, query?: Record<string, unknown>): string {
        if (query) {
            return `${url}?${mapObjectToQuery(query)}`;
        }

        return url;
    }
}

export default HttpApi;