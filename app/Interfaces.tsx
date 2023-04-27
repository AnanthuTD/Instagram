export interface UserState {
	id: string;
	username: string;
	email: string;
	phone: string;
	bio: string;
	location: string;
}
// Define a type for the menu state
export interface MenuState {
	home: boolean;
	profile: boolean;
	create: boolean;
	search: boolean;
	explore: boolean;
	messages: boolean;
	notifications: boolean;
	reels: boolean;
}
