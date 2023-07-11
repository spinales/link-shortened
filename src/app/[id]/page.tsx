"use client"
import {createClient} from "@supabase/supabase-js";
import React from "react";
import {useSupabase} from "@/Components/providers/supabase-provider";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Send} from "lucide-react";

export default function Page({ params }: { params: { id: string } }) {

    const { supabase } = useSupabase();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault ();
        try {

            let { data, error } = await supabase
                .from("links")
                .select("*")
                .eq("uuid", params.id)
                .limit(1);

            window.location.href = data[0]?.link_page || '';
        } catch (error) {
            console.log ("Something went wrong!");
        }

    };


    return (
        <>
            <form onSubmit={handleSubmit} className="mt-2">
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿Esta seguro que desea acceder a esta pagina?</Label>
                <Button
                    variant="subtle"
                    type="submit"
                    className="flex items-center w-full gap-2 mt-6 bg-palette-primary text-white hover:text-palette-accent hover:bg-white hover:border-b-gray-900"
                >
                    Acceder
                </Button>
            </form>
        </>
    );

}