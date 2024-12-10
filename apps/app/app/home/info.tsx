import { Button } from "@repo/design-system/components/ui/button"
import { ArrowRight } from "lucide-react"

const Info = () => {
    return (
        <div className="pl-36 my-5 flex justify-between items-center">
            <div>
                <p className="text-3xl font-medium mb-10 w-[65%] ml-5">Customizable dashboard for tracking data.</p>
                <img src="/images/preview.png" alt="" className="w-4/5" />
            </div>
            <div className='flex flex-col gap-5 items-start w-[40%]'>
                <p className="text-[#858585] w-[70%]">Tailor your dashboard to track metrics, manage projects, and monitor databases—all in one place.</p>
                <p>Visualizations of key metrics, queries, and system performance.</p>
                <p>Exportable reports for insights.</p>
                <Button className="bg-transparent text-gradient rounded-full my-7">
                    Try it now
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}

export default Info