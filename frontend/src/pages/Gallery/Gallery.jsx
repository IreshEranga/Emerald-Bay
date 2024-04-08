import { useAuthStore } from "../../store/useAuthStore";
import React, { useState } from 'react';
import NavBar from '../../components/Navbar'; 
import './Gallery.css';


const Gallery = () => {
    const { isAuthenticated, logout, user } = useAuthStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        logout: state.logout,
        user: state.user,
      }));

      const [modalOpen, setModalOpen] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);
    
      const images = [
        { id: 1, src: require('../../assets/IMG_9985.jpg'), category: 'interior' },
        { id: 2, src: require('../../assets/IMG_0219.jpg'), category: 'past' },
        { id: 3, src: require('../../assets/IMG_0500.jpg'), category: 'food' },
        { id: 4, src: require('../../assets/IMG_0236.jpg'), category: 'past' },
        { id: 5, src: require('../../assets/IMG_501.avif'), category: 'food' },
        { id: 6, src: require('../../assets/IMG_9943.jpg'), category: 'interior' },
        { id: 7, src: require('../../assets/IMG_503.jpeg'), category: 'food' },
        { id: 8, src: require('../../assets/IMG_0002.jpg'), category: 'past' },
        { id: 9, src: require('../../assets/IMG_0228.jpg'), category: 'food' },
        { id: 10, src: require('../../assets/IMG_0250.jpg'), category: 'past' },
        { id: 11, src: require('../../assets/foodstock.webp'), category: 'food' },
        { id: 12, src: require('../../assets/IMG_9981.jpg'), category: 'interior' },
        { id: 13, src: require('../../assets/IMG_0004.jpg'), category: 'past' },
        { id: 14, src: require('../../assets/IMG_9975.jpg'), category: 'interior' },
        { id: 15, src: require('../../assets/IMG_0005.jpg'), category: 'past' }
        // Add more images with appropriate src and category
      ];
    
      const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
      };
    
      return (

        <div style={{backgroundColor:'black'}}>
    
              <NavBar />
        <div className="gallery-container"><br></br>
        <h2>SOME OF OUR HIGHLIGHTS</h2>
        <div className="gallery">
          <div className={`modal ${modalOpen ? 'open' : ''}`} onClick={closeModal}>
            {selectedImage && (
              <img src={selectedImage.src} alt="Selected" className="modal-content" />
            )}
          </div>
          <div className="gallery-grid">
            {images.map((image) => (
              <div
                key={image.id}
                className={`gallery-item ${image.category.toLowerCase()}`}
                onClick={() => openModal(image)}
              >
                <img src={image.src} alt={`Image ${image.id}`} className="gallery-image" />
              </div>
            ))}
          </div><br></br>
        </div>
        </div>
        </div>
     );
};

export default Gallery;
    

        
        
      
        {/*<div className="container d-flex flex-column align-items-center">
          {!isAuthenticated ? (
            <div className="flex-row d-flex justify-content-center mt-5 w-100">
              <button className="btn btn-primary col-2 m-2">
                <a href="/login" className="text-white">
                  Login
                </a>
              </button>
            </div>
          ) : (
            <div className="flex-row d-flex justify-content-center mt-5 w-100">
              <button className="btn btn-primary col-2 m-2">
                <a
                  href={user.role === "ADMIN" ? "/admin" : "/supplier"}
                  className="text-white"
                >
                  Dashboard
                </a>
              </button>
              <button onClick={logout} className="btn btn-primary col-2 m-2">
                Logout
              </button>
            </div>
          )}   
          
          </div>*/}
    
   /* <div className="welcome">
              <h1>EMERALD BAY RESTAURANT</h1>
              <h3>Bringing the authentic Sri Lankan culinary experience to the Heart of Mirissa.🌴 </h3>
            </div>
            
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  
    </div>*/