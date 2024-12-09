import Hero from "./hero"
import Stats from "./stats"
import Steps from "./steps"
import Tools from "./tools"

const Home = () => {
  return (
    <div className="p-7 px-12 first-of-type:px-0">
      <Hero />  
      <Stats />
      <Steps />
      <Tools />
    </div>
  )
}

export default Home