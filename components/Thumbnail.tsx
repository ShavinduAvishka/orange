import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'

interface Props {
  movie: Movie | DocumentData
}

function Thumbnail({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)

  return (
    
    <div
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      {/* <h3 className='absolute'>{movie.title}</h3> */}

      {/* image fetching from the API */}
      <a><Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        
      /></a>

      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-r from-black to-transparent">
            <p className="text-sm text-white font-medium hover:text-[#ffb500]">
                {movie.title} {movie.name} </p>
            
        </div>
      

    </div>
  )
}

export default Thumbnail