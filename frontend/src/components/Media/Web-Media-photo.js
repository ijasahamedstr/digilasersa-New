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
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  CardMedia,
  Container,
  Button,
  CircularProgress,
  Skeleton,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  ClickAwayListener,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Card } from "@mui/material";


const products1 = [
  {
    cardTitles: "أعمال فنية وإنتاج",
    imageUrls: "https://i.ibb.co/w0c1Yzr/Write-lede.webp",
  },
  {
    cardTitles: "كتابة محتوي وتأليف",
    imageUrls: "https://i.ibb.co/48mQr3n/dfba4c19cde988c07930123097f49c78.webp",
  },
  {
    cardTitles: "تصميمات إبداعية",
    imageUrls: "https://i.ibb.co/85pqszg/DALL-E-2024-09-30-00-33-16-A-giant-whimsical-fountain-pen-sitting-confidently-in-a-traditional-direc.webp",
  },
  {
    cardTitles: "محتـوي حصـري",
    imageUrls: "https://i.ibb.co/J7Gp115/piclumen-1727383323200.webp",
  },
];

// Carousel and card data
const carouselItems = [
  { id: 1, img: "https://i.ibb.co/spnGyFpf/AI-in-Banner-5.webp" },
  { id: 2, img: "https://i.ibb.co/spnGyFpf/AI-in-Banner-5.webp" },
  { id: 3, img: "https://i.ibb.co/spnGyFpf/AI-in-Banner-5.webp" },
];

// Categories (static)
const categories = [
  "All",
  "Weddings",
  "Sports",
  "Products",
  "Foods",
  "Factory",
  "Conference",
];

