import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { RedditProvider } from '../components/context/reddit'


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  

  

  return (
    <SessionProvider session={session}>
      <RedditProvider>
        <Component {...pageProps} />
      </RedditProvider>
        
      
    </SessionProvider>
  )
}

export default MyApp
