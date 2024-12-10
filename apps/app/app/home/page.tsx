import Footer from "./footer"
import Hero from "./hero"
import Info from "./info"
import Plans from "./plans"
import Stats from "./stats"
import Steps from "./steps"
import Tools from "./tools"

const Home = () => {
  return (
    <div className="pt-7 px-12 first-of-type:px-0">
      <Hero />  
      <Stats />
      <Steps />
      <Tools />
      <Info />
      <Plans />
      <Footer />
    </div>
  )
}

export default Home