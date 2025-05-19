const mapObjectToQuery = (
    queryObject: Record<string, unknown>
): string => {
    return Object
            .keys(queryObject)
            .map(key => `${key}=${queryObject[key]}&`)
            .join('')
            .slice(0, -1);
};

export { mapObjectToQuery };
