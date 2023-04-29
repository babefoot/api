import pg from "pg";
declare const pool: pg.Pool;
declare const initDbConnection: () => void;
export { initDbConnection, pool };
