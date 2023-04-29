

enum requestType{
  UPDATE = `UPDATE ? SET`
}



const queryBuilder = (type: requestType, table: string, object: {}, id: number): string => {

  let query = type.replace("?", table);

  const props = Object.entries(object);
  props.forEach(([key, value], index) => {
    query += `${key}=${value}`;
    if(index !== props.length - 1) query += ","
  })

  query += ` WHERE id = ${id};`
  return query;
}



export {queryBuilder, requestType}