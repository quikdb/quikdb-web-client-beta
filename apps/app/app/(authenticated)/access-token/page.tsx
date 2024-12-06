import { AccessTable } from "../components/access-table"
import CreateToken from "../components/CreateTokenForm"

const AccessToken = () => {
    return (
        <div className='mt-10 max-md:mt-5'>
            <div className="flex max-md:flex-col max-md:gap-3 justify-between">
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-3xl max-md:text-2xl">Application Tokens</p>
                    <p className="font-light text-base max-md:text-sm text-gray-400">Unlock API Access with Personal Tokens</p>
                </div>
                <CreateToken projectId={null} />
            </div>
            <AccessTable projectId={""} />
        </div>
    )
}

export default AccessToken