"use client";
import React, {useState} from "react";
import {Link, Send} from "lucide-react";
import {Button} from "@/Components/ui/button";
import {useAuth} from "@/Components/providers/supabase-auth-provider";
import {fullWidthClassName} from "react-remove-scroll-bar";
import {useRouter} from "next/navigation";

const RegisterPage = () => {
    const [email, setEmail] = useState<string> ("");
    const [password, setPassword] = useState<string> ("");
    const [confirmPassword, setConfirmPassword] = useState<string> ("");
    const [username, setUsername] = useState<string> ("");
    const [fullname, setFullname] = useState<string> ("");

    const { register} = useAuth ();
    const router = useRouter();
    const [error, setError] = useState<string | null> (null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault ();
        setError (null);
        try {
            if (password != confirmPassword) {
                setError("Las contraseñas no pueden ser distintas");
                return ;
            }

            const error = await register(email, password, fullname, username);
            if (error) {
                setError(error);
                return ;
            }
            router.push("/login");
        } catch (error) {
            console.log ("Something went wrong!");
        }
    };

    return (
        <div className="bg-white py-16">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white bg-white">
                    <Link className="w-12 h-8 pr-2 text-palette-primary" />
                    BitCutter
                </a>
                <div
                    className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Crear una cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail (e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword (e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required />
                            </div>
                            <div>
                                <label htmlFor="confirm-password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar
                                    contraseña</label>
                                <input type="password" name="confirm-password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword (e.target.value)}
                                       placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required />
                            </div>
                            <div>
                                <label htmlFor="usernama"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername (e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="jsmith" required />
                            </div>
                            <div>
                                <label htmlFor="fullname"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nombre Completo</label>
                                <input type="text" name="fullname" id="fullname" value={fullname} onChange={(e) => setFullname (e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="John Smith" required />
                            </div>

                            {error && <div className="mt-4 text-red-500">{error}</div>}

                            <Button
                                variant="subtle"
                                type="submit"
                                className="flex items-center w-full gap-2 mt-6 bg-palette-primary text-white hover:text-palette-accent hover:bg-white hover:border-b-gray-900"
                            >
                                Crear una cuenta
                                <Send size="16"/>
                            </Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Ya posees una cuenta?
                                <a href="/login"
                                    className="font-medium text-palette-primary hover:underline dark:text-primary-500"> Accede aqui</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;