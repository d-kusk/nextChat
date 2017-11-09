import React from 'react'
import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <script src="https://www.gstatic.com/firebasejs/4.6.1/firebase.js"></script>
      <script>{`
        // Initialize Firebase
        var config = {
          apiKey: "AIzaSyCLwcZsen50aK41hUI0Hj6SYnFKby0Phmo",
          authDomain: "nextchat-471b2.firebaseapp.com",
          databaseURL: "https://nextchat-471b2.firebaseio.com",
          projectId: "nextchat-471b2",
          storageBucket: "nextchat-471b2.appspot.com",
          messagingSenderId: "850513022872"
        };
        firebase.initializeApp(config);
      `}</script>
    </Head>
  </div>
)