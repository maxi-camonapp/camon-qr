import { Home, ListCollapse, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'wouter'
import CreateQRModal from './CreateQRModal'

const SidebarItem = ({ to, icon, text }) => {
    return (
        <Link href={to} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            {icon}
            <span className="ms-3">{text}</span>
        </Link>
    )
}

const ITEMS = [
    {
        icon: <Home />,
        to: '/',
        text: 'Inicio'
    },
    {
        icon: <ListCollapse />,
        to: 'qrs-list',
        text: 'Mis QRs'
    }
]


const Sidebar = () => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <button onClick={()=>setOpen(!open)} aria-controls="default-sidebar" type="button" className="fixed items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-50">
                <span className="sr-only">Open sidebar</span>
                {!open ? <Menu/> : <X/>}
            </button>
            <aside className={`fixed sm:relative top-0 left-0 z-40 w-64 h-screen transition-transform ${open?'translate-x-0':'-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 pt-14 sm:pt-10">
                    <ul className="space-y-2 font-medium flex flex-col h-full">
                        {ITEMS.map(item => <li key={item.to}>
                            <SidebarItem {...item} />
                        </li>)}
                        <li className='bottom-3 w-full h-full flex items-end'>
                            <CreateQRModal/>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar