"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestType = exports.queryBuilder = void 0;
var requestType;
(function (requestType) {
    requestType["UPDATE"] = "UPDATE ? SET";
})(requestType || (requestType = {}));
exports.requestType = requestType;
const queryBuilder = (type, table, object, id) => {
    let query = type.replace("?", table);
    const props = Object.entries(object);
    props.forEach(([key, value], index) => {
        query += `${key}=${value}`;
        if (index !== props.length - 1)
            query += ",";
    });
    query += ` WHERE id = ${id};`;
    return query;
};
exports.queryBuilder = queryBuilder;
//# sourceMappingURL=queryBuilder.js.map