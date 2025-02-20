// modules imports
import cors from 'cors';
// files imports
import db_connection from '../DB/DB_Connection.js';
import * as routers from './index.routes.js';
import { globalResponses } from './middlewares/global-responses.js';
import {rollbackUploadedFiles} from './middlewares/Rollback-uploaded-files.middleware.js';
import {rollbackSavedDocuments} from './middlewares/Rollback-saved-documents.middleware.js';

export const intiateApp = (app,express) =>{
    const port = process.env.PORT;
    app.use(express.json());
    app.use('/user',routers.UserRouter);
    app.use('/vulns',routers.VulnsRouter);
    app.use(globalResponses,rollbackUploadedFiles,rollbackSavedDocuments);
    app.use(cors());
    db_connection();
    app.listen(port,()=>{console.log(`the server is running on port ${port}`);
    });
}