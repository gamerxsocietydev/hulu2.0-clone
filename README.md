This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Steam

#API data

Profile

```
{
  provider: 'steam',
  _json: {
    steamid: '76561198024964011',
    communityvisibilitystate: 3,
    profilestate: 1,
    personaname: 'zachseatdriver',
    profileurl: 'https://steamcommunity.com/profiles/76561198024964011/',
    avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997
310d705b2a6158ff8dc1cdfeb.jpg',
    avatarmedium: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa
7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e
1997310d705b2a6158ff8dc1cdfeb_full.jpg',
    avatarhash: 'fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb',
    lastlogoff: 1597362013,
    personastate: 0,
    primaryclanid: '103582791429521408',
    timecreated: 1273702061,
    personastateflags: 0
  },
  id: '76561198024964011',
  displayName: 'zachseatdriver',
  photos: [
    {
      value: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e199
7310d705b2a6158ff8dc1cdfeb.jpg'
    },
    {
      value: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e199
7310d705b2a6158ff8dc1cdfeb_medium.jpg'
    },
    {
      value: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e199
7310d705b2a6158ff8dc1cdfeb_full.jpg'
    }
  ]
}
```

Owned games

```
{
  "response": {
    "game_count": 4,
    "games": [
      {
        "appid": 4000,
        "playtime_forever": 0,
        "playtime_windows_forever": 0,
        "playtime_mac_forever": 0,
        "playtime_linux_forever": 0
      },
      {
        "appid": 400,
        "playtime_forever": 70,
        "playtime_windows_forever": 0,
        "playtime_mac_forever": 0,
        "playtime_linux_forever": 0
      },
      {
        "appid": 620,
        "playtime_forever": 0,
        "playtime_windows_forever": 0,
        "playtime_mac_forever": 0,
        "playtime_linux_forever": 0
      },
      {
        "appid": 252950,
        "playtime_forever": 2018,
        "playtime_windows_forever": 0,
        "playtime_mac_forever": 1350,
        "playtime_linux_forever": 0
      }
    ]
  }
}
```

Achievement data

