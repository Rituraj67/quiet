import express from 'express'
import { acceptJoiningRequest, addUser, CreateRoom, deleteRoom, filterName, getAllRoom, getBulk, getNotJoinedRoom, getRoom, leaveRoom, sendJoiningRequest, showRoom, updateRoom } from '../controller/rooms.js';
import { verifyToken } from '../middlewares/verifytoken.js';
import { upload } from '../middlewares/multer.js';

const roomsRouter = express.Router()

roomsRouter.post('/create',verifyToken,upload.single('roomImg'),CreateRoom);
roomsRouter.post('/updatedp',verifyToken,upload.single('roomImg'),updateRoom);
roomsRouter.post('/updatebgImg',verifyToken,upload.single('bgImg'),updateRoom);
roomsRouter.post('/update',verifyToken,updateRoom);
roomsRouter.post('/delete',verifyToken,deleteRoom);


roomsRouter.post('/join',verifyToken,addUser)
roomsRouter.post('/leave/:roomId',verifyToken,leaveRoom);

roomsRouter.post('/addUserinRoom/:username',verifyToken,sendJoiningRequest);
roomsRouter.post('/acceptJoiningRequest',verifyToken,acceptJoiningRequest);

roomsRouter.get('/titleNameIsUnique',verifyToken,filterName)
roomsRouter.get('/getBulk',verifyToken,getBulk)     //Use for search
roomsRouter.get('/getRoom/:title',verifyToken,getRoom)
roomsRouter.get('/showRoom/:title',verifyToken,showRoom);
roomsRouter.get('/getAllRoom/:userID',verifyToken,getAllRoom);
roomsRouter.get('/notJoinedRoom',verifyToken,getNotJoinedRoom);
// roomsRouter.get('/getPosts',verifyToken,getPost);
// roomsRouter.get("/getAPost/:title/:id",verifyToken,getAPost);




export default roomsRouter;