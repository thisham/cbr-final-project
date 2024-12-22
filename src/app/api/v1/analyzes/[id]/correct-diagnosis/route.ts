import { client } from "@modules/app/api/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { diagnosis } = await (req.json() as Promise<{ diagnosis: string }>);

  await client.query(
    "UPDATE samples SET correct_diagnosis = $1 WHERE id = $2",
    [diagnosis, id]
  );

  return NextResponse.json({}, { status: 204 });
}