import "server-only";
import {cookies, headers} from "next/headers";

import type {Database} from "../types/supabase";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const createClient = () =>
    createServerComponentSupabaseClient<Database>({
        headers, cookies,
    });
