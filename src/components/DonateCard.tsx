import React from "react";
import "../pages/styles/Profile.css";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import GetProvider from "../api/getProvider";
import SendSol from "../api/sendSol";
import {useWorkspace} from "../api/useWorkspace";
import GetProgram from "../api/getProgram";

const DonateCard = () => {

    const wallet = useAnchorWallet()
    const provider = GetProvider(wallet)


    async function onCreateProfile() {
        if (provider) {
            const program = GetProgram(provider)
            await SendSol(program.provider.wallet, wallet!.publicKey, 1_000_000_09).then()
        } else {
            // wallet not connected
        }
    }

    return (
        <div className="subs_card">
            <div className="profile_section_card">
                <h1>Junior Developer</h1>
                <h2>5$ Per Month</h2>
                <button onClick={
                    onCreateProfile
                }>Join</button>
                <p>Thanks for your support</p>
            </div>
        </div>
    )
}

export default DonateCard;