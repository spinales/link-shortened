"use client";

import React from 'react';
import '@/app/globals.css';
import { LifeBuoy, Lock, LogOut, User} from "lucide-react";
import {useAuth} from "@/Components/providers/supabase-auth-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { useRouter } from "next/navigation";


const Userbar = () => {
    const { user, signOut } = useAuth();
    const router = useRouter();

    const moveToChangePassword = async () => {
        router.push("/changepassword");
    };

    const moveToHelp = async () => {
        router.push("/help");
    };

    const moveToProfile = async () => {
        router.push("/profile");
    };

    return (
        <div className="flex items-center justify-end py-2 mx-auto max-w-7xl bg-palette-bg shadow-xl pr-4">
            {/* Avatar */}
            <p className="text-md pr-2">Bienvenido, <span className="text-palette-primary">{user?.full_name}</span> 😄 </p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src={user?.avatar_url ?? ""} />
                        <AvatarFallback className="bg-palette-primary text-white">{user?.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={moveToProfile}>
                            <User className="w-4 h-4 mr-2" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuItem onClick={moveToHelp}>
                        <LifeBuoy className="w-4 h-4 mr-2" />
                        <span>Solicitar ayuda</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={moveToChangePassword}>
                        <Lock className="w-4 h-4 mr-2" />
                        <span>Cambiar contraseña</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Salir</span>
                        {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
                    </DropdownMenuItem>
                    {/*<DropdownMenuItem>*/}
                    {/*    <LogOut className="w-4 h-4 mr-2" />*/}
                    {/*    <span>{user?.role == 2 ? "Student" : "Admin"}</span>*/}
                    {/*    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
                    {/*</DropdownMenuItem>*/}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Userbar;
