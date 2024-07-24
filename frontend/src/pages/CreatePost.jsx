import { useRef, useState } from "react";
import { GrGallery } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import SmallLoader from "../components/SmallLoader";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
const CreatePost = ()=>{
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [Btnloading,setLoading] = useState(false);
    const location = useLocation();
    const selectFile= useRef(null);
    const [selectedOption, setSelectedOption] = useState('');


    const handleChange=(e)=>{
        setImage(e.target.files[0]);
        console.log("Image = "+image)
      } 

      const handleSelectChange = (event) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
      };
  
      const handleSubmit= async()=>{
          console.log(title+"\n"+description+"\n"+selectedOption);
          const formData = new FormData();
          try{
            formData.append('title', title);
            formData.append('topic', selectedOption);
            formData.append('body', description);
            formData.append('postImg', image);
            console.log(formData);
            setLoading(true);
            toast.loading("Posting....");
            const response = await axios.post('http://localhost:3000/posts/postWithImg', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log(response.data.post);
            if(response.status==201){
              // dispatch(setPost(response.data.post));
              // dispatch(setUserPost(response.data.post))
              toast.dismiss();
              toast.success("Successfully Posted!")
              setTitle("")
              setDescription("")
              setSelectedOption("")
              setImage(null)
              // getUserData(userInfo.email);
              //   onNewPost()
              console.log(location.state);
              navigate('/');
            }
          } catch (error) {
            toast.dismiss()
            // navigate('/');
            toast.error("Error uploading the post!")
            console.error('Error uploading the post:', error);
          }
          setLoading(false);
          
      }
    return (
        <div className="absolute z-10 bg-[#0005] top-0 bottom-0 backdrop-blur-sm h-full w-full flex justify-center items-center pb-10">
        <div className="w-3/4 bottom-0 overflow-auto bg-[#d5d6b5] shadow-md shadow-current rounded-lg px-6 py-5 biggerTablet:h-5/6">
        <div className="heading flex justify-between">
            <h2 className="text-xl font-bold mb-4 text-[#656923]">Write your thoughts....</h2>
            <button className="hover:bg-black w-5 h-5 rounded-full" onClick={()=>{navigate('/')}}>
                <IoClose className="text-[#656923] m-auto"/>
            </button>
        </div>
        <div className='flex mt-6 px-28 justify-start  '>
<div className='flex  hover:bg-[#808449cf]  items-center px-2 py-1  rounded-full border-[1px] border-black '>
    
    <span className=' rounded-full border-2 border-white'>
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" fill="black" />
    <text x="50%" y="50%" fontSize="18" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" dominantBaseline="middle">q/</text>
   </svg>
</span>
    <select className=' cursor-pointer bg-transparent py-2 px-4   outline-none'  id="options" value={selectedOption} onChange={(e)=>handleSelectChange(e)}>
      
      <option className='bg-[#808449] text-white font-extralight text-lg' value="">Select a Topic</option>
      <option className='bg-[#808449] text-white font-extralight text-lg' value="sports">Sports</option>
      <option className='bg-[#808449] text-white font-extralight text-lg' value="dsa">DSA</option>
      <option className='bg-[#808449] text-white font-extralight text-lg' value="iet">IET</option>
      <option className='bg-[#808449] text-white font-extralight text-lg' value="entertainment">Entertainment</option>
      <option className='bg-[#808449] text-white font-extralight text-lg' value="lifestyle">Lifestyle</option>
      <option className='bg-[#808449] text-white font-extralight text-lg' value="lucknow">Lucknow</option>
    </select>
  
  </div>
</div>


        
        {/* Title Input */}
        <div className="mb-4 ">
          <label htmlFor="title" className="block text-[#656923] font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#656923]"
            placeholder="Write a Specific title"
            required/>
        </div>
        {/* Content Textarea */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-[#656923] font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#656923] h-40 resize-none"
            placeholder="Keep It Relevant"
            required
          />
        </div>
        <div className="mb-4">
            <label htmlFor="title" className="block text-[#656923] font-bold mb-2">
                Image
            </label>
            <div>
                <button  onClick={()=>selectFile.current?.click()} 
                className='flex items-center gap-2 border-2 text-blue-800 rounded-3xl border-blue-800 px-3 py-1 bg bg-blue-300 hover:bg-blue-400' 
                type="button">
                <span>Upload</span><GrGallery/></button>
            </div>
            <input onChange={(e)=>handleChange(e)} accept='image/*' ref={selectFile} type="file" name="media" id="media" hidden/>
        </div>
        {/* Submit Button */}

        <button
          onClick={handleSubmit}
          className="bg-[#656923] hover:bg-[#a9aa88] w-full text-xl text-black font-bold py-2 px-4 rounded focus:outline-none">
          {Btnloading?<SmallLoader/>:"Post"}
        </button>
      </div>
      </div>
    );
}

export default CreatePost;