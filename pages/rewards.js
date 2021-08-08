import { useState, useEffect } from 'react'
import _ from 'lodash'
import useSWR from 'swr'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

//this is a repo test
import * as gtag from '../lib/gtag'
import { useUser, fetcher } from '../lib/hooks'
import styles from '../styles/Home.module.css'

const createHandler = (endpoint, setErrorMsg, updateRewardState) => {
  return async function (e) {
    e.preventDefault()

    console.log('e.curr', e.currentTarget.name)
    const rid = e.currentTarget.name

    const res = await fetch(`/api/reward/${rid}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
  const [filters, setFilters] = useState({})

  useEffect(() => {
    //if ('geolocation' in navigator && !(filters.lon && filters.lat)) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('Latitude is :', position.coords.latitude)
        console.log('Longitude is :', position.coords.longitude)
        setFilters({
          ...filters,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      })
    }
  })

  const { data: { rewards } = {}, mutate } = useSWR(
    ['/api/rewards', filters],
    fetcher
  )

  const updateRewardState = (reward) => {
    const index = _.findIndex(rewards, { id: reward.id })
    const newRewards = Object.assign([], rewards, { [index]: reward })
    mutate(newRewards)
    mutateUser({ ...user, points: user.points - reward.point_cost })
  }

  const onUnlock = createHandler('unlock', setErrorMsg, updateRewardState)
  const onRedeem = createHandler('redeem', setErrorMsg, updateRewardState)

  console.log('load', rewards)
  return (
    <>
      {errorMsg && <p className="error">{errorMsg}</p>}
      {!!rewards?.length && (
        <ul>
          {rewards.map((reward) => (
            <container>
              <div
                key={reward.id}
                className=" flex flex-col items-center sm:w-screen md:w-2/3 "
              >
                <div className=" flex flex-col justify-center items-center  ">
                  <div className="border-2 rounded-xl p-1 text-xs m-1 bg-gray-600 border-yellow-500">
                    {reward.category}
                  </div>

                  <div className="text-2xl">{reward.display_name}</div>
                  {/* <img src={reward.image_url} layout="responsive" height="400" width="400" /> */}
                  <video
                    layout="responsive"
                    height="50%"
                    width="95%"
                    poster="/images/nike logo.png"
                    controls
                    autoplay
                  >
                    <source
                      src="/images/Call of Duty®_ Modern Warfare® & Warzone™ - Official Season Six Trailer.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <button className="flex justify-center items-center border-yellow-500 border-2 rounded-lg bg-yellow-500 text-white mt-1 md:text-xl w-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    {reward.point_cost} points to unlock
                  </button>
                  <div>{reward.description}</div>
                  <hr className="border-2 border-gray-800 w-11/12 h-1 m-10 " />
                </div>
              </div>
              {/*  <p> {reward.display_name}</p>
           <p> {reward.catetory}</p>
           <p> {reward.description}</p>
          <p> {reward.point_cost} rewards points</p> */}
              {/* <pre>{JSON.stringify(reward, null, 2)}</pre> */}

              {user && (
                <>
                  {!reward.unlocked && (
                    <a href="#" onClick={onUnlock} name={reward.id}>
                      <Button variant="contained" color="primary">
                        Unlock
                      </Button>
                    </a>
                  )}
                  {reward.unlocked && !reward.redeemed && (
                    <a href="#" onClick={onRedeem} name={reward.id}>
                      <Button variant="contained" color="primary">
                        Redeem
                      </Button>
                    </a>
                  )}
                  {reward.redeemed && <strong>Code: {reward.code}</strong>}
                </>
              )}
            </container>
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: '30vh',
  },
})
// Rewards Page Display starts here //

export default function RewardsPage() {
  const [user, { mutate }] = useUser()
  console.log('user', user)

  const classes = useStyles()

  return (
    <div className={styles.container}>
      <Head>
        <title>Rewards</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="GXS_MINI_LOGO.png"
            title="The Future Of Gaming"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              50% Off Jackets
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              All GamerXSociety members receive 50% off at participating
              locations
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="contained" size="small" color="primary">
            50pts
            <LockOutlinedIcon /> Unlock
          </Button>
        </CardActions>
      </Card>
      <h1>GamerXSociety</h1>
      <h2>Rewards</h2>
      <a href="#">
        <Button variant="contained" color="secondary">
          Unlock
        </Button>
      </a>
      {/* <Container>
  <p>"id": "062d6131-eba9-46c9-89df-5371c1e579e6"</p>
  <p>"display_name": "50% Off Jackets",</p>
  <p>"description": "",</p>
  <p>"category": "apparel",</p>
  <p>"image_url": "",</p>
  <p>"purchasable": true,</p>
  <p>"point_cost": 50,</p>
  <p>"expiration_date": null,</p>
  <p>"unlocked_count": "0",</p>
  <p>"redeemed_code_count": "0",</p>
  <p> "total_code_count": "0"</p>
  </Container> */}

      <RewardList mutateUser={mutate} user={user} />
    </div>
  )
}

function RewardsPage2() {
  const [user, { mutate }] = useUser()
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 200) {
      const userObj = await res.json()
      // set user to useSWR state
      mutate(userObj)
    } else {
      setErrorMsg('Incorrect username or password. Try better!')
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  return (
    <>
      <h1>Rewards to Example</h1>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <label>
            <span>Username</span>
            <input type="text" name="username" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" required />
          </label>
          <div className="submit">
            <button type="submit">Rewards</button>
            <Link href="/signup">
              <a>I don't have an account</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
