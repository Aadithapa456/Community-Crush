import {createContext, useState} from "react";

export const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    return (
        <ModalContext.Provider value={{modalVisible, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    );
}
