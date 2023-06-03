"use client";
import {useAuth} from "@/Components/providers/supabase-auth-provider";
import {Button} from "@/Components/ui/button";
import {Input} from "@/Components/ui/input";
import {Label} from "@/Components/ui/label";
import { Link, Mail} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

const LoginForm = () => {
    const [email, setEmail] = useState<string> ("");
    const [password, setPassword] = useState<string> ("");
    const [error, setError] = useState<string | null> (null);
    // const { signInWithEmail, signInWithGithub, user } = useAuth();
    const {signInWithEmail, user} = useAuth ();
    const router = useRouter ();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault ();
        setError (null);
        try {
            const error = await signInWithEmail (email, password);
            if (error) {
                setError (error);
            }
        } catch (error) {
            console.log ("Something went wrong!");
        }
    };

    // Check if there is a user
    useEffect (() => {
        if (user) {
            router.push ("/dashboard");
        }
    }, [router, user]);

    return (
    <main className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Link className="w-12 h-8 pr-2 text-palette-primary" />
                BitCutter
            </a>
            <div
                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" >
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Acceder a tu cuenta
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</Label>
                            <Input value={email} onChange={(e) => setEmail (e.target.value)} type="email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="name@company.com" required />
                        </div>
                        <div>
                            <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</Label>
                            <Input type="password" required
                                   value={password}
                                   onChange={(e) => setPassword (e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <a href="/recover"
                               className="text-sm font-medium text-palette-primary hover:underline dark:text-primary-500">¿Olvido su contraseña?</a>
                        </div>

                        {/* Error */}
                        {error && <div className="mt-4 text-red-500">{error}</div>}

                        <Button
                            variant="subtle"
                            type="submit"
                            className="flex items-center w-full gap-2 mt-6 bg-palette-primary text-white hover:text-palette-accent hover:bg-white hover:border-b-gray-900"
                        >
                            Login
                            <Mail size="16"/>
                        </Button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            ¿No tienes una cuenta aun?
                            <a href="/register"
                              className="font-medium text-palette-primary hover:underline dark:text-primary-500"> Registrarse</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </main>
    );
};

export default LoginForm;