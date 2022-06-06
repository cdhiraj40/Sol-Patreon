import { Profile } from "./Profile";
import GetProgram from "./getProgram";
import { Provider } from "@project-serum/anchor";

export const fetchProfiles = async (provider: Provider) => {
    const program = GetProgram(provider)
    const profiles = await program.account.profile.all();
    return profiles.map((profile: any) => new Profile(profile.publicKey, profile.account))
}