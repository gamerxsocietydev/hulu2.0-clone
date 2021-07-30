import Head from 'next/head'
import Layout, { siteTitle } from "../components/layout"
import useSWR from 'swr'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import Date from '../components/date'
import Typography from '@material-ui/core/Typography'

import { useUser, fetcher } from '../lib/hooks'

import Navbar from '../components/Navbar'

import { getSortedPostsData } from '../lib/posts'
import Login from './Login'
import Header from '../components/Header'
import requests from '../utils/requests'
import Results from '../components/Results'


// export async function getStaticProps() {

//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

function UserList() {
  const { data: { users } = {} } = useSWR('/api/users', fetcher)
  return (
    <>
      <h2>All users</h2>
      {!!users?.length && (
        <ul>
          {users.map((user) => (
            <li key={user.username}>
              <pre>{JSON.stringify(user, null, 2)}</pre>
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

function AchievementList() {
  const { data: { achievements } = {} } = useSWR(
    '/api/me/achievements',
    fetcher
  )
  return (
    <>
      <h2>Player Achievements</h2>
      {!!achievements?.length && (
        <ul>
          {achievements.map((achievement) => (
            <li key={achievement.id}>
              <pre>{JSON.stringify(achievement, null, 2)}</pre>
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



export default function HomePage({results}) {
  const [user] = useUser()

  return (
    // <Layout home>
    <>
      <Head>
        <title>{siteTitle}</title>

        <link rel="icon" href="/GXS_MINI_LOGO.png" />
      </Head>

      <Header />
      <Navbar />
      <Results results={results}/>
      <Login />
         
      <Typography variant = "h4">GamerXSociety</Typography>
      {/* Displayed if user is signed in successfully */}
      {user && (
        <Link href="/profile">
          <a className={utilStyles.headingMd}>Profile</a>
        </Link>
      )}

      {/* Displayed if user is NOT signed in successfully */}
      {!user && (
        <p>
          <a className={utilStyles.headingMd} href="/api/auth/steam">Login with Steam</a>
        </p>
      )}

      <h2 className={utilStyles.headingMd}>Steps to test the example:</h2>
            {/* Displayed if user is signed in successfully */}
      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <Link href="/rewards">
        <a>Rewards</a>
      </Link>
      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    {/* </Layout> */}
    </>
  )
}


export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  
  ).then((res) => res.json());

  return {
    props: {
      results: request.results
    },
  };
}