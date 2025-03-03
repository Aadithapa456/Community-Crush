import SideBar from "@/components/SideBar.jsx";
import {Outlet} from "react-router-dom";
import EventModal from "@/components/EventModal.jsx";
import {useContext} from "react";
import {ModalContext} from "@/Context/ModalContext.jsx";

const MainLayout = () => {
    const {modalVisible} = useContext(ModalContext);
    return (
        <>
            <div className="flex">
                <SideBar/>
                <div className="flex-1 ml-64">
                    <Outlet/>
                </div>
            </div>
            {modalVisible && <EventModal/>}
        </>
    );
};

export default MainLayout;