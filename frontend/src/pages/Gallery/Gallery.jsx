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
        { id: 1, src: require('../../assets/IMG_0219.jpg'), category: 'Food' },
        { id: 2, src: require('../../assets/IMG_9985.jpg'), category: 'Interior' },
        { id: 3, src: require('../../assets/IMG_0500.jpg'), category: 'Food' },
        { id: 4, src: require('../../assets/IMG_0236.jpg'), category: 'Food' },
        { id: 5, src: require('../../assets/IMG_501.avif'), category: 'Interior' },
        { id: 6, src: require('../../assets/IMG_9943.jpg'), category: 'Food' },
        { id: 7, src: require('../../assets/IMG_503.jpeg'), category: 'Food' },
        { id: 8, src: require('../../assets/IMG_9975.jpg'), category: 'Food' },
        { id: 9, src: require('../../assets/IMG_9995.jpg'), category: 'Food' },
        { id: 10, src: require('../../assets/IMG_0250.jpg'), category: 'Food' },
        { id: 11, src: require('../../assets/IMG_0228.jpg'), category: 'Food' },
        { id: 12, src: require('../../assets/IMG_9981.jpg'), category: 'Food' }
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
        <div className="gallery-container">
        <h2>SOME OF OUR HIGHLIGHTS</h2><br></br>
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
          </div>
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