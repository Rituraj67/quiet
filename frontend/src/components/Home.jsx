import React, { useEffect, useState } from 'react'
import Createpost from './Createpost'
import { useDispatch, useSelector } from 'react-redux'
import Posts from './Posts';
import axios from 'axios';
import loading from '../redux/loading';
import setPost  from '../redux/Post';


const Home = () => {

  const posts = useSelector(state=>state.post.posts);
  const isLogin= useSelector(state=> state.login.value);
  const dispatch = useDispatch();
  
  console.log(posts);
  return (
    <div className=' h-full overflow-auto border-x-2 border-black pl-16'>
        
        {isLogin && <Createpost/>}
        <div className='bg-black h-[1px]'></div>

        <div className="post ">
        {posts?.map((post)=>{
          
          return<>
          <Posts key={post.id} username={post.username} title={post.title} body={post.body} media={post.img}/>
          <div className='bg-black h-[1px]'></div>

          </> 

        })}

        </div>

    </div>
  )
}

export default Home
