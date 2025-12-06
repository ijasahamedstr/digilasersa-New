import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  Container,
  IconButton,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  ClickAwayListener,
  CircularProgress,
} from "@mui/material";
import ReactPlayer from "react-player";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { FaInstagram, FaLinkedin, FaYoutube, FaSnapchat, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import axios from "axios";

const carouselItems = [
  {
    id: 1,
    img: "https://i.ibb.co/N2zLM0tP/AI-in-Banner-3.webp",
  },
  {
    id: 2,
    img: "https://i.ibb.co/N2zLM0tP/AI-in-Banner-3.webp",
  },
  {
    id: 3,
    img: "https://i.ibb.co/N2zLM0tP/AI-in-Banner-3.webp",
  },
];



// Generate thumbnail for non-YouTube videos
const generateVideoThumbnail = (videoUrl) => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.currentTime = 1;
    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg"));
    });
    video.addEventListener("error", () => {
      resolve(""); // fallback
    });
  });
};

const Motiongraphics = () => {
  const [WebMediavideo, setWebMediavideo] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;
  const [sidebarOpenDesktop, setSidebarOpenDesktop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbnails, setThumbnails] = useState({}); // store videoUrl => thumbnail

    // 🔹 Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 🔹 Force a one-time refresh on first load
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/MediaCommunicationsvideo`);
        // Reverse the array so last added videos appear first
        setWebMediavideo(response.data.slice().reverse());
      } catch (err) {
        console.error(err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);


  const filteredVideos = WebMediavideo.filter(
    (item) => item.MediaCommunicationsvideotype === "Motion graphics"
  );

  const indexOfLastProduct = page * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredVideos.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);

  // Generate thumbnails for each video
  useEffect(() => {
    currentProducts.forEach(async (product) => {
      const videoUrl = product.MediaCommunicationsvideolink;
      if (thumbnails[videoUrl]) return; // already generated

      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        let videoId = "";
        if (videoUrl.includes("youtu.be")) {
          videoId = videoUrl.split("/").pop();
        } else if (videoUrl.includes("v=")) {
          videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
        }
        setThumbnails((prev) => ({ ...prev, [videoUrl]: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }));
      } else {
        const thumb = await generateVideoThumbnail(videoUrl);
        setThumbnails((prev) => ({ ...prev, [videoUrl]: thumb }));
      }
    });
  }, [currentProducts, thumbnails]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setCurrentVideoUrl("");
  };

  const handleVideoClick = (url) => setCurrentVideoUrl(url);

  const socialLinks = [
    { icon: <FontAwesomeIcon icon={faXTwitter} size="lg" />, link: "https://x.com/digilasersa" },
    { icon: <FaInstagram size={25} />, link: "https://www.instagram.com/digilasersa" },
    { icon: <FaLinkedin size={25} />, link: "https://www.linkedin.com/company/digilasersa" },
    { icon: <FaYoutube size={25} />, link: "https://youtube.com/@digilaserSa" },
    { icon: <FaSnapchat size={25} />, link: "https://www.snapchat.com/add/digilasersa" },
    { icon: <FaTiktok size={25} />, link: "https://www.tiktok.com/@digilasersa" },
    { icon: <FaWhatsapp size={25} />, link: "http://wa.me/966571978888" },
  ];

  const mediaLinks = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {[
        { label: "قسم الإعلام والميديا", path: "/قسم الإعلام والميديا" },
        { label: "فيديو", path: "/Web-Media-Video" },
        { label: "VR Videos", path: "/vr-videos" },
        { label: "فـوتـو", path: "/Web-Media-photo" },
        { label: "Motion graphics", path: "/Motion-graphics" },
        { label: "Ai Videos", path: "/AIVideos" },
        { label: "3D Animation", path: "/3D-Animation" },
      ].map((btn, index) => (
        <Button
          key={index}
          variant="contained"
          component={Link}
          to={btn.path}
          sx={{ backgroundColor: "#17202a", color: "#fff" }}
          onClick={() => setDrawerOpen(false)}
        >
          {btn.label}
        </Button>
      ))}
    </Box>
  );

  // --- New Functions for Embed / Preview ---
  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("youtube.com")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url; // direct video file
  };

  const renderVideoPreview = (url) => {
    if (!url) return <Typography>No video available</Typography>;

    const embedUrl = getEmbedUrl(url);
    const isEmbed =
      embedUrl.includes("youtube.com/embed") || embedUrl.includes("player.vimeo.com");

    if (isEmbed) {
      return (
        <iframe
          width="100%"
          height="180"
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video Preview"
          style={{ borderRadius: "8px" }}
        />
      );
    }

    // HTML5 video for direct files
    return (
      <video width="100%" height="180" controls style={{ borderRadius: "8px" }}>
        <source src={embedUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <>
      {/* Mobile AppBar */}
      <AppBar position="fixed" sx={{ display: { xs: "flex", md: "none" }, backgroundColor: "#06f9f3", top: "94px" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "#17202a", fontWeight: "bold" }}>ميديا</Typography>
          <IconButton edge="end" onClick={() => setDrawerOpen(true)} sx={{ color: "#17202a" }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { backgroundColor: "#06f9f3", padding: 2, width: 250 } }}>
        {mediaLinks}
      </Drawer>

      {/* Desktop Sidebar Toggle */}
      {!sidebarOpenDesktop && (
        <IconButton
          onClick={() => setSidebarOpenDesktop(true)}
          sx={{
            position: "fixed",
            top: "20%",
            right: 0,
            zIndex: 1100,
            backgroundColor: "#06f9f3",
            color: "#17202a",
            borderRadius: "5px 0 0 5px",
            display: { xs: "none", md: "flex" },
            boxShadow: 3,
            "&:hover": { backgroundColor: "#00e0dc" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Desktop Sidebar */}
      {sidebarOpenDesktop && (
        <ClickAwayListener onClickAway={() => setSidebarOpenDesktop(false)}>
          <Box
            sx={{
              position: "fixed",
              top: "20%",
              right: 0,
              zIndex: 1200,
              backgroundColor: "#06f9f3",
              padding: "20px",
              borderRadius: "5px 0 0 5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              display: { xs: "none", md: "block" },
              minWidth: "250px",
            }}
          >
            <IconButton
              onClick={() => setSidebarOpenDesktop(false)}
              sx={{ position: "absolute", top: 5, left: 5, color: "#17202a", fontSize: "20px" }}
            >
              ✕
            </IconButton>
            {mediaLinks}
          </Box>
        </ClickAwayListener>
      )}

      {/* Carousel */}
      <Box sx={{ width: "100%", position: "relative", overflow: "hidden", mt: { xs: "150px", md: "100px" } }}>
        <Carousel fade>
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>
              <img className="d-block w-100" src={item.img} alt="Slide" style={{ objectFit: "cover", boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.8)" }} />
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Social Media Icons */}
        <Box sx={{ position: "fixed", top: "50%", left: 0, transform: "translateY(-50%)", display: { xs: "none", md: "flex" }, flexDirection: "column", gap: 2, zIndex: 1200, pl: 2 }}>
          {socialLinks.map(({ icon, link }, index) => (
            <a key={index} href={link} target="_blank" rel="noopener noreferrer">
              <Box sx={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#06f9f3", display: "flex", justifyContent: "center", alignItems: "center", color: "#17202a", boxShadow: 3, transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.2)" } }}>
                {icon}
              </Box>
            </a>
          ))}
        </Box>
      </Box>

      {/* Video Section */}
      <section style={{ backgroundColor: "#17202a", paddingTop: "20px", paddingBottom: "20px" }}>
        <Container maxWidth="xl" sx={{ padding: 3 }}>
          {currentVideoUrl && (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 3, border: "4px solid #f05322", borderRadius: 2 }}>
              <ReactPlayer url={currentVideoUrl} playing controls width="100%" height="60vh" />
            </Box>
          )}

          <Box sx={{ padding: 0, borderRadius: 2, boxShadow: 3, maxWidth: "100%", textAlign: "center", marginBottom: "20px" }}>
            <Box sx={{ padding: 0, borderRadius: 2, boxShadow: 3, maxWidth: "100%", textAlign: "center", marginBottom: "20px", border: "2px solid white", marginTop: "30px" }}>
              <Typography variant="h2" component="h3" sx={{ fontFamily: "Tajawal", color: "#FFFFFF", paddingTop: "15px", paddingBottom: "15px", fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, textAlign: "center" }}>
                موشن جرافيك
              </Typography>
            </Box>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: "200px" }}>
              <CircularProgress sx={{ color: "#00fffc" }} />
            </Box>
          ) : error ? (
            <Typography color="error" textAlign="center">{error}</Typography>
          ) : (
            <>
              <Grid container spacing={2}>
                {currentProducts.map((product, index) => {
                  const videoUrl = product.MediaCommunicationsvideolink;

                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Box sx={{ position: "relative", cursor: "pointer" }} onClick={() => handleVideoClick(videoUrl)}>
                        {renderVideoPreview(videoUrl)}
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "#fff",
                            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                          }}
                          onClick={() => handleVideoClick(videoUrl)}
                        >
                          <PlayCircleIcon sx={{ fontSize: 50 }} />
                        </IconButton>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ mt: 1, fontFamily: "Tajawal", textAlign: "center", color: "#e99b19" }}
                      >
                        {product.MediaCommunicationsvideoname || "فيديو"}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>

              <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" variant="outlined" shape="rounded" />
              </Box>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default Motiongraphics;
