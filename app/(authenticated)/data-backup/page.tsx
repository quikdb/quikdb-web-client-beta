import { BackupTable } from "../components/backup-table"
import CreateBackup from "../components/CreateBackupForm"

const DataBackup = () => {
    return (
        <div className="mt-10 max-md:mt-5">
            <div className="flex max-md:flex-col max-md:gap-3 justify-between">
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-3xl max-md:text-2xl">Data Backup</p>
                    <p className="font-light text-base max-md:text-sm text-gray-400">Unlock API Access with Personal Tokens</p>
                </div>
                <CreateBackup />
            </div>

            <BackupTable />
        </div>
    )
}

export default DataBackup