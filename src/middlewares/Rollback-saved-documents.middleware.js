

/* 
    @param req.savedDocument
    @description => delete the saved documents from DB
*/

export const rollbackSavedDocuments = async (req,res,next)=>{
    if(req.savedDocument){
        console.log('roll back saved documents');
        
        const { model , _id } = req.savedDocument;
        await model.findByIdAndDelete(_id);
    }
}