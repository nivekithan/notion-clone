import { ReactNode } from "react"

export type SidebarProps = {
    children : ReactNode
}




export const Sidebar = ({children} : SidebarProps) => {

    return (
        <section className="bg-black-primary h-full inline-flex flex-col gap-y-2 ">
            {children}
        </section>
    )
}