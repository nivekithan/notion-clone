import { ReactNode } from "react"

export type SidebarProps = {
    children : ReactNode
}




export const Sidebar = ({children} : SidebarProps) => {

    return (
        <section className="bg-grey-primary h-full w-40">
            {children}
        </section>
    )
}