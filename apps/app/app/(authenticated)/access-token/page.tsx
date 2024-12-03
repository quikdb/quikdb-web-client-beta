import { AccessTable } from "../components/access-table"
import CreateToken from "../components/CreateTokenForm"

const AccessToken = () => {
    return (
        <div className='mt-10 max-md:mt-5'>
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-3xl">Application Tokens</p>
                    <p className="font-light text-base text-gray-400">Unlock API Access with Personal Tokens</p>
                </div>
                <CreateToken />
            </div>
            <AccessTable />
        </div>
    )
}

export default AccessToken