import {Provider} from "@project-serum/anchor";
import {AnchorWallet, useAnchorWallet} from "@solana/wallet-adapter-react";
import {Connection} from "@solana/web3.js";
import {DEVNET_API, processed} from "../utils/Const";
import {useWorkspace} from "./useWorkspace";

/**
 *
 * @returns provider to the caller.
 */
export default function GetProvider(wallet: AnchorWallet| undefined) {
    // const {wallet} = useWorkspace()
    if (!wallet) {
        return null;
    }

    /* Create the provider and return it to the caller */
    const connection = new Connection(DEVNET_API, processed)

    return new Provider(
        connection, wallet, {"preflightCommitment": processed},
    )
}
