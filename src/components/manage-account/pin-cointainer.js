'use client'

import PinInput from "react-pin-input"

export default function PinCointainer({pin, setPin, showPinCointainer, pinError, setShowPinContainer, handlePinSubmit, setPinError}) {
    return showPinCointainer && 
        <div className="z-[100] bg-[#141414] flex-col min-h-screen absolute left-0 top-0 justify-center flex items-center right-0">
            <div>
                <span onClick={() => {
                    setShowPinContainer({
                        ...showPinCointainer,
                        show: false
                    });
                    setPin('');
                    setPinError(false);
                }}
                    className="cursor-pointer absolute top-[50px] right-[40px]">

                </span>
            </div>
            <h1 className="text-gray-400 font-bold text-[16px] mb-4">
                Profile Lock is currently ON!
            </h1>
            {
                pinError ? 
                    (<h2 className="text-[#E6B209] font-bold text-[30px]">Whoops, wrong PIN. Please try again!</h2>):
                    (<h2 className="text-white font-bold text-[30px]">Enter your PIN to access this profile!</h2>)
            }
            <PinInput
                length={4}
                initialValue={pin}
                secret
                secretDelay={100}
                onChange={(value, index) => setPin(value)}
                type="numeric"
                inputMode="number"
                style={{padding: '20px', display: 'flex', gap: '10px'}}
                inputStyle={{borderColor: 'white', height: '70px', width: '70px', fontSize: '40px',}}
                inputFocusStyle={{borderColor: 'white'}}
                onComplete={(value, index) => handlePinSubmit(value, index)}
                autoSelect={true}/>
        </div>
}