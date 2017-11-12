import react from 'react';
import Head from 'next/head';
import Link from 'next/link';
import GlobalHead from '../component/_head';

export default () => (
  <div>
    <GlobalHead></GlobalHead>
    <Head>
      <title>index</title>
    </Head>
    <h1>index</h1>
    <nav>
      <Link href="/chat" prefetch><a>Chat Room</a></Link>
    </nav>
  </div>
)
