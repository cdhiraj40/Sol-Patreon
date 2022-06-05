import {useAnchorWallet} from "@solana/wallet-adapter-react";
import {Program} from '@project-serum/anchor'
import idl from '../utils/idl.json'
import getProvider from "./getProvider";

let workspace: any = null

export const UseWorkspace = () => workspace

export const InitWorkspace = () => {
    const wallet = useAnchorWallet()
    const provider = getProvider(wallet)
    /* Create the program interface combining the idl, program IDL, and provider */
    const jsonString = JSON.stringify(idl);
    const idlJSON = JSON.parse(jsonString);

    if (provider) {
        const program = new Program(idlJSON, idl.metadata.address, provider);
        workspace = {
            wallet,
            provider,
            program,
        }
    }
}