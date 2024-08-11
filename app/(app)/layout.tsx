
import Navbar from "@/components/NavBar";

export default function Layout({ children } : {children : React.ReactNode}) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}