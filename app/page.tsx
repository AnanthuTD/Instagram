'use client'
import SideBar from "./side_bar";
import Stories from "./stories";
import Login from "./login"
import {useState} from 'react'


export default function Home() {
const [user, setuser] = useState(undefined)
    
    if (user) {
        return (
            <main className="flex min-h-screen flex-row bg-black">
    
                <div className="w-1/6 p-5 border-r border-side_bar_border">
                    <SideBar />
                </div>
                <div className="w-5/6 p-5">
                    <Stories />
                </div>
            </main>
        );
    }
    else{
        return(
            <main className="flex min-h-screen flex-row justify-center">
            <Login setUser={setuser} />
            </main>
        )
    }
    
}
