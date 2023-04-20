import styles from "./login.module.css";
import { useState} from "react";
import { fetchData } from "../fetch_csrf";
import Link from "next/link";

interface UserState {
    setUser: (user: string) => void;
}

export default function login({ setUser }: UserState) {

    const [formData, setFormData] = useState({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const csrfToken = await fetchData();

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        };

        const signupResponse = await fetch("api/account/login/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(formData),
            credentials: "include",
        });

        console.log("signupResponse : ", signupResponse);
        
    };

    return (
        <div className="bg-white">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
                    <h1
                        className={["bg-no-repeat", styles.instagram_logo].join(
                            " "
                        )}
                    ></h1>
                    <form
                        className="mt-8 w-64 flex flex-col"
                        onSubmit={handleSubmit}
                    >
                        <input
                            autoFocus
                            name="phone_or_email"
                            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            id="email"
                            placeholder="Phone number, username, or email"
                            type="text"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                        <input
                            autoFocus
                            name="password1"
                            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            id="password"
                            placeholder="Password"
                            type="password"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                        <button
                            type="submit"
                            className=" text-sm text-center bg-blue-300 text-white py-1 rounded font-medium"
                        >
                            Log In
                        </button>
                    </form>
                    <div className="flex justify-evenly space-x-2 w-64 mt-4">
                        <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                        <span className="flex-none uppercase text-xs text-gray-400 font-semibold">
                            or
                        </span>
                        <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                    </div>
                    <button className="mt-4 flex">
                        <div
                            className={[
                                "bg-no-repeat",
                                styles.facebook_logo,
                                "mr-1",
                            ].join(" ")}
                        ></div>
                        <span className="text-xs text-blue-900 font-semibold">
                            Log in with Facebook
                        </span>
                    </button>
                    <a className="text-xs text-blue-900 mt-4 cursor-pointer -mb-4">
                        Forgot password?
                    </a>
                </div>
                <div className="bg-white border border-gray-300 text-center w-80 py-4">
                    <span className="text-sm">Don't have an account?</span>
                    <Link href={'/signup'} className="text-blue-500 text-sm font-semibold">
                        Sign up
                    </Link>
                </div>
                <div className="mt-3 text-center">
                    <span className="text-xs">Get the app</span>
                    <div className="flex mt-3 space-x-2">
                        <div
                            className={[
                                "bg-no-repeat",
                                styles.apple_store_logo,
                            ].join(" ")}
                        ></div>
                        <div
                            className={[
                                "bg-no-repeat",
                                styles.google_store_logo,
                            ].join(" ")}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
