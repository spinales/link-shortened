import React from 'react';
import { Link } from "@/../types/collection";
import {useAuth} from "@/Components/providers/supabase-auth-provider";


const ListLinks = () => {
    const { retrieveLinks } = useAuth();
    let data = retrieveLinks();

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
                { data.map((item) => {
                    return (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.id}
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
};

export default ListLinks;