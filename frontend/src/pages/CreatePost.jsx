import { useRef, useState, useEffect } from "react";
import { GrGallery } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import SmallLoader from "../components/SmallLoader";
import toast from "react-hot-toast";
import baseAddress from "../utils/localhost";
import axios from "axios";
import { useSelector } from "react-redux";
import imageCompression from 'browser-image-compression';

const CreatePost = ({ setShowCP, onNewPost, roomTitle, setPost }) => {

  const createPostRef = useRef(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [Btnloading, setLoading] = useState(false);
  const location = useLocation();
  const selectFile = useRef(null);

  const [selectedOption, setSelectedOption] = useState('');
const [error, seterror] = useState("")
  const titleLimit = 300;
  const [titleLen, setTitleLen] = useState(0)


  const handleTitleChange = (e) => {
    let input = String(e.target.value).slice(0, 300);
    seterror("")
    setTitle(input)
    setTitleLen((input.length))
  }



  const handleChange = async (e) => {
    const file = e.target.files[0];
  
    // Check if file exists
    if (!file) return;
  
    // Check file size
    if (file.size <= 3 * 1024 * 1024) {
      // File size is less than or equal to 3MB, no need to compress
      setImage(file);
      return;
    }
  
    // Compression options
    const options = {
      maxSizeMB: 3,
      useWebWorker: true,
    };
  
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(compressedFile)
      setImage(compressedFile);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    // console.log(title + "\n" + description + "\n" + selectedOption);

    if(description.length==0){
      seterror('*Description cannot be empty')
      return
    }
    const formData = new FormData();
    try {
      formData.append('title', title);
      formData.append('topic', selectedOption);
      formData.append('body', description);
      formData.append('postImg', image);

      if (roomTitle) formData.append('subCommunity', roomTitle);

      setLoading(true);
      toast.loading("Posting....");
      const response = await axios.post(`${baseAddress}posts/postWithImg`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (setPost) {
        console.clear();
        setPost(response.data.post);
      }
      if (response.status == 201) {
        toast.dismiss();
        toast.success("Successfully Posted!")
        setTitle("")
        setDescription("")
        setSelectedOption("")
        setImage(null)
        onNewPost()
        setShowCP(false)
      }
    } catch (error) {
      toast.dismiss()
      // setShowCP(false);
      toast.error(error.response.data.msg);
    }
    setLoading(false);


  }

  const handleClickOutside = (event) => {

    if (createPostRef.current && !createPostRef.current.contains(event.target)) {
      setShowCP(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 

  return (
    <div className="fixed z-40 bg-[#0005] top-0 left-0 backdrop-blur-sm min-h-screen min-w-full  pb-10">
      <div ref={createPostRef} className=" absolute w-[95%] xxs:w-[85%] xs:w-[75%] sm:w-[60%] md:w-[50%] left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] overflow-auto bg-[#d5d6b5] shadow-md shadow-current rounded-lg px-6 py-5 ">
        <div className="heading flex justify-between">
          <h2 className="text-xl font-bold mb-4 text-[#656923]">Write your thoughts....</h2>
          <button className="hover:bg-black w-5 h-5 rounded-full" onClick={() => { setShowCP(false) }}>
            <IoClose className="text-[#656923] m-auto" />
          </button>
        </div>
        {!roomTitle ? <div className='flex mt-6 px-28 justify-start  '>
          <div className='flex  hover:bg-[#808449cf]  items-center px-2 py-1  rounded-full border-[1px] border-black '>

            <span className=' rounded-full border-2 border-white'>
              <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="black" />
                <text x="50%" y="50%" fontSize="18" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" dominantBaseline="middle">q/</text>
              </svg>
            </span>
            <select className=' cursor-pointer bg-transparent  px-2 sm:px-4   outline-none' id="options" value={selectedOption} onChange={(e) => handleSelectChange(e)}>

              <option className='bg-[#808449] text-white font-extralight  1_5md:text-lg' value="">Select a Topic</option>
              <option className='bg-[#808449] text-white font-extralight  1_5md:text-lg' value="sports">Sports</option>
              <option className='bg-[#808449] text-white font-extralight  1_5md:text-lg' value="dsa">DSA</option>
              <option className='bg-[#808449] text-white font-extralight  1_5md:text-lg' value="iet">IET</option>
              <option className='bg-[#808449] text-white font-extralight  1_5md:text-lg' value="entertainment">Entertainment</option>
              <option className='bg-[#808449] text-white font-extralight  1_5md:text-lg' value="lifestyle">Lifestyle</option>
              <option className='bg-[#808449] text-white font-extralight  1_5md:text-lg' value="lucknow">Lucknow</option>
            </select>

          </div>
        </div>
          : <></>
        }


        {/* Title Input */}
        <div className="mb-4 flex flex-col ">
          <div className=" flex items-center justify-between">
            <label htmlFor="title" className="block text-[#656923] font-bold mb-2">
              Title
            </label>
            <div className=" text-xs font-mono">{titleLen}/{titleLimit}</div>

          </div>
          <textarea
            spellCheck="false"
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e)}
            className="w-full p-2 resize-none border h-20 border-gray-300 rounded-md focus:outline-none focus:border-[#656923]"
            placeholder="Write a Specific title"
            required />
        </div>
        {/* Content Textarea */}
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="content" className="block text-[#656923] font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            spellCheck="false"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              seterror('')
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#656923] h-40 resize-none"
            placeholder="Keep It Relevant"
            required
          />

          <span className=" text-red-500 text-xs pl-2">{error}</span>

        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-[#656923] font-bold mb-1">
            Image
          </label>
          <div className=" text-sm text-blue-900 line-clamp-1 ml-2 break-words mb-2 underline cursor-not-allowed">{image?.name}</div>
          <div>
            <button onClick={() => selectFile.current?.click()}
              className='flex items-center gap-2 border-2 text-blue-800 rounded-3xl border-blue-800 px-3 py-1 bg bg-blue-300 hover:bg-blue-400'
              type="button">
              <span>Upload</span><GrGallery /></button>
          </div>
          <input onChange={(e) => handleChange(e)} accept='image/*' ref={selectFile} type="file" name="media" id="media" hidden />
        </div>
        {/* Submit Button */}

        <button
          onClick={() => handleSubmit()}
          className="bg-[#656923] flex justify-center hover:bg-[#a9aa88] w-full text-xl text-black font-bold py-2 px-4 rounded focus:outline-none">
          {Btnloading ? <span className=""><SmallLoader /></span> : "Post"}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;