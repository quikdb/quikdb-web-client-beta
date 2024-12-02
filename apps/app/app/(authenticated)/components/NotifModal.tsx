import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@repo/design-system/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Bell } from "lucide-react"
import Link from "next/link"


const NotifModal = () => {
    const empty = false

    return (
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
                <div className="bg-[#181818] rounded-full p-2 text-gray-400"><Bell size={18} /></div>
            </DialogTrigger>
            <DialogContent className="s:max-w-[425px] bg-[#111015] text-white border-[#242527] font-satoshi_regular translate-x-[55%] top- h-[75vh">
                <DialogHeader>
                    <DialogTitle className="font-satoshi_medium">Notifications</DialogTitle>
                </DialogHeader>
                <hr className="border-gray-400" />
                {empty ? <div className="flex flex-col justify-center items-center gap-10 h-[60vh]">
                    <div className="flex flex-col items-center gap-3">
                        <img src="/images/notif.png" alt="notif" />
                        <p className="text-lg">No notifications yet</p>
                        <p className="text-sm font-light text-gray-400">Your notifications will apperar here.</p>
                    </div>
                </div>
                    :
                    <div className="flex flex-col gap-5 py-4 text-base">
                        <div className="border-b border-b-[#1D1D1D] pb-4">
                            <div className="grid gap-2">
                                <p className="font-satoshi_light">Login Successful</p>
                                <p className="text-sm text-gray-400">You’ve successfully logged in from a new device. If this wasn’t you, please secure your account.</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400 mt-3">
                                <p className="text-[#40E39D]">Dismiss</p>
                                <p>12 mins ago</p>
                            </div>
                        </div>
                        <div className="border-b border-b-[#1D1D1D] pb-4">
                            <div className="grid gap-2">
                                <p className="font-satoshi_light">Login Successful</p>
                                <p className="text-sm text-gray-400">You’ve successfully logged in from a new device. If this wasn’t you, please secure your account.</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400 mt-3">
                                <p className="text-[#40E39D]">Dismiss</p>
                                <p>12 mins ago</p>
                            </div>
                        </div>
                        <div className="border-b border-b-[#1D1D1D] pb-4">
                            <div className="grid gap-2">
                                <p className="font-satoshi_light">Login Successful</p>
                                <p className="text-sm text-gray-400">You’ve successfully logged in from a new device. If this wasn’t you, please secure your account.</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400 mt-3">
                                <p className="text-[#40E39D]">Dismiss</p>
                                <p>12 mins ago</p>
                            </div>
                        </div>
                        <div className="border-b border-b-[#1D1D1D] pb-4">
                            <div className="grid gap-2">
                                <p className="font-satoshi_light">Login Successful</p>
                                <p className="text-sm text-gray-400">You’ve successfully logged in from a new device. If this wasn’t you, please secure your account.</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400 mt-3">
                                <p className="text-[#40E39D]">Dismiss</p>
                                <p>12 mins ago</p>
                            </div>
                        </div>


                        <div className="mt-3 flex justify-between text-sm">
                            <p>Mark all as read</p>
                            <Link href="notifications">
                                <DialogClose className="text-[#40E39D]">See all</DialogClose>
                            </Link>
                        </div>
                    </div>
                }

            </DialogContent>
        </Dialog>
    )
}

export default NotifModal