import { v4 as uuidv4 } from 'uuid'
import { User } from './models/User'
import { PlatformAccount } from './models/PlatformAccount'

export async function getAllUsers() {
  return User.query()
}

export async function createPlatformAccount(
  attributes,
  profile_data,
  trx = undefined
) {
  const data = {
    ...attributes,
    id: uuidv4(),
    profile_data,
  }

  return PlatformAccount.query(trx).insertAndFetch(data)
}

export async function createUser(attributes, trx = undefined) {
  const userData = {
    ...attributes,
    id: uuidv4(),
  }

  return User.query(trx).insertAndFetch(userData)
}

export async function createUserAndPlatformAccount(attributes, rawProfile) {
  return User.transaction(async (trx) => {
    const user = await createUser(
      {
        display_name: attributes.display_name,
        avatar_url: attributes.avatar_url,
      },
      trx
    )
    const account = await createPlatformAccount(
      { ...attributes, user_id: user.id },
      rawProfile,
      trx
    )
    return { user, account }
  })
}

// Create a new user and link to an existing platform account
export async function createUserAndLinkAccount(
  attributes,
  profile_data,
  accountId
) {
  return User.transaction(async (trx) => {
    const user = await createUser(
      {
        display_name: attributes.display_name,
        avatar_url: attributes.avatar_url,
      },
      trx
    )
    const account = await PlatformAccount.query(trx).updateAndFetchById(
      accountId,
      {
        ...attributes,
        user_id: user.id,
        profile_data,
      }
    )
    return { user, account }
  })
}

export async function linkAccount(userId, accountId, attributes, profile_data) {
  return User.transaction(async (trx) => {
    const account = await PlatformAccount.query(trx).updateAndFetchById(
      accountId,
      {
        ...attributes,
        user_id: userId,
        profile_data,
      }
    )
    return { account }
  })
}

export async function findUserById(id, trx = undefined) {
  return User.query(trx).findById(id).skipUndefined()
}

export async function findPlatformAccountByPlatformId(
  platform,
  platform_account_id
) {
  return PlatformAccount.query()
    .where({ platform, platform_account_id })
    .withGraphFetched('user')
    .first()
}

export async function updateUserById(id, update, trx = undefined) {
  return User.query(trx).updateAndFetchById(id, update)
}

export async function addUserPointsById(id, pointsToAdd, trx = undefined) {
  return (
    trx || User.knex()
  ).raw('update "user" set "points" = "points" + ? where "id" = ?', [
    pointsToAdd,
    id,
  ])
}

export async function findPlatformAccountsByUserId(userId) {
  return PlatformAccount.query().where({ user_id: userId })
}

export async function findPlatformAccountByUserIdAndPlatform(userId, platform) {
  return PlatformAccount.query().where({ user_id: userId, platform }).first()
}

export async function unlinkPlatformAccount(id, userId) {
  const accounts = await PlatformAccount.query().where({ user_id: userId })
  if (accounts.length <= 1) {
    throw new Error('Must be connected to 2 or more accounts to disconnect one')
  }
  if (!accounts.find((a) => a.id === id)) {
    throw new Error('Cannot disconnect account that is not connected')
  }
  return PlatformAccount.query().findById(id).patch({ user_id: null })
}

export async function signUpOrSignInWithAccount({
  sessionUser,
  profile,
  rawProfile,
  disableSignUp,
}) {
  let isInitial = false
  // future session user
  let account = await findPlatformAccountByPlatformId(
    profile.platform,
    profile.platform_account_id
  )
  let user = account && account.user

  if (sessionUser && user && sessionUser.id !== user.id) {
    // if session exists and session user is different from found user, fail
    throw new Error('That account has already been linked to another user')
  } else if (sessionUser && !user) {
    isInitial = true
    // if session exists and user is not already connected to this platform, connect them
    // (case: link additional account)
    // add platform profile and link to user
    if (account) {
      // Link an existing but unlinked account
      account = await linkAccount(
        sessionUser.id,
        account.id,
        profile,
        rawProfile
      )
    } else {
      // Link a new account
      account = await createPlatformAccount(
        {
          ...profile,
          user_id: sessionUser.id,
        },
        rawProfile
      )
    }
    user = sessionUser
  } else if (!sessionUser && !user) {
    if (disableSignUp) {
      throw new Error(
        'Cannot create an account using this platform. Try another platform instead'
      )
    }
    isInitial = true
    if (!account) {
      console.log('new account and user')
      // New user is signing up for a new account
      const result = await createUserAndPlatformAccount(profile, rawProfile)
      user = result.user
      account = result.account
    } else {
      console.log('old account and new user', account)
      // new user is signing up for an existing unlinked account
      const result = await createUserAndLinkAccount(
        profile,
        rawProfile,
        account.id
      )
      user = result.user
      account = result.account
    }
  } else {
    console.log('logged in!', user, account)
  }

  return { user, account, isInitial }
}
