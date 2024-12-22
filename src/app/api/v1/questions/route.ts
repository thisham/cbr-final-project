import { NextResponse } from "next/server";
import { responseTemplate } from "../../db";

export async function GET() {
  const qs = [
    "Apakah anak sering tidak menatap mata lawan bicara saat diajak bicara?",
    "Apakah anak suka diam dan/atau menyendiri?",
    "Apakah anak sering menolak atau tidak suka saat dipeluk?",
    "Apakah anak sering tidak merespon saat dipanggil?",
    "Apakah anak sering melakukan kegiatan yang berulang-ulang?",
    "Apakah anak sering terpaku terhadap benda-benda tertentu?",
    "Apakah anak menyukai hal yang aneh, seperti memcium-cium benda?",
    "Apakah anak sering mengungkapkan emosi (sedih, marah, dll.) dengan sendirinya dan/atau tanpa alasan yang jelas?",
    "Apakah anak tidak bisa diam dan sering bergerak-gerak?",
    "Apakah anak tidak dapat berbicara atau mengucapkan kata-kata?",
    "Apakah anak bisa berbicara namun tidak terlalu jelas?",
    "Apakah anak sering berbicara berlebihan?",
    "Apakah anak sering mengucapkan bahasa/kata-kata yang aneh secara berulang-ulang?",
    "Apakah anak tidak dapat menunjuk sesuatu dengan jari sendiri?",
    "Apakah anak tidak dapat menunjukkan keinginan dengan kata-kata?",
    "Apakah anak suka menarik-narik orang lain jika menginginkan sesuatu?",
    "Apakah anak tidak menunjukkan usaha untuk berkomunikasi?",
    "Apakah anak sering menghindar apabila didekati oleh orang lain?",
    "Apakah anak tidak dapat berinteraksi dengan lingkungan sekitar?",
    "Apakah anak tidak tertarik dengan orang lain?",
    "Apakah anak tidak peduli dengan sekitarnya?",
    "Apakah anak tidak suka dengan keramaian?",
    "Apakah anak tidak suka bermain dengan teman sebayanya?",
    "Apakah anak tidak dapat bersosialisasi dengan orang lain?",
  ];

  return NextResponse.json(
    responseTemplate<Array<string>, null>(200, "OK", qs, null),
    { status: 200 }
  );
}
