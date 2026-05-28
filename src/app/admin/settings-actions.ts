"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { setSetting, WRITING_VOICE_KEY } from "@/lib/settings";

export async function saveWritingVoice(formData: FormData) {
  await requireAdmin();
  const voice = String(formData.get("voice") ?? "").trim();
  await setSetting(WRITING_VOICE_KEY, voice);
  revalidatePath("/admin/settings");
}