```
{
  "playerstats": {
    "steamID": "76561198024964011",
    "gameName": "Rocket League",
    "achievements": [
      {
        "apiname": "Virtuoso",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "Stocked",
        "achieved": 1,
        "unlocktime": 1559787426
      },
      {
        "apiname": "FarFarAway",
        "achieved": 1,
        "unlocktime": 1560299990
      },
      {
        "apiname": "SuperVictorious",
        "achieved": 1,
        "unlocktime": 1559956154
      },
      {
        "apiname": "Champion",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "TheStreak",
        "achieved": 1,
        "unlocktime": 1560299990
      },
      {
        "apiname": "HelensPride",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "BattleCarCollector",
        "achieved": 1,
        "unlocktime": 1559774759
      },
      {
        "apiname": "DropsintheBucket",
        "achieved": 1,
        "unlocktime": 1559777142
      },
      {
        "apiname": "Rocketeer",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "GreaseMonkey",
        "achieved": 1,
        "unlocktime": 1560300327
      },
      {
        "apiname": "PitchVeteran",
        "achieved": 1,
        "unlocktime": 1559790337
      },
      {
        "apiname": "RidersBlock",
        "achieved": 1,
        "unlocktime": 1560299990
      },
      {
        "apiname": "BreakShot",
        "achieved": 1,
        "unlocktime": 1559928914
      },
      {
        "apiname": "Turbocharger",
        "achieved": 1,
        "unlocktime": 1559773829
      },
      {
        "apiname": "DrillSergeant",
        "achieved": 1,
        "unlocktime": 1559773829
      },
      {
        "apiname": "MinutetoWinit",
        "achieved": 1,
        "unlocktime": 1559786572
      },
      {
        "apiname": "SpeedDemon",
        "achieved": 1,
        "unlocktime": 1560299990
      },
      {
        "apiname": "PickMeUp",
        "achieved": 1,
        "unlocktime": 1559774759
      },
      {
        "apiname": "WallCrawler",
        "achieved": 1,
        "unlocktime": 1559784777
      },
      {
        "apiname": "TeamPlayer",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "SARPBCForever",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "FeatherinYourRecap",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "Winner",
        "achieved": 1,
        "unlocktime": 1559788533
      },
      {
        "apiname": "CleanSheet",
        "achieved": 1,
        "unlocktime": 1559784780
      },
      {
        "apiname": "TripleThreat",
        "achieved": 1,
        "unlocktime": 1559784779
      },
      {
        "apiname": "DoubleUp",
        "achieved": 1,
        "unlocktime": 1560468953
      },
      {
        "apiname": "SinglesClub",
        "achieved": 1,
        "unlocktime": 1569623051
      },
      {
        "apiname": "PerfectStart",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "StillAShowOff",
        "achieved": 1,
        "unlocktime": 1559844876
      },
      {
        "apiname": "KnowTheDrill",
        "achieved": 1,
        "unlocktime": 1559773829
      },
      {
        "apiname": "Traveler",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "Tinkerer",
        "achieved": 1,
        "unlocktime": 1559774017
      },
      {
        "apiname": "FirstTimer",
        "achieved": 1,
        "unlocktime": 1559784103
      },
      {
        "apiname": "BarrasBravas",
        "achieved": 1,
        "unlocktime": 1559774758
      },
      {
        "apiname": "Friendly",
        "achieved": 1,
        "unlocktime": 1559844876
      },
      {
        "apiname": "WinningIsWinning",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "AnInchAnd62Miles",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "RideOrDie",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "DontLookBack",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "FamilyNotFriends",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "DriftKing",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "SkyHigh",
        "achieved": 1,
        "unlocktime": 1560299990
      },
      {
        "apiname": "AllFours",
        "achieved": 1,
        "unlocktime": 1559790337
      },
      {
        "apiname": "Gladiator",
        "achieved": 1,
        "unlocktime": 1569553236
      },
      {
        "apiname": "SurvivalOfTheFittest",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "Heartbreaker",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "NaturalProgression",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "Throwback",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "HotShotPartTwo",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "MyWorldIsFire",
        "achieved": 1,
        "unlocktime": 1559790337
      },
      {
        "apiname": "Spectacular",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "Savage",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "Ruthless",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "PsychoMasterExploder",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "MadScientist",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "IcingTheCake",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "LeftWingRightWing",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "FastBreak",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "BuzzerBeater",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "BuddingArtist",
        "achieved": 1,
        "unlocktime": 1559784780
      },
      {
        "apiname": "OneBetter",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "Certifiable",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "GG",
        "achieved": 1,
        "unlocktime": 1560299990
      },
      {
        "apiname": "Trifecta",
        "achieved": 1,
        "unlocktime": 1559789449
      },
      {
        "apiname": "InfinitePower",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "StoppedCold",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "SeaTurtle",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "GetUpMrBubbles",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "RocketGenocider",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "RegisteredVoter",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "Metaverse",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "BraveTheElements",
        "achieved": 1,
        "unlocktime": 1559928914
      },
      {
        "apiname": "DamageControl",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "FullCourse",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "BuckministerX10",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "StormTrooper",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "GoodTimes",
        "achieved": 1,
        "unlocktime": 1560303035
      },
      {
        "apiname": "SwapMeet",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "TradeSecret",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "RankUp",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "ComingOnStrong",
        "achieved": 1,
        "unlocktime": 1560389988
      },
      {
        "apiname": "JointheClub",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "TogetherisBetter",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "NewChallenger",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "PeoplePerson",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "SquadGoals",
        "achieved": 0,
        "unlocktime": 0
      },
      {
        "apiname": "BestoftheBunch",
        "achieved": 0,
        "unlocktime": 0
      }
    ],
    "success": true
  }
}
```

# gamerxsocietydev2
