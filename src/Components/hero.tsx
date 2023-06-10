import React, {useState} from "react";
import {useAuth} from "@/Components/providers/supabase-auth-provider";
import {addDays} from "date-fns";

export default function HeroComponent () {

    const [link, setLink] = useState<string> ("");
    const { addLinkAnonymous } = useAuth();
    const [error, setError] = useState<string | null> (null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault ();
        setError (null);
        try {
            const result = await addLinkAnonymous(link);
            if (result?.error) {
                setError(result?.error.toString);
            }
            console.log(result?.error);
            console.log(result?.Link)
            await navigator.clipboard.writeText("http://localhost:3000/"+result?.Link?.uuid)
        } catch (error) {
            console.log ("Something went wrong!");
        }
        setLink("");
    };

        return (
        <section className="bg-white dark:bg-gray-900">
            <div
                className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                <div className="w-full lg:w-1/2">
                    <div className="lg:max-w-lg">
                        <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">
                            Acorta, Comparte y Triunfa
                        </h1>

                        <div className="mt-8 space-y-5">
                            <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>

                                <span className="mx-2">Clean and Simple Layout</span>
                            </p>

                            <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>

                                <span className="mx-2">Just Copy Paste Codeing</span>
                            </p>

                            <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>

                                <span className="mx-2">Easy to Use</span>
                            </p>
                        </div>  
                    </div>

                    <div
                        className="w-full mt-8 bg-transparent border rounded-md lg:max-w-sm dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-400 focus-within:ring-opacity-40">
                        <form className="flex flex-col lg:flex-row" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Ingresa tu link!!" required value={link} onChange={(e) => setLink (e.target.value)}
                                   className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"/>

                            {error && <div className="mt-4 text-red-500">{error}</div>}

                            <button type="submit"
                                    className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400">
                                Acortar
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
                    <img className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
                         src="https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                         alt="glasses photo" />
                </div>
            </div>

        </section>
    );
}