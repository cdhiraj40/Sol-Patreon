use anchor_lang::prelude::*;

declare_id!("571vwvM69EAqbHbbD1CqeKd5DHr9NsLd2LjbrZAoiYyF");

#[program]
pub mod sol_patreon {
    use super::*;

    pub fn create_profile(
        ctx: Context<CreateProfile>,
        username: String,
        name: String,
        description: String,
        pic_url: String,
        banner_url: String,
        personal_url: String,
    ) -> Result<()> {
        let profile: &mut Account<Profile> = &mut ctx.accounts.profile;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if username.chars().count() < 1 {
            return Err(error!(ErrorCode::UsernameEmpty));
        }
        if username.chars().count() > 15 {
            return Err(error!(ErrorCode::UsernameTooLong));
        }

        if name.chars().count() < 1 {
            return Err(error!(ErrorCode::NameEmpty));
        }
        if name.chars().count() > 50 {
            return Err(error!(ErrorCode::NameTooLong));
        }

        if description.chars().count() < 1 {
            return Err(error!(ErrorCode::DescriptionEmpty));
        }
        if description.chars().count() > 400 {
            return Err(error!(ErrorCode::DescriptionTooLong));
        }

        if pic_url.chars().count() > 80 {
            return Err(error!(ErrorCode::URLTooLong));
        }
        if pic_url.chars().count() < 1 {
            return Err(error!(ErrorCode::URLEmpty));
        }

        if banner_url.chars().count() > 80 {
            return Err(error!(ErrorCode::URLTooLong));
        }
        if banner_url.chars().count() < 1 {
            return Err(error!(ErrorCode::URLEmpty));
        }

        if personal_url.chars().count() > 80 {
            return Err(error!(ErrorCode::URLTooLong));
        }
        if personal_url.chars().count() < 1 {
            return Err(error!(ErrorCode::URLEmpty));
        }

        profile.author = *author.key;
        profile.timestamp = clock.unix_timestamp;
        profile.username = username;
        profile.name = name;
        profile.description = description;
        profile.pic_url = pic_url;
        profile.banner_url = banner_url;
        profile.personal_url = personal_url;

        Ok(())
    }
    
    pub fn update_profile(
        ctx: Context<CreateProfile>,
        username: String,
        name: String,
        description: String,
        pic_url: String,
        banner_url: String,
        personal_url: String,
    ) -> Result<()> {
        let profile: &mut Account<Profile> = &mut ctx.accounts.profile;

        if username.chars().count() < 1 {
            return Err(error!(ErrorCode::UsernameEmpty));
        }
        if username.chars().count() > 15 {
            return Err(error!(ErrorCode::UsernameTooLong));
        }

        if name.chars().count() < 1 {
            return Err(error!(ErrorCode::NameEmpty));
        }
        if name.chars().count() > 50 {
            return Err(error!(ErrorCode::NameTooLong));
        }

        if description.chars().count() < 1 {
            return Err(error!(ErrorCode::DescriptionEmpty));
        }
        if description.chars().count() > 400 {
            return Err(error!(ErrorCode::DescriptionTooLong));
        }

        if pic_url.chars().count() > 80 {
            return Err(error!(ErrorCode::URLTooLong));
        }
        if pic_url.chars().count() < 1 {
            return Err(error!(ErrorCode::URLEmpty));
        }

        if banner_url.chars().count() > 80 {
            return Err(error!(ErrorCode::URLTooLong));
        }
        if banner_url.chars().count() < 1 {
            return Err(error!(ErrorCode::URLEmpty));
        }

        if personal_url.chars().count() > 80 {
            return Err(error!(ErrorCode::URLTooLong));
        }
        if personal_url.chars().count() < 1 {
            return Err(error!(ErrorCode::URLEmpty));
        }

        profile.username = username;
        profile.name = name;
        profile.description = description;
        profile.pic_url = pic_url;
        profile.banner_url = banner_url;
        profile.personal_url = personal_url;
        Ok(())
    }

   
}


#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(mut, has_one = author)]
    pub post: Account<'info, Profile>,
    pub author: Signer<'info>,
}

#[derive(Accounts)]
pub struct CreateProfile<'info> {
    #[account(init, payer = author, space = Profile::LEN)]
    pub profile: Account<'info, Profile>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Profile {
    pub author: Pubkey,
    pub timestamp: i64,
    pub username: String,
    pub name: String,
    pub description: String,
    pub pic_url: String,
    pub banner_url: String,
    pub personal_url: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const TIMESTAMP_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
// Stores the size of the string
const STRING_LENGTH_PREFIX: usize = 4;
// 15 chars max
const MAX_USERNAME_LENGTH: usize = 15 * 4;
// 50 chars max
const MAX_NAME_LENGTH: usize = 50 * 4;
// 400 chars max.
const MAX_DESCRIPTION_LENGTH: usize = 400 * 4;
// ~200 chars max --estimated max value
const PIC_URL_LENGTH: usize = 80 * 4;
// ~200 chars max --estimated max value
const BANNER_URL_LENGTH: usize = 80 * 4;
// ~200 chars max --estimated max value
const PERSONAL_URL_LENGTH: usize = 80 * 4;

impl Profile {
    const LEN: usize = DISCRIMINATOR_LENGTH
+ PUBLIC_KEY_LENGTH // Author
+ TIMESTAMP_LENGTH // Timestamp
+ STRING_LENGTH_PREFIX + MAX_USERNAME_LENGTH // Username
+ STRING_LENGTH_PREFIX + MAX_NAME_LENGTH // Name
+ STRING_LENGTH_PREFIX + MAX_DESCRIPTION_LENGTH // Description
+ STRING_LENGTH_PREFIX + PIC_URL_LENGTH // Pic URL
+ STRING_LENGTH_PREFIX + BANNER_URL_LENGTH // Banner URL
+ STRING_LENGTH_PREFIX + PERSONAL_URL_LENGTH; // Personal URL
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided username should be 50 characters long maximum.")]
    UsernameTooLong,
    #[msg("Username cannot not be empty.")]
    UsernameEmpty,
    #[msg("The provided description should be 300 characters long maximum.")]
    DescriptionTooLong,
    #[msg("Description cannot be empty.")]
    DescriptionEmpty,
    #[msg("The provided name should be 50 characters long maximum.")]
    NameTooLong,
    #[msg("Name cannot be empty.")]
    NameEmpty,
    #[msg("The provided url should be 200 characters long maximum.")]
    URLTooLong,
    #[msg("URL cannot be empty.")]
    URLEmpty,
    #[msg("Your Account does not has insufficient funds for spend")]
    InsufficientFundsForTransaction,
    
}
