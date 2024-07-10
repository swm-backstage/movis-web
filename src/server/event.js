import axios from "axios"
import mockEventList from "./mock/mockEventList.json"

export async function getEventList() {
    
    return mockEventList;
}