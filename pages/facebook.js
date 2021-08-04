import Head from 'next/head'

import React from 'react'

export default function facebook() {
  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <title>amp-facebook</title>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        {/* <!-- ## Setup --> */}
        {/* <!-- Import the `amp-facebook` component --> */}
        <script
          async
          custom-element="amp-facebook"
          src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"
        ></script>
        <link
          rel="canonical"
          href="https://amp.dev/documentation/examples/components/amp-facebook/index.html"
        />
        <meta name="viewport" content="width=device-width" />
        {/* <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style> */}
        {/* </noscript> */}
        <script
          async
          custom-element="amp-ima-video"
          src="https://cdn.ampproject.org/v0/amp-ima-video-0.1.js"
        ></script>
      </Head>
      <body>
        {/* <!-- ## Basic usage --> */}
        {/* <!-- The `amp-facebook` component only requires the URL of the facebook post... --> */}
        <amp-facebook
          width="552"
          height="303"
          layout="responsive"
          data-href="https://www.facebook.com/zuck/posts/10102593740125791"
        ></amp-facebook>

        {/* <!-- ## Video --> */}
        {/* <!-- Here is a sample for a Facebook video embed. --> */}
        <amp-facebook
          width="552"
          height="310"
          layout="responsive"
          data-href="https://www.facebook.com/zuck/videos/10102509264909801/"
        ></amp-facebook>

        {/* <!-- ## Video with card --> */}
        {/* <!-- Setting data-embed-as="video" will embed the video with the accompanying card. --> */}
        <amp-facebook
          width="552"
          height="310"
          layout="responsive"
          data-embed-as="video"
          data-href="https://www.facebook.com/zuck/videos/10102509264909801/"
        ></amp-facebook>

        {/* <!-- ## Video without card --> */}
        {/* <!-- Setting data-embed-as="post" will embed the video without the accompanying card. --> */}
        <amp-facebook
          width="552"
          height="310"
          layout="responsive"
          data-embed-as="post"
          data-href="https://www.facebook.com/zuck/videos/10102509264909801/"
        ></amp-facebook>
      </body>
    </div>
  )
}
