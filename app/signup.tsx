"use client";
import styles from "./login.module.css";
import { useState, useEffect } from "react";
import { fetchData } from "../fetch_csrf";
import validateEmail from "../public/javascripts/validate_email";
import validatePhone from "../public/javascripts/validate_phone";
import validatePassword from "@/public/javascripts/validate_password";
import { Dispatch, SetStateAction } from "react";
import { UserState } from "./Interfaces";

interface SignupProps {
	setUser: Dispatch<SetStateAction<UserState | undefined>>;
}

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

export default function Signup(props: SignupProps) {
	const [formData, setFormData] = useState({});
	const [isValid, setIsValid] = useState<IsValidState>({});
	const [errors, setErrors] = useState<ErrorState>({});
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	async function validate_email_or_mobile(data: string) {
		setIsValid((isValid) => ({ ...isValid, phone_or_email: true }));
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
			setIsValid((isValid) => ({ ...isValid, phone_or_email: false }));
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
			props.setUser(signupData.user);
		} else if (signupData.errors) {
			setErrors(signupData.errors);
		}
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
							name="fullname"
							className="text-black text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
							id="name"
							placeholder="full name"
							type="text"
							onChange={(e) =>
								setFormData({
									...formData,
									fullname: e.target.value,
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
                        {/* password */}
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
								name="password1"
								className="text-black text-xs w-full rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
								id="password"
								placeholder="Password"
								type={showPassword ? "text" : "password"}
								onChange={(e) =>
									setFormData({
										...formData,
										password: e.target.value,
									})
								}
							/>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2">
								<svg
									fill="none"
									onClick={togglePasswordVisibility}
									className={[
										"h-6 text-gray-700",
										showPassword ? "hidden" : "block",
									].join(" ")}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 576 512"
								>
									<path
										fill="currentColor"
										d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
									></path>
								</svg>

								<svg
									fill="none"
									onClick={togglePasswordVisibility}
									className={[
										"h-6 text-gray-700",
										showPassword ? "block" : "hidden",
									].join(" ")}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 512"
								>
									<path
										fill="currentColor"
										d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
									></path>
								</svg>
							</div>
						</div>
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
