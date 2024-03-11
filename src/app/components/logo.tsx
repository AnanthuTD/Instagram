import React from "react";
import { SvgProps } from "../../utils/Interfaces";

interface logo {
	width?: string;
	fill?: string;
	height?: string;
	className?: string;
}

function logo({
	fill = "white",
	width = "120.000000pt",
	height = "25.000000pt",
	className = "",
}: logo) {
	return (
		<>
			<svg
				version="1.0"
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox="0 0 184.000000 34.000000"
				preserveAspectRatio="xMidYMid meet"
				className={className}>
				<g
					transform="translate(0.000000,34.000000) scale(0.100000,-0.100000)"
					fill={fill}
					stroke="none">
					<path
						d="M78 269 c-25 -14 -24 -33 1 -20 10 6 21 7 25 4 3 -3 6 -44 6 -90 0
-108 18 -109 95 -7 13 17 14 15 15 -28 0 -74 23 -66 104 35 53 67 60 103 20
113 -18 5 -31 1 -42 -11 -16 -17 -16 -17 6 -12 33 8 29 -24 -10 -84 l-33 -50
-5 72 c-6 83 -20 101 -65 81 -29 -14 -26 -33 5 -25 30 8 25 -22 -12 -81 l-33
-51 -3 70 c-4 90 -24 113 -74 84z"
					/>
					<path
						d="M470 222 c-28 -9 -69 -55 -75 -84 -14 -63 47 -79 97 -26 16 18 41 44
54 58 24 25 35 55 12 32 -17 -17 -38 -15 -38 3 0 19 -14 19 -30 0 -7 -9 -10
-25 -6 -41 8 -30 -8 -54 -35 -54 -31 0 -24 47 12 81 33 30 35 40 9 31z"
					/>
					<path
						d="M650 222 c-20 -6 -80 -63 -80 -76 0 -5 14 3 31 20 l31 29 -8 -30
c-21 -79 3 -108 51 -61 23 23 25 24 25 5 0 -46 72 -34 100 17 9 18 29 43 46
58 16 14 24 26 17 26 -6 0 -15 -4 -18 -10 -10 -16 -22 -11 -28 12 -5 18 -8 19
-22 8 -12 -10 -15 -23 -11 -43 7 -33 -8 -67 -29 -67 -18 0 -20 45 -5 86 6 15
9 29 7 31 -11 10 -37 -12 -47 -40 -13 -40 -46 -84 -55 -75 -4 4 -2 30 5 58 13
55 13 60 -10 52z"
					/>
					<path
						d="M1003 220 c-47 -7 -85 -37 -103 -81 -10 -23 -10 -32 0 -44 17 -21 32
-19 65 7 25 19 27 20 18 3 -6 -11 -26 -24 -44 -30 -41 -14 -60 -41 -39 -55 24
-16 63 -2 95 34 17 18 40 38 53 45 12 6 22 17 23 24 0 7 14 23 31 37 l31 24
-6 -27 c-4 -15 -10 -38 -13 -52 -10 -42 24 -31 43 13 22 54 42 73 70 66 21 -6
53 9 53 25 0 15 -70 4 -90 -14 l-23 -20 7 28 c9 38 -6 34 -58 -13 -24 -22 -51
-40 -61 -40 -11 0 -15 -5 -12 -14 3 -8 -1 -20 -9 -26 -18 -16 -18 -6 2 59 8
29 14 54 12 55 -2 1 -22 -1 -45 -4z m-3 -37 c0 -26 -44 -78 -58 -69 -16 10
-15 16 8 54 21 34 50 43 50 15z m-32 -125 c-6 -17 -36 -34 -45 -24 -4 4 1 14
11 22 24 17 39 18 34 2z"
					/>
					<path
						d="M1412 220 c-52 -8 -99 -50 -108 -97 -5 -26 -3 -34 11 -40 21 -7 66
15 73 37 4 12 2 13 -9 3 -38 -36 -53 6 -18 51 26 33 54 36 44 4 -6 -22 -9 -57
-6 -85 0 -7 9 -13 19 -13 22 1 69 36 60 46 -4 4 -14 1 -23 -6 -25 -21 -30 -3
-12 52 9 29 15 52 14 53 -1 1 -21 -2 -45 -5z"
					/>
					<path
						d="M1555 211 c-37 -22 -70 -59 -62 -67 3 -4 18 7 32 22 l26 29 -6 -29
c-15 -72 -17 -86 -9 -86 17 0 31 15 39 40 12 37 35 70 50 70 11 0 11 -10 -1
-52 -7 -29 -12 -54 -10 -55 10 -11 37 13 46 42 11 34 46 73 56 62 3 -3 1 -22
-6 -42 -6 -20 -9 -42 -6 -50 8 -23 40 -18 66 10 23 24 16 37 -8 13 -19 -19
-26 -1 -14 41 7 21 12 43 12 49 0 22 -31 20 -62 -6 -22 -18 -30 -22 -26 -10 4
9 1 22 -7 28 -17 14 -47 0 -69 -32 -18 -26 -20 -20 -6 16 11 31 5 32 -35 7z"
					/>
				</g>
			</svg>
		</>
	);
}

export default logo;