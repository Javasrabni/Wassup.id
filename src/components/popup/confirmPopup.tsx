"use client"
import React from 'react'
import { useState } from 'react';
interface Props {
    title: string;
    onOk: () => void;
    // onCancle: ()=> void;
}

const ConfirmPopup = ({ title, onOk}: Props) => {
    
    const [onCanclePopup, setOnCanclePopup] = useState(true)

    function ClosePopup() {
        setOnCanclePopup(false)
    }

    return (
        <>
            {onCanclePopup && (
                <div>
                    <p>{title}</p>
                    <div className={'flex flex-row gap-4'}>
                        <button onClick={onOk} className={'w-full bg-stone-900 text-stone-100'}>OK</button>
                        <button onClick={ClosePopup} className={'w-full bg-[tomato] text-stone-100'}>CANCLE</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConfirmPopup
