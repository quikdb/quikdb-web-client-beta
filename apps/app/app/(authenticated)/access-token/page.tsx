import { AccessTable } from "../components/access-table"
import CreateToken from "../components/CreateTokenForm"

const AccessToken = () => {
    return (
        <div className='mt-10'>
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <p className="font-satoshi_medium text-3xl">Application Tokens</p>
                    <p className="font-satoshi_light text-base text-gray-400">Unlock API Access with Personal Tokens</p>
                </div>
                <CreateToken />
            </div>
            <AccessTable />
        </div>
    )
}

export default AccessToken