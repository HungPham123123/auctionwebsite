import React from "react";
import './PromoVideo.css'

const PromoVideo = ({ isOpen, onClose, videoSrc }) => {
    if (!isOpen) return null;
  
    return (
      <div className="video-modal-overlay" onClick={onClose}>
        <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <iframe
            width="1060"
            height="615"
            src="https://www.youtube.com/embed/7D52rxskbt0"
            title="Video"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    );
  };
  
  export default PromoVideo;