import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'
import requests from '../utils/requests'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  
}

const Home = ({netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props ) => {

  const { logout, loading } = useAuth()
  const showModal = useRecoilValue(modalState)

  if (loading) return null
  
  return (
    <div className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}>
      <Head>
        <title>Home - Orange</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
      </Head>
      <Header/>
      
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
          <Banner netflixOriginals={netflixOriginals}/>
          <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
          </section>
      </main>

      {showModal && <Modal />}

      <div dangerouslySetInnerHTML={{ __html: `
   <df-messenger
     intent="WELCOME"
     chat-title="FirstTest"
     chat-icon="https://rb.gy/8idhxr"
     agent-id="1f03b05f-2a04-439c-868f-44f6762fbb4e"
     language-code="en">
     <style>
     df-messenger {
      --df-messenger-bot-message: #ffa500;
      --df-messenger-font-color: white;
      --df-messenger-chat-background-color: #ffedcc;
      --df-messenger-button-titlebar-color: #ffa500;
      --df-messenger-user-message: #191000;
      --df-messenger-send-icon: #ffa500;
      --df-messenger-input-box-color: #ffffff;
      --df-messenger-input-placeholder-font-color: #ffa500;
      --df-messenger-minimized-chat-close-icon-color: #ffa500;
      

     }
     </style>
   </df-messenger>
` }} />


    </div>
  


  ) 
}

export default Home

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
