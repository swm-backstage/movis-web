import { useOutletContext } from "react-router-dom"


export default function EventNavContainer(){

    return useOutletContext().BodyComponent;
}