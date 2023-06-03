import { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Link = Database["public"]["Tables"]["links"]["Row"];