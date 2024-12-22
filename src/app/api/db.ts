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

export type History = {
  id: number;
  px_name: string;
  diagnosis: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  q10: number;
  q11: number;
  q12: number;
  q13: number;
  q14: number;
  q15: number;
  q16: number;
  q17: number;
  q18: number;
  q19: number;
  q20: number;
  q21: number;
  q22: number;
  q23: number;
  q24: number;
};
