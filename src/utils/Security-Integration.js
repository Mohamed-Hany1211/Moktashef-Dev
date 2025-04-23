import axios from "axios";

export const SecurityIntegration = async (baseURL) => {
    //  - {SecurityResponse} is the array to be sent to the AI Agent 
    const SecurityResponse = await axios.post(`http://localhost:5000/scan`,baseURL);
    if(!SecurityResponse) return null; 
    return SecurityResponse;
}



