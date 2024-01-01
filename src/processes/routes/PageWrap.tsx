import Header from "../../widgets/Header";
import Footer from "../../widgets/Footer";
import { Outlet } from "react-router-dom";
import Banner from "../../shared/ui/Banner";

export default function PageWrap() {
    return(
        <>
            <Header />
            <main className="container">
                <div className="row">
                    <div className="col">
                        <Banner />
                        <Outlet />
                    </div>
                </div>
            </main>            
            <Footer />
        </>
    )
}