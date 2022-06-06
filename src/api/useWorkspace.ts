import {Connection} from '@solana/web3.js'
import {Provider, Program} from '@project-serum/anchor'
import idl from '../utils/idl.json'
import {DEVNET_API, processed} from "../utils/Const";
import {useAnchorWallet} from "@solana/wallet-adapter-react";

/* Create the program interface combining the idl, program IDL, and provider */
const jsonString = JSON.stringify(idl);
const idlJSON = JSON.parse(jsonString);
let workspace: any = null

export const useWorkspace = () => workspace

export const InitWorkspace = () => {
    const wallet = useAnchorWallet()
    const connection = new Connection(DEVNET_API, processed)
    // @ts-ignore
    const provider = new Provider(connection, wallet, {"preflightCommitment": processed})
    const program = new Program(idlJSON, idl.metadata.address, provider)


    workspace = {
        wallet,
        connection,
        provider,
        program,
    }
}