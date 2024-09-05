import express  from "express"
import { verifyToken } from "../middlewares/verifytoken.js";
import { createPoll, deletePoll, getAllPolls, getPoll, votePoll } from "../controller/poll.js";


const pollRoutes = express.Router();

pollRoutes.get('/getpoll/:pollId', getPoll );
pollRoutes.get('/getallpolls/', getAllPolls);
pollRoutes.post('/createpoll', verifyToken, createPoll );
pollRoutes.post('/votepoll', verifyToken, votePoll );
pollRoutes.delete('/delete',verifyToken,deletePoll);


export default pollRoutes;