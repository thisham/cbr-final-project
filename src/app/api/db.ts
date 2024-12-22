import pg from "pg";
import { env } from "process";

const { Pool } = pg;

const pool = () => {
  const p = new Pool({
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: Number(env.DB_PORT as unknown),
    database: env.DB_DATABASE,
  });

  p.connect();
  return p;
};

export const client = pool();

export type ResponseTemplate<T, E> = {
  meta: {
    status: number;
    message: string;
  };
  data: T | null;
  error: E | null;
};

export const responseTemplate = <T, E>(
  status: number,
  message: string,
  data: T | null,
  error: E | null
): ResponseTemplate<T, E> => {
  return {
    meta: {
      status,
      message,
    },
    data,
    error,
  };
};
