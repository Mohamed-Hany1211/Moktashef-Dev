import axios from "axios";
import Vulns from '../../../DB/models/vulnerabilities.model.js';

export const IntegrationApi = async (req,res,next) =>{
    // 1 - get target website url
    const {TargetUrl} = req.body;
    // 2 - destructing the user id
    // const {_id} = req.authUser;
    // 3 - first request " the first request is for security api "
    // 4 - {SecurityResponse} is the array to be sent to the AI api
    const SecurityResponse = await axios.post(`http://localhost:3000/vulns/getAllVulnsWithUsersDummy`,TargetUrl);
    const VulnsFound = SecurityResponse?.data.data;
    return res.status(200).json({
        data:VulnsFound
    })
    // ========================================================================================================

    // {if required we could perform any logic here}

    // ========================================================================================================
    // 5 - second request " the second request is for the AI api "
    // 6 - {AiResponse} is the array to be sent to the DB
    // const AiResponse = await axios.post(`https://api.example.com/integration`,SecurityResponse);
    // if(!AiResponse.length){
    //     return next({message:'no response from the AI api',cause:400});
    // }

    // 7 - db
    // const vulnsObject = {
    //     requestUserId:_id,
    //     vulnerabilities:AiResponse
    // }

    // const newVulnsDocument = await Vulns.create(vulnsObject);
    // if(!newVulnsDocument){
    //     return next({message:'failed to create a new Vulns document in the DB',cause:400});
    // }

    // return res.status(201).json({
    //     success:true,
    //     message:'Vulnerabilities successfully created in the DB',
    //     data:newVulnsDocument
    // })
}