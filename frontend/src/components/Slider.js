import { useEffect } from "react";
import { Box } from "@mui/material";
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

// ⭐ Use direct URL (NO import for external image URLs)
const heroImage = "https://i.ibb.co/yFF6HDVn/Whats-App-Image-2025-12-06-at-1-07-47-PM.jpg";

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
  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ⛔ Remove this if not needed
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <Box sx={{ mt: { xs: "100px" } }}>
      
      {/* ⭐ Full-Width Hero Image */}
      <Box
        component="img"
        src={heroImage}
        alt="Digilaser Hero"
         sx={{
          width: "100%",
          height: { xs: "auto", md: "70vh" },  // ⭐ Reduced Height
          objectFit: "cover",
          display: "block",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)",
        }}
      />

      {/* ⭐ Social Media Icons (Left Fixed Sidebar) */}
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
                cursor: "pointer",
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
