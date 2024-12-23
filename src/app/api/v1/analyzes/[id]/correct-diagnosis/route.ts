import { client } from "@modules/app/api/db";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { diagnosis } = await (req.json() as Promise<{ diagnosis: string }>);

  await client.query("UPDATE samples SET diagnosis = $1 WHERE id = $2", [
    diagnosis,
    id,
  ]);

  return new Response(null, { status: 204 });
}
