import { Button } from "@repo/design-system/components/ui/button"
import { ArrowRight } from "lucide-react"

const Info = () => {
    return (
        <div className="lg:pl-36 max-md:px-5 my-5 flex max-lg:flex-col max-md:gap-7 justify-between items-center">
            <div>
                <p className="text-3xl max-md:text-xl lg:ml-5 text-center font-medium mb-10 max-md:mb-5 lg:w-[65%]">Customizable dashboard for tracking data.</p>
                <img src="/images/preview.png" alt="" className="lg:w-4/5 w-[90%] max-lg:mx-auto" />
            </div>
            <div className='flex flex-col gap-5 lg:items-start lg:w-[40%] max-lg:items-center max-lg:text-center max-md:text-sm'>
                <p className="text-[#858585] lg:w-[70%]">Tailor your dashboard to track metrics, manage projects, and monitor databases—all in one place.</p>
                <p>Visualizations of key metrics, queries, and system performance.</p>
                <p>Exportable reports for insights.</p>
                <Button className="bg-transparent text-gradient rounded-full my-7 max-md:my-2 max-md:scale-90">
                    Try it now
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}

export default Info