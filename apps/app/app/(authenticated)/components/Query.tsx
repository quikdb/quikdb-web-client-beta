import { Input } from "../../components/onboarding"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"


const Query = () => {
    return (
        <div className="mt-6">
            <Card className="bg-[#151418] text-white border-none py-4 px-8 font-satoshi_medium">Query Data</Card>

            <div className="px-8 mt-4 flex gap-20">
                <div className="flex flex-col items-center w-1/2">
                    <div className="grid gap-5 py-4 w-full">
                        <div className="grid gap-4">
                            <Label htmlFor="name">
                                Enterquery (SQL/NOSQL)
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter database name here"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid gap-4">
                            <Label htmlFor="capacity">
                                Choose Database
                            </Label>
                            <Select>
                                <SelectTrigger className="p-6 py-4 h-14 border-none bg-[#141414] rounded-2xl text-[#A5A5A5] text-[16px]">
                                    <SelectValue placeholder="Select a database" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#141414] border-[#242527] text-white">
                                    <SelectGroup>
                                        <SelectLabel>Databases</SelectLabel>
                                        <SelectItem value="urbanlifesuite">UrbanLifeSuite</SelectItem>
                                        <SelectItem value="realestate">RealEstate</SelectItem>
                                        <SelectItem value="ecommerce">ECommerce</SelectItem>
                                        <SelectItem value="education">Education</SelectItem>
                                        <SelectItem value="travel">Travel</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button size="lg" className="w-fit">Save Query</Button>
                    </div>
                    <Button size="lg" className="bg-gradient w-fit px-4 text-base font-satoshi_medium text-[#0F1407]">
                        Execute
                    </Button>
                </div>

                <div className="w-1/2 flex flex-col gap-5">
                    <p className="text-lg">Results</p>
                    <Card className="bg-transparent border-[#242527] text-white p-5">
                        <div className="flex justify-between items-center">
                            <p className="text-lg">Query 1</p>
                            <Button className="bg-gradient w-fit px-4 text-[#0F1407]">
                                View
                            </Button>
                        </div>
                        <p className="text-gray-400 text-sm mt-3">Query 1 description</p>
                    </Card>
                    <div className="text-right">
                        <Button variant="outline" className="font-satoshi_medium borde border-[#8A46FF]/60 px-4 w-fit text-gradient">
                            Export Results
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Query