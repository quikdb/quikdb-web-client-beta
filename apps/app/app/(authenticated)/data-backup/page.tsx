import { BackupTable } from "../components/backup-table"
import CreateBackup from "../components/CreateBackupForm"

const DataBackup = () => {
    return (
        <div className="mt-10">
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-3xl">Data Backup</p>
                    <p className="font-light text-base text-gray-400">Unlock API Access with Personal Tokens</p>
                </div>
                <CreateBackup />
            </div>

            <BackupTable />
        </div>
    )
}

export default DataBackup