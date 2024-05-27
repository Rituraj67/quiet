import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loading } from '../redux/loading';
import { GrGallery } from "react-icons/gr";
import dp from '../assets/dummydp.png';
import axios from 'axios';
const Createpost = () => {
    const userInfo = useSelector((state) => state.user.userInfo);
    const selectFile= useRef(null);
    // const [post, setPost] = useState({title:"", body:"", media:""})
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    
     const handleChange=(e)=>{
        setImage(e.target.files[0]);
     }


    const handleSubmit= async()=>{
        console.log(title+"\n"+description+"\n"+image);
        // e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', description);
        formData.append('postImg', image);
        try {
          dispatch(loading())
          const response = await axios.post('http://localhost:3000/posts/postWithImg', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Post created:', response.data);
          dispatch(loading())
        } catch (error) {
          console.error('Error uploading the post:', error);
        }
        
    }
  return (
    <div  className=' p-8 flex relative justify-center gap-4'>
      <div className=''>
        <img src={userInfo && userInfo.dp ? userInfo.dp : dp}
              alt="Profile"
              className="w-24 h-24 rounded-full   bg-white "  />
      </div>
      <div className='w-[60%] '>
            <div className="inputs flex flex-col w-full gap-2 ">
                <input onChange={(e) => setTitle(e.target.value)} value={title}  className=' bg-[#e2e4c6] border rounded-md w-full outline-none focus:border-b-black p-2 ' type="text" name="title" id="title" placeholder='Title' required/>
                <textarea  onChange={(e) => setDescription(e.target.value)} required value={description}  className=' bg-[#e2e4c6] border  rounded-md w-full outline-none focus:border-b-black p-2 ' name="body" id="body" placeholder='Body'></textarea>
                <div><button  onClick={()=>selectFile.current?.click()} className='flex items-center gap-2 border-2 text-blue-800 rounded-3xl border-blue-800 px-3 py-1 bg bg-blue-300 hover:bg-blue-400' type="button"><span>Upload</span><GrGallery/></button></div>
                <input onChange={(e)=>handleChange(e)} accept='image/*' ref={selectFile} type="file" name="media" id="media" hidden/>
            </div>
            <div className='flex justify-center'>
                <button onClick={()=>handleSubmit()} className='border-2 border-[#656923] py-1 px-4 bg-[#939851] rounded-3xl hover:shadow-lg hover:text-white' type="submit">Post</button>
            </div>
      </div>
    </div>)

}

export default Createpost
