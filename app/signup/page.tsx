"use client";
import styles from "../login.module.css";
import { useState, useEffect } from "react";
import { fetchData } from "../../fetch_csrf";
import validateEmail from "../../public/javascripts/validate_email";
import validatePhone from "../../public/javascripts/validate_phone";

interface UserState {
    setUser: (user: string) => void;
}

export default function login({ setUser }: UserState) {
    const [formData, setFormData] = useState({});
    const [isvalidEmailPhone, setisvalidEmailPhone] = useState<undefined | boolean>(undefined);

    async function validate_email_or_mobile(data: string) {
        setisvalidEmailPhone(true);

        if (await validateEmail(data)) {
            setFormData({
                ...formData,
                email: data,
            });
        } else if (validatePhone(data)) {
            setFormData({
                ...formData,
                phone: data,
            });
        } else {
            setisvalidEmailPhone(false);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const csrfToken = await fetchData();

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        };

        const signupResponse = await fetch("api/account/signup/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(formData),
            credentials: "include",
        });

        console.log("signupResponse : ", signupResponse);
    };

    return (
        <div>
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
                        <div className="relative flex items-center mb-2">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                {isvalidEmailPhone ==
                                undefined ? null : isvalidEmailPhone ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="grey"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="red"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                )}
                            </div>
                            <input
                                autoFocus
                                className="text-black text-xs w-full rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                                id="email"
                                placeholder="mobile number or email"
                                type="text"
                                onChange={(e) =>
                                    validate_email_or_mobile(e.target.value)
                                }
                            />
                        </div>
                        <input
                            autoFocus
                            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            id="email"
                            placeholder="full name"
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
                            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            id="email"
                            placeholder="username"
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
                    <a className="text-blue-500 text-sm font-semibold">
                        Sign up
                    </a>
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
