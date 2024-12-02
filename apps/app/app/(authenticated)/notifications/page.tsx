import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/design-system/components/ui/tabs"

const AllNotifications = () => {
    return (
        <div className="flex flex-col gap-5 py-4 text-base">
            <div className="border-b border-b-[#1D1D1D] pb-4 flex justify-between items-center">
                <div className="grid gap-2">
                    <p className="font-satoshi_light">Login Successful</p>
                    <p className="text-sm text-gray-400">You’ve successfully logged in from a new device. If this wasn’t you, please secure your account.</p>
                </div>
                <p>12 mins ago</p>
            </div>
            <div className="border-b border-b-[#1D1D1D] pb-4 flex justify-between items-center">
                <div className="grid gap-2">
                    <p className="font-satoshi_light">Data Backup Completed</p>
                    <p className="text-sm text-gray-400">Your data backup was completed successfully.</p>
                </div>
                <p>12 mins ago</p>
            </div>
            <div className="border-b border-b-[#1D1D1D] pb-4 flex justify-between items-center">
                <div className="grid gap-2">
                    <p className="font-satoshi_light">Login Successful</p>
                    <p className="text-sm text-gray-400">You’ve successfully logged in from a new device. If this wasn’t you, please secure your account.</p>
                </div>
                <p>12 mins ago</p>
            </div>
            <div className="border-b border-b-[#1D1D1D] pb-4 flex justify-between items-center">
                <div className="grid gap-2">
                    <p className="font-satoshi_light">Data Usage Alert</p>
                    <p className="text-sm text-gray-400">You have used 90% of your data limit. Consider upgrading your plan or reducing usage.</p>
                </div>
                <p>12 mins ago</p>
            </div>
            <div className="border-b border-b-[#1D1D1D] pb-4 flex justify-between items-center">
                <div className="grid gap-2">
                    <p className="font-satoshi_light">Login Successful</p>
                    <p className="text-sm text-gray-400">You’ve successfully logged in from a new device. If this wasn’t you, please secure your account.</p>
                </div>
                <p>12 mins ago</p>
            </div>
            <div className="border-b border-b-[#1D1D1D] pb-4 flex justify-between items-center">
                <div className="grid gap-2">
                    <p className="font-satoshi_light">Storage Nearing Limit</p>
                    <p className="text-sm text-gray-400">Your storage is 95% full. Free up space or consider upgrading your storage plan.</p>
                </div>
                <p>12 mins ago</p>
            </div>
            <div className="border-b border-b-[#1D1D1D] pb-4 flex justify-between items-center">
                <div className="grid gap-2">
                    <p className="font-satoshi_light">Data Backup Completed</p>
                    <p className="text-sm text-gray-400">Your data backup was completed successfully.</p>
                </div>
                <p>12 mins ago</p>
            </div>
            <div className="border-b border-b-[#1D1D1D] pb-4 flex justify-between items-center">
                <div className="grid gap-2">
                    <p className="font-satoshi_light">Login Successful</p>
                    <p className="text-sm text-gray-400">You’ve successfully logged in from a new device. If this wasn’t you, please secure your account.</p>
                </div>
                <p>12 mins ago</p>
            </div>
        </div>
    )
}

const Notifications = () => {
    return (
        <div className="mt-10">
            <p className="text-2xl font-satoshi_medium">Notifications</p>
            <Tabs defaultValue="all" className="mt-5">
                <TabsList className="grid w-1/3 grid-cols-3 bg-[#1D1D1D] text-gray-400 font-satoshi_medium border-none border-b border-b-[#242527] gap-">
                    <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-[#030500]">All</TabsTrigger>
                    <TabsTrigger value="unread" className="data-[state=active]:bg-white data-[state=active]:text-[#030500]">Unread</TabsTrigger>
                    <TabsTrigger value="read" className="data-[state=active]:bg-white data-[state=active]:text-[#030500]">Read</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="bg-[151418] text-white">
                    <AllNotifications />
                </TabsContent>
                <TabsContent value="unread">
                    <AllNotifications />
                </TabsContent>
                <TabsContent value="read">
                    <AllNotifications />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Notifications