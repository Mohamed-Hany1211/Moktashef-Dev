// files imports
import Vulns from '../../../DB/models/vulnerabilities.model.js';
import { ApiFeatures } from '../../utils/api-features.js';
// -------------------------------------- add vulnerabilities api for development test only -------------------------------------------- //
/*
    1 - destructing the required data from the body
    2 - reskLevel check
    3 - creating the new vulnerability object
    4 - creating the new vulnerability document
    5 - returning the response
*/
export const addVuln = async (req, res, next) => {
    // 1 - destructing the required data from the body
    const {
        requestUserId,
        vulnerabilities
    } = req.body;
    // 3 - creating the new vulnerability object
    const vulnObject = {
        requestUserId,
        vulnerabilities
    }
    // 4 - creating the new vulnerability document
    const newVuln = await Vulns.create(vulnObject);
    if (!newVuln) {
        return next({ message: 'Failed to add vulnerability', status: 500 });
    }

    // 5 - returning the response
    res.status(201).json({
        success: true,
        message: 'Vulnerability added successfully',
        data: newVuln
    });
}

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

*/
export const getScanHistoryForSpecificUser = async (req, res, next) => {
    const {_id} = req.authUser;
    const userScanHistory = await Vulns.find({requestUserId:_id});
    if(!userScanHistory){
        return next({message: 'an error occour while fetching the vulnerabilities', cause: 500});
    }
    return res.status(200).json({
        success: true,
        message: 'the scan history fetched successfully',
        data:userScanHistory
    })
}