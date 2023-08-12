import userCSS from "./layout.module.css";



export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}){
    return(
        <>
            <div className={ userCSS.mainContainer }>
                {/* Side bar */}
                <div className={ userCSS.sideBar }>
                    {/* Logo, title and nav bar collapse */}
                    <div className={ userCSS.sideBarTop }>
                        <div className={ userCSS.logoTitle}>
                            <div className={ userCSS.logo }></div>
                            <div className={ userCSS.title }>PARKNEST</div>
                        </div>
                        <div className={ userCSS.collapse }>
                            <i className="fa-solid fa-bars"></i>
                        </div>
                    </div>

                    {/* Divider one */}
                    <div className={ userCSS.divider }></div>

                    {/* Menu name */}
                    <div className={ userCSS.menu }>MENU</div>
                    
                     {/* Divider two */}
                     <div className={ userCSS.divider }></div>

                     {/* Menu options */}
                     <div className={ userCSS.options }>
                        {/* Menu option */}
                        <div className={ userCSS.optionBoxActive }>
                            <div className={ userCSS.optionIcon }></div>
                            <div className={ userCSS.optionText }>Dashbaord</div>
                        </div>

                        {/* Menu option */}
                        <div className={ userCSS.optionBoxInactive }>
                            <div className={ userCSS.optionIconInactive }></div>
                            <div className={ userCSS.optionText }>Plots</div>
                        </div>

                        {/* Menu option */}
                        <div className={ userCSS.optionBoxInactive }>
                            <div className={ userCSS.optionIconInactive }></div>
                            <div className={ userCSS.optionText }>Bookings</div>
                        </div>

                        {/* Menu option */}
                        <div className={ userCSS.optionBoxInactive }>
                            <div className={ userCSS.optionIconInactive }></div>
                            <div className={ userCSS.optionText }>Profile</div>
                        </div>
                     </div>
                </div>

                {/* Right section */}
                <div className={ userCSS.contentSection }>
                    {/* Top nav */}
                    <div className={ userCSS.topNav }>
                        <div className={ userCSS.navTitle }>
                            Dashboard
                        </div>
                    </div>

                    {/* Content box */}
                    <div className={ userCSS.content }>
                        { children }
                    </div>
                </div>
            </div>
        </>
    )
}