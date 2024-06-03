import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Image1 from './Images/RW9989_web.jpg';
import Image2 from './Images/1739840-2000x1500.jpg';
import Image3 from './Images/istockphoto-1317323736-2048x2048.jpg';
import axios from "axios";

const carouselData = [
  {
    image: Image1,
    caption: "WHAT DOES YOUR PET REALLY THINK ABOUT YOU?",
    description: "By Maddison Barnett / In Culture / 2 Comment"
  },
  {
    image: Image2,
    caption: "Coffee may be served in a variety of ways",
    description: "By Maddison Barnett / In Politics / Add comment"
  },
  {
    image: Image3,
    caption: "What could possibly go wrong?",
    description: "By Maddison Barnett / In Humans / 3 Comments"
  }
];

const HomeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBlogPosts()
  }, []);

  const loadBlogPosts = () => {
    axios.get('https://apitest.reachstar.io/blog/list')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Fetch operation failed:', error);
      });
  };

  const onSelectHandler = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleReadNow = (id) => {
    console.log(`Reading post with ID ${id} now...`);
    window.location.href = `/blog/get/${id}`;
  };

  const handleReadLater = (id) => {
    console.log(`Saving post with ID ${id} for later reading...`);
  };

  return (
    <div>
      <Carousel
        activeIndex={activeIndex}
        onSelect={onSelectHandler}
        style={{ height: '100%', width: '100%' }}
      >
        {carouselData.map((item, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={`slide ${idx + 1}`}
              style={{ maxHeight: 'calc(100vh - 120px)', objectFit: 'cover' }}
            />
            <Carousel.Caption style={{ top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
              <h3 className="title-1" style={{ fontSize: '3rem', textTransform: 'uppercase' }}>{item.caption}</h3>
              <p>{item.description}</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="button1" type="button" onClick={() => handleReadNow(item.id)}>READ ON</button>
                <button className="button2" type="button" onClick={() => handleReadLater(item.id)}>READ LATER</button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="App" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1>Blog Posts</h1>
        <div className="blog-list">
          {posts.map(post => (
            <div className="blog-post" style={{ marginBottom: '20px' }} key={post.id}>
              <h2 style={{ fontSize: '4rem', color: '#930587' }}>{post.title}</h2>
              <p style={{ fontSize: '2rem' }} dangerouslySetInnerHTML={{__html : post.description }}></p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="button1" type="button" onClick={() => handleReadNow(post.id)}>More Details</button>
                <button className="button2" type="button" onClick={() => handleReadLater(post.id)}>READ LATER</button>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;


