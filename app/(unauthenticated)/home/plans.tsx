import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@quikdb/design-system/components/ui/table"

const plans = [
    {
        price: "$0",
        credits: "0",
        storage: "3 GBstorage Max",
    },
    {
        price: "$10",
        credits: "10,000",
        storage: "1 GBstorage per 1 year",
    },
    {
        price: "$50",
        credits: "45,000",
        storage: "5 GBstorage per 1 year",
    },

]
const Plans = () => {
    return (
        <div className="p-20 max-md:p-8 lg:px-36 max-md:px-5 flex max-md:flex-col gap-56 max-md:gap-7 dark:bg-[#0a0a0c]">
            <div className="flex flex-col gap-6">
                <p className="text-2xl max-md:text-xl font-medium max-md:text-center">Flexible plans for all needs</p>
                <div className="flex flex-col gap-4">
                    <div className="flex text-sm max-md:text-xs gap-3">
                        <img src="/images/star.png" alt="star" className="object-contain w-5" />
                        <p>Purchase credits based on your data needs</p>
                    </div>
                    <div className="flex text-sm max-md:text-xs gap-3">
                        <img src="/images/star.png" alt="star" className="object-contain w-5" />
                        <p>Earn extra credits by completing specific actions like creating on-chain IDs.</p>
                    </div>
                </div>
            </div>

            <div className="lg:w-1/2">
                <Table className="text-xs max-md:text-[10px] italic">
                    <TableHeader>
                        <TableRow className="dark:bg-[#0a0a0c]">
                            <TableHead className="w-[100px] py-4 px-16 max-md:px-6">Price (USD)</TableHead>
                            <TableHead>Credits Earned</TableHead>
                            <TableHead>Storage Equivalent</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {plans.map((plan) => (
                            <TableRow key={plan.price} className="dark:bg-[#060808]">
                                <TableCell className="font-medium py-4 px-16 max-md:px-6">{plan.price}</TableCell>
                                <TableCell>{plan.credits}</TableCell>
                                <TableCell>{plan.storage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Plans