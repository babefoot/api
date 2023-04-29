declare enum requestType {
    UPDATE = "UPDATE ? SET"
}
declare const queryBuilder: (type: requestType, table: string, object: {}, id: number) => string;
export { queryBuilder, requestType };
