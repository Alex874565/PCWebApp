import React, { useEffect, useState } from "react";
import "./home.css";
import "../../atoms/navBar/navBar.css";
import "../../atoms/slideshow/slideshow.css";
import { getPosts } from "../../services/api/getPosts";
import PostCard from "../../atoms/postCard/postCard";
import Navbar from "../../atoms/navBar/navBar";
import Slideshow from "../../atoms/slideshow/slideshow";
import AI from "../../atoms/AI/AI";

const images = [
  'https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/87b026b9-d875-44b3-b42b-68c10e3bd960._CR0%2C0%2C3000%2C600_SX1500_.jpg',
  'https://www.digitalgames.ro/images/2016/10/The-Sims-4-City-Living-Logo-HD.jpg',
  'https://gepig.com/game_cover_bg_1190w/1844.jpg',
];

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const handleGetPosts = async () => {
      try {
        const posts = await getPosts();
        console.log(posts);
        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
    };

    handleGetPosts();
  }, [counter]);

  return (
    <div>
      <Navbar />
      <div className="home">
        
        <Slideshow images={images} /> 
        <h1>List of Posts:</h1>
        {posts.map((post) => (
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))}
      </div>
      {console.log("Rendering AI")}
    </div>
  );
};

export default Home;
