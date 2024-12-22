import { NextResponse } from "next/server";
import { client, History, responseTemplate } from "../../db";

export async function GET() {
  const histories: Array<Omit<History, "px_name">> = [];

  const { rows } = await client.query("SELECT * FROM samples", []);

  rows.forEach((row) => {
    histories.push({
      id: row.id,
      diagnosis: row.diagnosis,
      q1: row.q1,
      q2: row.q2,
      q3: row.q3,
      q4: row.q4,
      q5: row.q5,
      q6: row.q6,
      q7: row.q7,
      q8: row.q8,
      q9: row.q9,
      q10: row.q10,
      q11: row.q11,
      q12: row.q12,
      q13: row.q13,
      q14: row.q14,
      q15: row.q15,
      q16: row.q16,
      q17: row.q17,
      q18: row.q18,
      q19: row.q19,
      q20: row.q20,
      q21: row.q21,
      q22: row.q22,
      q23: row.q23,
      q24: row.q24,
    });
  });

  return NextResponse.json(
    responseTemplate<Array<Omit<History, "px_name">>, null>(
      200,
      "OK",
      histories,
      null
    ),
    { status: 200 }
  );
}
