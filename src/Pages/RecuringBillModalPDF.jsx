import {React ,useState,useEffect}from "react";

function RecuringBillPDF(selectedItem){
            const [isVisible, setIsVisible] = useState(true);
            // const cardRef = useRef(null);
        
            useEffect(() => {
                setIsVisible(true)
            }, [selectedItem])
    
    return(
        <>
        <div>
        {isVisible &&
        <div>
<p>{selectedItem.Invoices}</p>
</div>
                }
            </div> 
        </>
    )
}
export default RecuringBillPDF;