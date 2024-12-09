import Hero from "./hero"
import Stats from "./stats"

const Home = () => {
  return (
    <div className="p-7 px-12 first-of-type:px-0">
      <Hero />  
      <Stats />
    </div>
  )
}

export default Home