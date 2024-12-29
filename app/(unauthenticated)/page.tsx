import ScrollingAlert from "../(authenticated)/components/ScrolingAlert"
import Footer from "./home/footer"
import Hero from "./home/hero"
import Info from "./home/info"
import Plans from "./home/plans"
import Stats from "./home/stats"
import Steps from "./home/steps"
import Tools from "./home/tools"

const Home = () => {
  return (
    <div>
      <ScrollingAlert />
      <div className="pt-7 px-12 first-of-type:px-0">
        <Hero />
        <Stats />
        <Steps />
        <Tools />
        <Info />
        <Plans />
        <Footer />
      </div>
    </div>
  )
}

export default Home