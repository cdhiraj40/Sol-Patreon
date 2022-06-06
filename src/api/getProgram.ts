import {useAnchorWallet} from "@solana/wallet-adapter-react";
import {Program, Provider} from '@project-serum/anchor'
import idl from '../utils/idl.json'
import getProvider from "./getProvider";

export default function GetProgram(provider: Provider) {
    
    /* Create the program interface combining the idl, program IDL, and provider */
    const jsonString = JSON.stringify(idl);
    const idlJSON = JSON.parse(jsonString);

    return new Program(idlJSON, idl.metadata.address, provider)
}