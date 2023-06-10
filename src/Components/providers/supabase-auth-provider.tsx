"use client";

import {Profile, Link} from "../../../types/collection";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import { useSupabase } from "./supabase-provider";
import { addDays } from "date-fns";

interface ContextI {
    user: Profile | null | undefined;
    error: any;
    isLoading: boolean;
    mutate: any;
    signOut: () => Promise<void>;
    // signInWithGithub: () => Promise<void>;
    recoverPassword: (email: string) => Promise<string | null>;
    addLink: (link: string, expired: Date) => Promise< { Link: Link, error: null } | { Link: null, error: String } | null>;
    addLinkAnonymous: (link: string) => Promise< { Link: Link, error: null } | { Link: null, error: String } | null>
    retrieveLinks: () => Promise< Link[] | string | null>;
    changePassword: (newPassword: string) => Promise<string | null>;
    signInWithEmail: (email: string, password: string) => Promise<string | null>;
    register: (email: string, password: string, username: string, fullname: string) => Promise<string | null>;
}
const Context = createContext<ContextI>({
    user: null,
    error: null,
    isLoading: true,
    mutate: null,
    signOut: async () => {},
    // signInWithGithub: async () => {},
    recoverPassword: async (email: string) => null,
    addLink: async (link: string, expired: Date) => null,
    addLinkAnonymous: async (link: string) => null,
    retrieveLinks: async () => null,
    changePassword: async (newPassword: string) => null,
    signInWithEmail: async (email: string, password: string) => null,
    register: async (email: string, password: string, username: string, fullname: string) => null,
});

export default function SupabaseAuthProvider({
                                                 serverSession,
                                                 children,
                                             }: {
    serverSession?: Session | null;
    children: React.ReactNode;
}) {
    const { supabase } = useSupabase();
    const router = useRouter();

    // Get USER
    const getUser = async () => {
        const { data: user, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", serverSession?.user?.id)
            .single();
        if (error) {
            console.log(error);
            return null;
        } else {
            return user;
        }
    };

    const {
        data: user,
        error,
        isLoading,
        mutate,
    } = useSWR(serverSession ? "profile-context" : null, getUser);

    // Sign Out
    const signOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    // Sign-In with Email
    const signInWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return error.message;
        } else {
            router.push("/dashboard")
        }

        return null;
    };

    // recover password
    const recoverPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
            return error.message;
        }

        return null;
    };

    const changePassword = async (newPassword: string) => {
        const { error } = await supabase.auth.updateUser({password: newPassword});
        if (error) {
            return error.message;
        }

        return null;
    };

    const register = async (email: string, password: string, fullname: string, username: string) => {
        const { data, error } = await supabase.auth.signUp({email: email, password: password});
        if (error) {
            return error.message;
        }

        const errorInsertResult = await supabase
            .from("profiles")
            .insert({ id: data.user ? data.user.id : "", avatar_url: "", full_name: fullname, username: username, role: 2});
        if (error) {
            return errorInsertResult.error ? errorInsertResult.error.message: "Error insertando data";
        }

        return null;
    };

    // remove from auth provider
    const addLink = async (link: string, expired: Date) => {
        const { data, error } = await supabase
            .from("links")
            .insert({user: user?.id, link_page:link, expired_date: expired.toDateString() })
            .select().single();
        if (error) {
            return { Link: null, error: error.message };
        }
        return { Link:data, error: null };
    };

    const addLinkAnonymous = async (link: string) => {
        const tomorrow = addDays(new Date(), 1);
        const { data, error } = await supabase
            .from("links")
            .insert({user: user?.id, link_page:link, expired_date: tomorrow.toDateString() })
            .select().single();
        if (error) {
            return { Link: null, error: error.message };
        }
        return { Link:data, error: null };
    };

    const retrieveLinks = async () => {
        const { data: links, error } = await supabase
            .from("links")
            .select("*")
            .eq("user", serverSession?.user?.id);
        if (error) {
            console.log(error);
            return error.message;
        } else {
            return links;
        }
    };

    // Refresh the Page to Sync Server and Client
    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token !== serverSession?.access_token) {
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase, serverSession?.access_token]);

    const exposed: ContextI = {
        user,
        error,
        isLoading,
        mutate,
        signOut,
        // signInWithGithub,
        addLink,
        addLinkAnonymous,
        recoverPassword,
        retrieveLinks,
        changePassword,
        signInWithEmail,
        register,
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
    let context = useContext(Context);
    if (context === undefined) {
        throw new Error("useAuth must be used inside SupabaseAuthProvider");
    } else {
        return context;
    }
};