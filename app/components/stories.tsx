'use client'
import Image from "next/image";
function stories() {
    return (
        <div className="text-white">
            {/* <button>
                <Image
                src="/images/stories.svg"
                alt=""
                width={"70"}
                height={"70"}
                >

                </Image>
            </button> */}
            <div style={{width:"70px"}}>
                <svg viewBox="0 0 140 140">
                    <defs>
                        <linearGradient
                            id="border-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop
                                offset="0%"
                                style={{ stopColor: "#F58529" }}
                            />
                            <stop
                                offset="50%"
                                style={{ stopColor: "#DD2A7B" }}
                            />
                            <stop
                                offset="100%"
                                style={{ stopColor: "#833AB4" }}
                            />
                        </linearGradient>
                    </defs>
                    <circle
                        cx="70"
                        cy="70"
                        r="65"
                        stroke="url(#border-gradient)"
                        strokeWidth="5"
                        fill="none"
                    />
                    <circle
                        cx="70"
                        cy="70"
                        r="55"
                        strokeDasharray="346.36"
                        strokeDashoffset="0"
                        stroke="#FFFFFF"
                        strokeWidth="10"
                        fill="none"
                        transform="rotate(-90 70 70)"
                    />
                </svg>
            </div>
        </div>
    );
}

export default stories;
