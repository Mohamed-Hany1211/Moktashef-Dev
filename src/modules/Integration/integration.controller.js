import axios from "axios";
import Vulns from '../../../DB/models/vulnerabilities.model.js';


export const IntegrationApi = async (req,res,next) =>{
    // // 1 - get target website url
    // const {TargetUrl} = req.body;
    // // 2 - destructing the user id
    // // const {_id} = req.authUser;
    // // 3 - first request " the first request is for security api "
    // let baseURL = {
    //     "url": TargetUrl,
    // }
    // // 4 - {SecurityResponse} is the array to be sent to the AI api
    // const SecurityResponse = await axios.post(`http://localhost:3000/vulns/getAllVulnsWithUsersDummy`,baseURL);
    // const VulnsFound = SecurityResponse?.data.data;
    // return res.status(200).json({
    //     data:VulnsFound
    // })
    // ========================================================================================================

    // {if required we could perform any logic here}

    // ========================================================================================================
    // let rs = {
    //     "vulnerabilities":[
    //         "[swagger-api] [http] [info] http://localhost:3000/api-docs/swagger.json [paths=\"/api-docs/swagger.json\"]",
    //         "[fingerprinthub-web-fingerprints:qm-system] [http] [info] http://localhost:3000",
    //         "[http-missing-security-headers:referrer-policy] [http] [info] http://localhost:3000",
    //         "[http-missing-security-headers:cross-origin-embedder-policy] [http] [info] http://localhost:3000",
    //         "[http-missing-security-headers:strict-transport-security] [http] [info] http://localhost:3000",
    //         "[http-missing-security-headers:x-permitted-cross-domain-policies] [http] [info] http://localhost:3000",
    //         "[http-missing-security-headers:clear-site-data] [http] [info] http://localhost:3000",
    //         "[robots-txt-endpoint] [http] [info] http://localhost:3000/robots.txt",
    //         ]
    // }
    
    // // 5 - second request " the second request is for the AI api "
    // // 6 - {AiResponse} is the array to be sent to the DB
    // const AiResponse = await axios.post(`http://localhost:4000/vulns_details`,rs);
    // console.log(AiResponse);
    
    // if(!AiResponse.length){
    //     return next({message:'no response from the AI api',cause:400});
    // }
    // return res.stutus(200).json({
    //     response:AiResponse
    // })
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