import { useState, useEffect, useRef } from 'react'
import FormPage from '../pages/FormPage'
import useSWR from 'swr'
import Router from 'next/router'
import { useUser, fetcher } from '../lib/hooks'
import * as gtag from '../lib/gtag'

const createHandler = (setErrorMsg, updateState) => {
  return async function (e) {
    e.preventDefault()

    console.log('e.curr', e.currentTarget.name)
    const rid = e.currentTarget.name

    const res = await fetch(`/api/me/accounts/${rid}`, {
      method: 'DELETE',
    })

    if (res.status === 200) {
      await res.json()
      //console.log(account)
      updateState({ id: rid })
    } else {
      console.log(res)
      const result = await res.json()
      console.log(result)
      setErrorMsg(result.error)
    }
  }
}

const createRewardHandler = (endpoint, setErrorMsg, updateRewardState) => {
  return async function (e) {
    e.preventDefault()

    const rid = e.currentTarget.name

    const res = await fetch(`/api/reward/${rid}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.status === 200) {
      const { data: reward } = await res.json()
      console.log(reward)
      updateRewardState(reward)
      gtag.event({
        action: endpoint,
        category: 'Rewards',
        label: reward.display_name,
        value: rid,
      })
    } else {
      console.log(res)
      const result = await res.json()
      console.log(result)
      setErrorMsg(result.error)
    }
  }
}

function RewardList({ mutateUser, user }) {
  const [errorMsg, setErrorMsg] = useState('')

  const { data: { rewards } = {}, mutate } = useSWR('/api/me/rewards', fetcher)

  const updateRewardState = (reward) => {
    const index = _.findIndex(rewards, { id: reward.id })
    const newRewards = Object.assign([], rewards, { [index]: reward })
    mutate(newRewards)
    mutateUser({ ...user, points: user.points - reward.point_cost })
  }

  const onUnlock = createRewardHandler('unlock', setErrorMsg, updateRewardState)
  const onRedeem = createRewardHandler('redeem', setErrorMsg, updateRewardState)

  console.log('load', rewards)
  return (
    <>
      {errorMsg && <p className="error">{errorMsg}</p>}
      {!!rewards?.length && (
        <ul>
          {rewards.map((reward) => (
            <li key={reward.id}>
              <pre>{JSON.stringify(reward, null, 2)}</pre>

              {user && (
                <>
                  {!reward.unlocked && (
                    <a href="#" onClick={onUnlock} name={reward.id}>
                      Unlock
                    </a>
                  )}
                  {reward.unlocked && !reward.redeemed && (
                    <a href="#" onClick={onRedeem} name={reward.id}>
                      Redeem
                    </a>
                  )}
                  {reward.redeemed && <strong>Code: {reward.code}</strong>}
                </>
              )}
            </li>
          ))}

          <style jsx>{`
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
          `}</style>
        </ul>
      )}
    </>
  )
}

function AccountList({ user }) {
  const [errorMsg, setErrorMsg] = useState('')

  const { data: { accounts } = {}, mutate } = useSWR(
    ['/api/me/accounts'],
    fetcher
  )

  const updateState = (account) => {
    const newRewards = accounts.filter((a) => a.id !== account.id)
    mutate(newRewards)
  }

  const onDisconnect = createHandler(setErrorMsg, updateState)

  const hasXbox = !!accounts?.find((a) => a.platform === 'xboxlive')

  console.log('load', accounts)
  return (
    <>
      {errorMsg && <p className="error">{errorMsg}</p>}
      {!!accounts?.length && (
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>
              <pre>{JSON.stringify(account, null, 2)}</pre>
              {account.platform === 'xboxlive' && (
                <a href="#" onClick={onDisconnect} name={account.id}>
                  Disconnect
                </a>
              )}
            </li>
          ))}

          <style jsx>{`
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
          `}</style>
        </ul>
      )}
      {!hasXbox && (
        <p>
          <a href="/api/auth/xboxlive">Connect XBOX Live account</a>
        </p>
      )}
    </>
  )
}

function ProfileEdit() {
  const [user, { mutate }] = useUser()
  const nameRef = useRef()

  useEffect(() => {
    if (!user) return
    nameRef.current.value = user.display_name
  }, [user])

  async function handleEditProfile(e) {
    e.preventDefault()

    const body = {
      display_name: nameRef.current.value,
    }
    const res = await fetch(`/api/me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const updatedUser = await res.json()

    mutate(updatedUser)
  }

  async function handleDeleteProfile() {
    const res = await fetch(`/api/me`, {
      method: 'DELETE',
    })

    if (res.status === 204) {
      mutate({ user: null })
      Router.replace('/')
    }
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleEditProfile}>
          <label>
            <span>Display Name</span>
            <input type="text" ref={nameRef} required />
          </label>
          <div className="submit">
            <button type="submit">Update profile</button>
          </div>
        </form>
      </div>

      <h2>Connected Accounts</h2>
      <AccountList user={user} />

      <h2>Rewards</h2>
      <RewardList user={user} />

      <style jsx>{`
        .delete {
          color: #f44336;
          cursor: pointer;
        }
        .delete:hover {
          color: #b71c1c;
        }
      `}</style>
    </>
  )
}

export default function ProfilePage() {
  const [user, { loading }] = useUser()

  useEffect(() => {
    // redirect user to login if not authenticated
    if (!loading && !user) Router.replace('/login')
  }, [user, loading])

  return (
    <>
      <h1>Profile</h1>

      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <ProfileEdit />
          
          <FormPage />

        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </>
  )
}
