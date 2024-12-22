import { NextRequest, NextResponse } from "next/server";
import { cosine } from "./cosine";
import { client } from "../../db";
import { randomUUID } from "crypto";

type CalculateHistory = {
  id: number;
  diagnosis: string;
  ans: Array<number>;
};

type RequestPostBody = {
  name: string;
  questions: Array<number>;
};

function cosine_counter(vars: {
  test: Array<number>;
  base: Array<CalculateHistory>;
}): {
  maximum_similarity: number;
  maximum_index: number;
  diagnosis: string;
} {
  let maximum_similarity = 0;
  let maximum_index = 0;

  vars.base.forEach((base, index) => {
    const similarity = cosine({ vector1: vars.test, vector2: base.ans });
    if (similarity > maximum_similarity) {
      maximum_similarity = similarity;
      maximum_index = index;
    }
  });

  return {
    maximum_similarity,
    maximum_index,
    diagnosis: vars.base[maximum_index].diagnosis,
  };
}

export async function POST(req: NextRequest) {
  const { questions, name } = await (req.json() as Promise<RequestPostBody>);
  const histories: Array<CalculateHistory> = [];
  const { rows } = await client.query("SELECT * FROM samples", []);

  rows.forEach((row) => {
    histories.push({
      id: row.id,
      diagnosis: row.diagnosis as string,
      ans: [
        row.q1 as number,
        row.q2 as number,
        row.q3 as number,
        row.q4 as number,
        row.q5 as number,
        row.q6 as number,
        row.q7 as number,
        row.q8 as number,
        row.q9 as number,
        row.q10 as number,
        row.q11 as number,
        row.q12 as number,
        row.q13 as number,
        row.q14 as number,
        row.q15 as number,
        row.q16 as number,
        row.q17 as number,
        row.q18 as number,
        row.q19 as number,
        row.q20 as number,
        row.q21 as number,
        row.q22 as number,
        row.q23 as number,
        row.q24 as number,
      ],
    });
  });

  const { maximum_similarity, maximum_index, diagnosis } = cosine_counter({
    test: questions,
    base: histories,
  });

  // insert the new patient data into the database
  const new_id = randomUUID();

  await client.query(
    "INSERT INTO samples (id, diagnosis, px_name, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)",
    [new_id, diagnosis, name, ...questions]
  );

  return NextResponse.json(
    { maximum_index, maximum_similarity, diagnosis, name, id: new_id },
    { status: 200 }
  );
}
