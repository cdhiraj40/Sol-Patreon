import React from "react";
import "../pages/styles/Profile.css";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import GetProvider from "../api/getProvider";
import SendSol from "../api/sendSol";
import {useWorkspace} from "../api/useWorkspace";
import GetProgram from "../api/getProgram";

const DonateCard = (props: any) => {

    const wallet = useAnchorWallet()
    const provider = GetProvider(wallet)

    let lamports: any
    if(props.donate === "0.1"){
        lamports = 1_000_000_0
    }else if(props.donate === "0.5"){
        lamports = 5_000_000_0
    }else{
        lamports = 10_000_000_0
    }
    async function onCreateProfile() {
        if (provider) {
            const program = GetProgram(provider)
            await SendSol(program.provider.wallet, wallet!.publicKey, lamports).then()
        } else {
            // wallet not connected
        }
    }

    return (
        <div className="subs_card">
            <div className="profile_section_card">
                <h1>{props.name}</h1>
                <h2>{props.donate} Sol Per Month</h2>
                <button onClick={
                    onCreateProfile
                }>Join</button>
                <p>Thanks for your support</p>
            </div>
        </div>
    )
}

export default DonateCard;