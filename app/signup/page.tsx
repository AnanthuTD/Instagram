"use client";
import styles from "../login.module.css";
import { useState, useEffect } from "react";
import { fetchData } from "../../fetch_csrf";
import validateEmail from "../../public/javascripts/validate_email";
import validatePhone from "../../public/javascripts/validate_phone";
import validatePassword from "@/public/javascripts/validate_password";

interface IsValidState {
    phone_or_email?: boolean;
    password1?: boolean;
    username?: boolean;
}

interface ErrorState {
    phone_or_email?: string;
    password1?: string;
    username?: string;
    phone?: string;
}

export default function login() {
    const [formData, setFormData] = useState({});
    const [isValid, setIsValid] = useState<IsValidState>({});
    const [errors, setErrors] = useState<ErrorState>({});

    async function validate_email_or_mobile(data: string) {
        setIsValid({ phone_or_email: true });

        if (validateEmail(data)) {
            setFormData({
                ...formData,
                phone_or_email: data,
            });
        } else if (validatePhone(data)) {
            setFormData({
                ...formData,
                phone_or_email: data,
            });
        } else {
            setIsValid({ phone_or_email: false });
        }
    }

    async function validate_password(password: string) {
        var result = await validatePassword(password);
        if (result) {
            setIsValid((isValid) => ({ ...isValid, password1: result }));
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const csrfToken = await fetchData();

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        };

        const signupResponse = await fetch("api/accounts/signup/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(formData),
            credentials: "include",
        });

        const signupData = await signupResponse.json();

        console.log("signupData : ", await signupData);

        if (signupData.success) {
            // setUser(signupData.user)
        } else if (signupData.errors) {
            setErrors(signupData.errors);
        }

        /* {
            'success': True,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email or "",
                'phone': form.phone or "",
                # 'id_user': form.cleaned_data['id_user'],
                'bio': form.cleaned_data.get('bio', ''),
                'location': form.cleaned_data.get('location', ''),
            },
        } */
    };

    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            console.log("errors: ", errors);

            if (errors.hasOwnProperty("phone_or_email")) {
                setIsValid((isValid) => ({
                    ...isValid,
                    phone_or_email: false,
                }));
            }
            if (errors.hasOwnProperty("password1")) {
                setIsValid((isValid) => ({ ...isValid, password1: false }));
            }
            if (errors.hasOwnProperty("username")) {
                setIsValid((isValid) => ({ ...isValid, username: false }));
            }
        }
    }, [errors]);

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
                                {!isValid.hasOwnProperty(
                                    "phone_or_email"
                                ) ? null : isValid.phone_or_email ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="grey"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="red"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                )}
                            </div>
                            <input
                                autoFocus
                                name="phone_or_email"
                                className="text-black text-xs w-full rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                                id="phone_or_email"
                                placeholder="mobile number or email"
                                type="text"
                                onChange={(e) =>
                                    validate_email_or_mobile(e.target.value)
                                }
                            />
                        </div>
                        <input
                            autoFocus
                            name="first_name"
                            className="text-black text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            id="name"
                            placeholder="full name"
                            type="text"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    first_name: e.target.value,
                                })
                            }
                        />
                        <input
                            autoFocus
                            name="username"
                            className="text-black text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            id="username"
                            placeholder="username"
                            type="text"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                        />
                        <input
                            autoFocus
                            name="password1"
                            className="text-black text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            id="password"
                            placeholder="Password"
                            type="password"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password1: e.target.value,
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
