import { createClient } from "@supabase/supabase-js";
import React from "react";

export default async function Page({ params }: { params: { user: string } }) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const supabase = createClient(url, key, {
        db: {
            schema: "public",
        },
        auth: {
            persistSession: false,
            detectSessionInUrl: true,
        },
    });

    let { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("user", params.user);

    console.log(data);
    console.log(error)

    // if (error) {
    //     // Manejar el error apropiadamente
    //     throw new Error(error.message);
    // }


    return (
        <div className="container mx-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Link
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de creacion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de expiracion
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                { data?.map((item) => {
                    return (
                        <tr key={item.uuid}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.uuid}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.link_page}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.created_at}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.expired_date}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );

}