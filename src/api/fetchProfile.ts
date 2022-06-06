import {Profile} from "./Profile";
import {useWorkspace} from "./useWorkspace";

export const FetchProfiles = async () => {
    const {program} = useWorkspace()
    const profiles = await program.account.profile.all();
    return profiles.map((profile: any) => new Profile(profile.publicKey, profile.account))
}