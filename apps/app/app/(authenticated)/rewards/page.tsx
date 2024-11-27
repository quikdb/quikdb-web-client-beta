import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"

const rewards = [
    {
        name: "Building Data Models or Queries",
        percentage: 40,
        gems: 500,
    },
    {
        name: "Building Data Models or Queries",
        percentage: 40,
        gems: 500,
    },
    {
        name: "Building Data Models or Queries",
        percentage: 40,
        gems: 500,
    },
]

const Rewards = () => {
    return (
        <div className="mt-10 flex flex-col gap-7">
            <div className="flex flex-col gap-1">
                <p className="font-satoshi_medium text-3xl">Rewards</p>
                <p className="font-satoshi_light text-base text-gray-400">Real-time overview of your listed projects</p>
            </div>

            <Card className="bg-[#151418] p-10 text-white text-center border-[#242527]">
                <div className="flex flex-col items-center gap-2">
                    <img src="/images/gem.png" alt="gem" className="w-7 h-7" />
                    <p className="text-gradient font-satoshi_medium text-3xl">600</p>
                    <p className="font-satoshi_medium text-2xl">Your reward points</p>
                </div>
                <p className="mt-5 mx-auto w-[35%] text-gray-300">Earn more points, deem exciting gifts and enjoy your QuikDB experience</p>
            </Card>

            <div className="flex flex-wrap gap-5 justify-between">
                {rewards.map((reward, index) => (
                    <Card key={index} className="bg-[#212024] w-[32%] text-white text-center border-[#242527] flex flex-col h-full">
                        <div className="min-h-[150px]" />
                        <Card className="bg-[#151418] p-4 text-white text-center border-none w-full rounded-t-none h-full flex flex-col items-start gap-4">
                            <p className="font-satoshi_medium text-lg">{reward.name}</p>
                            <Progress value={reward.percentage} className="bg-[#4A4A4A]/70 h-1.5" />
                            <div className="flex gap-2">
                                <img src="/images/gem.png" alt="gem" className="object-contain" />
                                <p>{reward.gems}</p>
                            </div>
                            <Button className="bg-transparent border border-[#242527] rounded-2xl w-full font-satoshi_medium text-base text-gray-400 py-5">Redeem</Button>
                        </Card>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Rewards