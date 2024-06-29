import axios from "axios"

export async function getAlert() {
    
    try {
        const response = await axios.get(
            `https://alert.klr.kr/api/v1/alerts`
        )
        return response.data;
    }
    catch {
        throw Error;
    }
}