const WebMediaphoto = () => {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImageSrc, setZoomedImageSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 16;
  const [sidebarOpenDesktop, setSidebarOpenDesktop] = useState(false);

   // 🔹 Page Speed Optimizer Script (lazy load images & videos)
  useEffect(() => {
    const lazyElements = document.querySelectorAll("img[data-src], video[data-src]");

    if (!("IntersectionObserver" in window)) {
      // Fallback: Load immediately if IntersectionObserver not supported
      lazyElements.forEach((el) => {
        if (el.dataset.src) {
          el.src = el.dataset.src;
          el.removeAttribute("data-src");
        }
      });
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.src) {
            el.src = el.dataset.src;
            el.removeAttribute("data-src");
          }
          obs.unobserve(el);
        }
      });
    });

    lazyElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);


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

  // Fetch Media Photos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_HOST}/MediaCommunicationsphoto`
        );
        setPhotos(response.data);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Zoom handlers
  const handleImageClick = useCallback((src) => {
    setIsZoomed(true);
    setZoomedImageSrc(src);
  }, []);

  const handleCloseZoom = useCallback(() => {
    setIsZoomed(false);
    setZoomedImageSrc("");
  }, []);

  const handlePageChange = (event, value) => setPage(value);

  // Filter photos by category (memoized)
  const filteredPhotos = useMemo(() => {
    if (category === "All") return photos;
    return photos.filter(
      (p) =>
        p.MediaCommunicationsphototype?.toLowerCase().trim() ===
        category.toLowerCase().trim()
    );
  }, [photos, category]);

  const indexOfLastProduct = page * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredPhotos.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredPhotos.length / itemsPerPage);

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

  if (loading) return <Box sx={{ textAlign: "center", mt: 5 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ textAlign: "center", mt: 5 }}>{error}</Box>;

  return (
    <>
      {/* Mobile AppBar */}
      <AppBar position="fixed" sx={{ display: { xs: "flex", md: "none" }, backgroundColor: "#06f9f3", top: "94px" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "#17202a", fontWeight: "bold" }}>
            ميديا
          </Typography>
          <IconButton edge="end" onClick={() => setDrawerOpen(true)} sx={{ color: "#17202a" }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#06f9f3",
            padding: 2,
            width: 250,
          },
        }}
      >
        {mediaLinks}
      </Drawer>

      {/* Desktop Sidebar Toggle Button */}
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

      {/* Desktop Sidebar with ClickAwayListener */}
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
              sx={{
                position: "absolute",
                top: 5,
                left: 5,
                color: "#17202a",
                fontSize: "20px",
              }}
            >
              ✕
            </IconButton>
            {mediaLinks}
          </Box>
        </ClickAwayListener>
      )}

      {/* Carousel Section */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
          mt: { xs: "150px", md: "100px" },
        }}
      >
        <Carousel fade>
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                className="d-block w-100"
                src={item.img}
                alt="Slide"
                style={{
                  objectFit: "cover",
                  boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.8)",
                }}
              />
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

      <Box sx={{ backgroundColor: "#17202a", py: 5 }}>
        {/* Category Filter Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            mt: { xs: 5, md: 3 },
            mb: 3,
          }}
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              sx={{
                backgroundColor: category === cat ? "#e99b19" : "#34495e",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "50px",
                px: 3,
                py: 1,
                "&:hover": {
                  backgroundColor: "#e99b19",
                  color: "#fff",
                },
              }}
            >
              {cat}
            </Button>
          ))}
        </Box>

        {/* Gallery Section */}
        <Container maxWidth="xl" sx={{ padding: 3 }}>
          <Grid container spacing={2}>
            {/* Loading skeleton */}
            {loading &&
              Array.from(new Array(itemsPerPage)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Skeleton variant="rectangular" height={180} />
                </Grid>
              ))}

            {/* No photos found */}
            {!loading && currentProducts.length === 0 && (
              <Typography
                textAlign="center"
                sx={{ mt: 5, width: "100%", color: "#fff" }}
              >
                No photos found for "{category}" category.
              </Typography>
            )}

            {/* Photo grid */}
            {!loading &&
              currentProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CardMedia
                    component="img"
                    loading="lazy"
                    alt={`Photo ${index}`}
                    src={product.MediaCommunicationsphotolink} // <-- updated
                    sx={{
                      height: { xs: 120, sm: 150, md: 180 },
                      objectFit: "cover",
                      cursor: "zoom-in",
                      border: "4px solid transparent",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        border: "4px solid #e99b19",
                      },
                    }}
                    onClick={() => handleImageClick(product.MediaCommunicationsphotolink)}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="span"
                      sx={{
                        fontFamily: "Tajawal",
                        fontSize: "1.2rem",
                        textAlign: "center",
                        display: "block",
                        color: "#e99b19",
                      }}
                    >
                      {product.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>

          {/* Zoom View */}
          {isZoomed && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
              onClick={handleCloseZoom}
            >
              <img
                src={zoomedImageSrc}
                alt="Zoomed"
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  objectFit: "contain",
                  cursor: "zoom-out",
                }}
              />
            </Box>
          )}

          {/* Pagination */}
          <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
            {!loading && totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                variant="outlined"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#fff",
                    borderColor: "#fff",
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#06f9f3",
                    color: "#fff",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#06f9f3",
                    color: "#fff",
                  },
                }}
              />
            )}
          </Box>
        </Container>
      </Box>
      <Box
      sx={{
        backgroundColor: "#eaecee",
        backgroundImage: 'url("https://i.ibb.co/w0p131X/image.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        margin: "0 auto",
        mt: "-30px",
        mb: "30px",
        height: { xs: "auto", md: "67vh" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: { xs: "10px", md: "20px" },
        pb: { xs: "10px", md: "20px" },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          mt: "40px",
          mb: "40px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {products1.map((product, index) => (
            <SwiperSlide key={index}>
              <Link to={`/service/${index + 1}`} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    maxWidth: 345,
                    boxShadow: 3,
                    border: "2px solid #f05322",
                    "&:hover": { boxShadow: 6 },
                    mb: "20px",
                    position: "relative",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={`Service ${index}`}
                    image={product.imageUrls}
                    sx={{ height: 300, objectFit: "cover" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      position: "absolute",
                      bottom: "20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: "white",
                      backgroundColor: "#000",
                      padding: "10px",
                      borderRadius: "4px",
                      textAlign: "center",
                      width: "100%",
                      border: "2px solid #f05322",
                    }}
                  >
                    {product.cardTitles}
                  </Typography>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
    </>
  );
};

export default WebMediaphoto;
