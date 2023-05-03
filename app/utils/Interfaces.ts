export interface UserState {
	id: string;
	username: string;
    first_name: string;
    last_name: string;
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

export interface SvgProps {
	stroke?: string;
	fill?: string;
    className?:string;
	width?:number;
	height?:number;
}

export interface MenuContextInterface {
	menu: MenuState;
	HandleSetMenu: (key: keyof MenuState, value?: boolean) => void;
}
