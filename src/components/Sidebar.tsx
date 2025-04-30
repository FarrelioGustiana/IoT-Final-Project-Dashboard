import { Home, Settings, ChevronLeft, Activity, Info } from "react-feather"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="md:hidden fixed inset-0 bg-primary/80 z-10" onClick={toggleSidebar}></div>}

      <aside
        className={`
          fixed md:static z-20 h-full bg-secondary border-r border-border transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:w-16 md:translate-x-0"}
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          <h2 className={`font-bold text-lg ${!isOpen && "md:hidden"}`}>IoT Monitor</h2>
          <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-accent/20 text-text-primary">
            <ChevronLeft className={`w-5 h-5 transition-transform ${!isOpen && "md:rotate-180"}`} />
            <span className="sr-only">Toggle sidebar</span>
          </button>
        </div>

        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 p-2 rounded-lg bg-accent text-text-primary">
                <Home className="w-5 h-5" />
                <span className={!isOpen ? "md:hidden" : ""}>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/20 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Activity className="w-5 h-5" />
                <span className={!isOpen ? "md:hidden" : ""}>Analytics</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/20 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className={!isOpen ? "md:hidden" : ""}>Settings</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/20 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Info className="w-5 h-5" />
                <span className={!isOpen ? "md:hidden" : ""}>About</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
