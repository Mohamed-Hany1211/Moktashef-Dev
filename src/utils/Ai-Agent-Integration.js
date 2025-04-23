import axios from "axios";

export const AiAgentIntegration = async (vulnsArray) => {
    //  - {AiResponse} is the array to be sent to the DB 
    const AiResponse = await axios.post(`http://localhost:4000/vulns_details`,vulnsArray);
    if(!AiResponse) return null; 
    return AiResponse;
}



