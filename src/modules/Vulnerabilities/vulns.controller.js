// files imports
import Vulns from '../../../DB/models/vulnerabilities.model.js';
import { ApiFeatures } from '../../utils/api-features.js';

// -------------------------------------- get all vulnerabilities api -------------------------------------------- //
/*
    1 - destructing the sort condition and filter query from req.query
    2 - applying the api features based on the given data
    3 - getting the vulnerabilities from the database
    4 - return the response
*/
export const getAllVulns = async (req, res, next) => {
    // 1 - destructing the sort condition and filter query from req.query
    const { sort, ...Query } = req.query;
    let features;
    // 2 - applying the api features based on the given data
    if (sort) {
        features = new ApiFeatures(req.query, Vulns.find()).sort(sort)
    } else if (Query) {
        features = new ApiFeatures(req.query, Vulns.find()).filter(Query)
    }
    // 3 - getting the vulnerabilities from the database
    const vulnerabilities = await features.mongooseQuery;
    if (!vulnerabilities) return next({ message: 'an error occour while fetching the vulnerabilities', cause: 500 });
    //  4 - return the response
    return res.status(200).json({
        success: true,
        message: 'vulnerabilities fetched successfully',
        data: vulnerabilities
    })
}


// -------------------------------------- get scan history for specific user -------------------------------------------- //
/*
    1 - destructing the user id from the authUser
    2 - getting the user scan history from the database
    3 - return the response
*/
export const getScanHistoryForSpecificUser = async (req, res, next) => {
    // 1 - destructing the user id from the authUser
    const {_id} = req.authUser;
    // 2 - getting the user scan history from the database
    const userScanHistory = await Vulns.find({requestUserId:_id}).sort({createdAt:-1});
    if(!userScanHistory){
        return next({message: 'an error occour while fetching the vulnerabilities', cause: 500});
    }
    // 3 - return the response
    return res.status(200).json({
        success: true,
        message: 'the scan history fetched successfully',
        data:userScanHistory
    })
}

