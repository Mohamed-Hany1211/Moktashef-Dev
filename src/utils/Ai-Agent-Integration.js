import axios from "axios";

export const AiAgentIntegration = async (vulnsArray) => {
    //  - {AiResponse} is the array to be sent to the DB 
    const AiResponse = await axios.post(`http://localhost:5566/vulns_from_search`,vulnsArray);
    if(!AiResponse) return null; 
    return AiResponse;
}



