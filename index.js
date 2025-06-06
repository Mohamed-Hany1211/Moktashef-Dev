// modules imports
import express from "express";
import cors from 'cors';
import { config } from "dotenv";
// files imports
import {intiateApp} from './src/intiate-app.js';

config({path:'config/dev.config.env'});
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
// app.use(cors());
intiateApp(app,express);