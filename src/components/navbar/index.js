'use client'

import { GlobalContext } from "@/context";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Search from "./search";
import AccountPopup from "./account-popup";
import CircleLoader from "../circle-loader";

export default function Navbar() {
    const { data: session } = useSession();
    const { pageLoader, setPageLoader, loggedInAccount, setAccounts, accounts, setLoggedInAccount } = useContext(GlobalContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAccountPopup, setShowAccountPopup] = useState(false);
    const router = useRouter();
    const pathName = usePathname();

    const menuItems = [
        {
            id: 'home',
            title: 'Home',
            path: '/browse'
        },
        {
            id: 'tv',
            title: 'TV',
            path: '/tv'
        },
        {
            id: 'movies',
            title: 'Movies',
            path: '/movies'
        },
        {
            id: 'my-list',
            title: 'My list',
            path: '/mylist'
        }
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            }
        }
    }, []);

    async function getAllAccounts() {
        const response = await fetch(
            `/api/account/get-all-accounts?id=${session?.user.uid}`,
            { method: "GET" }
        );

        const data = await response.json();

        if (data && data.data && data.data.length) {
            setAccounts(data.data);
            setPageLoader(false);
        } else {
            setPageLoader(false);
        }
    }

    useEffect(() => {
        getAllAccounts();
    }, [])

    if (pageLoader) return <CircleLoader/>

    return <div className="relative">
        <header className={`header ${isScrolled && "bg-[#141414]"} hover:bg-[#141414]`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <img
                    src="https://rb.gy/ulxxee"
                    width={120} height={120} alt="NETFLIX"
                    className="cursor-pointer object-contain"
                    onClick={() => router.push('/browse')} />
                <ul className="hidden md:space-x-4 md:flex cursor-pointer">
                    {
                        menuItems.map(
                            item => <li className="cursor-pointer text-[16px] font-light 
                                text-[#E5E5E5] transition duration-[.4s] hover:text-[#B3B3B3]" key={item.id}>
                                {item.title}
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="font-light flex items-center space-x-4 text-sm">
                {
                showSearchBar ? (
                    <Search
                        pathName={pathName}
                        router={router}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        setPageLoader={setPageLoader}
                        setShowSearchBar={setShowSearchBar}
                    />
                ) : (
                    <AiOutlineSearch
                        onClick={() => setShowSearchBar(true)}
                        className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"
                    />
                )}
                <div onClick={() => setShowAccountPopup(!showAccountPopup)} 
                    className="flex gap-2 items-center cursor-pointer">
                    <img src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                        alt="Current profile"
                        className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"/>
                        <p>{loggedInAccount && loggedInAccount.name}</p>
                </div>
            </div>
        </header>
        {
            showAccountPopup && 
            <AccountPopup accounts={accounts}
                setPageLoader={setPageLoader}
                singOut={signOut}
                loggedInAccount={loggedInAccount}
                setLoggedInAccount={setLoggedInAccount}/>
        }
    </div>
}