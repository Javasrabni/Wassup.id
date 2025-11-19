import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLD_NAME!,
  api_key: process.env.CLD_KEY!,
  api_secret: process.env.CLD_SECRET!,
});

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, msg: "File tidak valid" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "wassup.id" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ) as NodeJS.WritableStream;

      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      data: uploadResult,
    });
  } catch (err: any) {
    console.error("UPLOAD ERROR →", err);
    return NextResponse.json(
      { success: false, error: err.message || String(err) },
      { status: 500 }
    );
  }
}
