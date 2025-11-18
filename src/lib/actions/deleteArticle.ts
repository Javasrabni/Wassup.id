"use server"
import CreateArticle from "@/models/CreateArticle";
import { connectDB } from "../db/mongodb";

export default async function deleteArticle(id: string | number | undefined) {
  if (!id) {
    return { success: false, message: "Gagal menghapus" };
  }
  try {
    await connectDB();
    const find = await CreateArticle.findByIdAndDelete({ _id: id });
    if (!find) {
      return { success: false, message: "Gagal menghapus" };
    }
    return {success: true, message: "Berhasil menghapus"};
  } catch (error) {
    return {success: false, message: "Server Error"};
  }
}
