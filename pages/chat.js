import react from 'react';
import Head from 'next/head';
import Link from 'next/link';
import GlobalHead from '../component/_head';
import Chat from '../component/chat/index.js';

export default () => (
  <div>
    <GlobalHead></GlobalHead>
    <Head>
      <title>Chat Room</title>
    </Head>
    <h1>Chat Room</h1>
    <Chat></Chat>
    <nav>
      <Link href="/" prefetch><a>index</a></Link>
    </nav>
  </div>
)
