import { Carousel } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaSnapchat,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

import demoVideo from "./video/slider.mp4";

const carouselItems = [
  { id: 1, video: demoVideo },
  { id: 2, video: demoVideo },
];

const socialLinks = [
  { icon: <FontAwesomeIcon icon={faXTwitter} size="lg" />, link: "https://x.com/digilasersa" },
  { icon: <FaInstagram size={25} />, link: "https://www.instagram.com/digilasersa" },
  { icon: <FaLinkedin size={25} />, link: "https://www.linkedin.com/company/digilasersa" },
  { icon: <FaYoutube size={25} />, link: "https://youtube.com/@digilaserSa" },
  { icon: <FaSnapchat size={25} />, link: "https://www.snapchat.com/add/digilasersa" },
  { icon: <FaTiktok size={25} />, link: "https://www.tiktok.com/@digilasersa" },
  { icon: <FaWhatsapp size={25} />, link: "http://wa.me/966571978888" },
];

const FadeCarousel = () => {
  const videoRefs = useRef([]);
  const [videoStates, setVideoStates] = useState(
    carouselItems.map(() => ({ currentTime: 0, duration: 0, isDragging: false }))
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // One-time reload
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  const handleTimeUpdate = (index) => {
    if (!videoStates[index].isDragging) {
      const currentVideo = videoRefs.current[index];
      setVideoStates((prev) => {
        const updated = [...prev];
        updated[index].currentTime = currentVideo.currentTime;
        return updated;
      });
    }
  };

  const handleLoadedMetadata = (index) => {
    const currentVideo = videoRefs.current[index];
    setVideoStates((prev) => {
      const updated = [...prev];
      updated[index].duration = currentVideo.duration;
      return updated;
    });
  };

  const handleProgressClick = (e, index) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const currentVideo = videoRefs.current[index];
    currentVideo.currentTime = percentage * currentVideo.duration;
  };

  const handleDrag = (e, index) => {
    if (videoStates[index].isDragging) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const posX = e.clientX - rect.left;
      let percentage = posX / rect.width;
      percentage = Math.max(0, Math.min(1, percentage));
      const currentVideo = videoRefs.current[index];
      currentVideo.currentTime = percentage * currentVideo.duration;
      setVideoStates((prev) => {
        const updated = [...prev];
        updated[index].currentTime = currentVideo.currentTime;
        return updated;
      });
    }
  };

  const startDrag = (index) => {
    setVideoStates((prev) => {
      const updated = [...prev];
      updated[index].isDragging = true;
      return updated;
    });
  };

  const stopDrag = (index) => {
    setVideoStates((prev) => {
      const updated = [...prev];
      updated[index].isDragging = false;
      return updated;
    });
  };

  return (
    <Box sx={{ mt: { xs: "100px" } }}>
      <Carousel
        fade
        nextIcon={<span className="carousel-control-next-icon" style={{ backgroundColor: "black" }} />}
        prevIcon={<span className="carousel-control-prev-icon" style={{ backgroundColor: "black" }} />}
      >
        {carouselItems.map((item, index) => (
          <Carousel.Item key={item.id}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="d-block w-100"
              src={item.video}
              autoPlay
              loop
              muted
              playsInline
              controls
              onTimeUpdate={() => handleTimeUpdate(index)}
              onLoadedMetadata={() => handleLoadedMetadata(index)}
              style={{
                objectFit: "cover",
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)",
              }}
            />
       
            {/* Time Display */}
            <Box sx={{ color: "white", textAlign: "center", mt: 1 }}>
              <Typography variant="body2">
                {Math.floor(videoStates[index].currentTime / 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {Math.floor(videoStates[index].currentTime % 60)
                  .toString()
                  .padStart(2, "0")}{" "}
                /{" "}
                {Math.floor(videoStates[index].duration / 60)
                  .toString()
                  .padStart(2, "0")}
                :
                {Math.floor(videoStates[index].duration % 60)
                  .toString()
                  .padStart(2, "0")}
              </Typography>
            </Box>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Social Media Icons */}
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 2,
          zIndex: 1200,
          pl: 2,
        }}
      >
        {socialLinks.map(({ icon, link }, index) => (
          <a key={index} href={link} target="_blank" rel="noopener noreferrer">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#06f9f3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#17202a",
                boxShadow: 3,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
              }}
            >
              {icon}
            </Box>
          </a>
        ))}
      </Box>
    </Box>
  );
};

export default FadeCarousel;
