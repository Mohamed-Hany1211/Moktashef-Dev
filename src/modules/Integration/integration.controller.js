import axios from "axios";
import Vulns from '../../../DB/models/vulnerabilities.model.js';
import { AiAgentIntegration } from "../../utils/Ai-Agent-Integration.js";


export const IntegrationApi = async (req, res, next) => {
    // // 1 - get target website url
    // const {TargetUrl} = req.body;
    // 2 - destructing the user id
    const { _id } = req.authUser;
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

    let rs = {
        "vulnerabilities": ["[juiceshop-admin-priv-escalation] [http] [high] http://localhost:3000/api/Users/1",
            "[juiceshop-ftp-exposure] [http] [medium] http://localhost:3000/ftp",
            "[juice-shop-sensitive-legal-file] [http] [medium] http://localhost:3000/ftp/legal.md",
            "[juice-shop-sqli-login-bypass] [http] [high] http://localhost:3000/#/login"]
    }
    
    // 5 - get Ai results 
    const Airesponse = await AiAgentIntegration(rs);
    // 6 - creating the object to be sent to DB
    const vulnsObject = {
        requestUserId: _id,
        vulnerabilities: Airesponse.data.vulnerabilities
    }
    // 7 - sending the object to DB and create the new document
    const newVulnsDocument = await Vulns.create(vulnsObject);
    if (!newVulnsDocument) {
        return next({ message: 'failed to create a new Vulns document in the DB', cause: 400 });
    }
    // 8 - returning the response 
    return res.status(201).json({
        success: true,
        message: 'Vulnerabilities successfully created in the DB',
        data: newVulnsDocument
    })
}