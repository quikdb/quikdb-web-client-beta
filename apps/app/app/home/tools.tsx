import { Button } from "@repo/design-system/components/ui/button"
import { ArrowRight } from "lucide-react"

const Tools = () => {
    return (
        <div className="py-10 px-12">
            <div className="mb-12 ml-24">
                <p className="text-3xl font-medium">Work seamlessly with your tools.</p>
                <p className="text-[#858585] text-sm w-[25%] mt-3">Connect QuikDB to your existing databases like MongoDB and PostgreSQL in just a few clicks.</p>
                <Button className="bg-transparent text-gradient rounded-full my-7">
                    Try it now
                    <ArrowRight />
                </Button>
            </div>
            <img src="/images/tools.png" alt="" className="object-contain w-2/3 mx-auto" />
        </div>
    )
}

export default Tools