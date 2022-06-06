import {ProfileModel} from "./ProfileModel";
import {useWorkspace} from "./useWorkspace";

export const FetchProfiles = async (filters= []) => {
    const {program} = useWorkspace()
    const profiles = await program.account.profile.all(filters);
    return profiles.map((profile: any) => new ProfileModel(profile.publicKey, profile.account))
}

export const creatorFilter = (authorBase58PublicKey: any) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
    }
})
