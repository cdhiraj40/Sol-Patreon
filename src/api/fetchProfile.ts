import {useWorkspace} from "./useWorkspace";
import {PublicKey} from "@solana/web3.js";

export const FetchProfile = async (publicKey: PublicKey) => {
    const {program} = useWorkspace()
    return await program.account.profile.fetch(publicKey);
}