import '../components/modal.css'
import {useRef} from "react";
import content from "./../localization/content";

function Modal({setModal, deleteTodo, lang}){
    const ref = useRef()
    const onRemoveModal = () => {
        setModal(false);
    }
    const removeModal = (e) => {
        console.log(e.target);
        console.log(e.target);
        // if(ref.current.classList.contains("modal-content")){
        //     setModal(false);
        // }
    }
    return(
        <>
            <div  className="modal">
                <div ref={ref}  className="modal-content">
                    <h1 className="modal-title">{content[lang].modalTitle}</h1>
                    <p className="modal-text">{content[lang].modalText}</p>
                    <div className="buttons">
                        <button onClick={onRemoveModal}>{content[lang].modalCancelBtn}</button>
                        <button onClick={() => deleteTodo()}>{content[lang].modaldeleteBtn}</button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Modal
