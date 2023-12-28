'use client'

import { signOut } from "next-auth/react";

export default function AccountPopup({ accounts,
    setLoggedInAccount, loggedInAccount, setPageLoader, singOut }) {

    return <div className="px-8 py-8 fixed top-[50px] gap-3 flex 
        flex-col items-start right-[45px] bg-black opacity-[.85] z-[999]">
        <div className="flex flex-col gap-3">
            {
                accounts
                    .filter(item => item._id !== loggedInAccount._id)
                    .map(account => <div className="cursor-pointer flex gap-5" key={account._id}>
                        <img src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                            alt="Current profile"
                            className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]" />
                        <p className="mb-4">{account.name}</p>
                    </div>)
            }
        </div>
        <div>
            <button onClick={() => {
                setPageLoader(true); signOut();
                setLoggedInAccount(null);
                sessionStorage.removeItem('loggedInAccount')
            }}>
                Sign out!
            </button>
        </div>
    </div>
}