import { Carousel } from "react-bootstrap";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  CircularProgress,
} from "@mui/material";
import Container from "@mui/material/Container";
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
import Form from "react-bootstrap/Form";
import Slider from "react-slick";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

const carouselItems = [
  {
    id: 1,
    img: "https://i.ibb.co/D7D1QN0/Group-3.webp",
  },
  {
    id: 2,
    img: "https://i.ibb.co/D7D1QN0/Group-3.webp",
  },
  {
    id: 3,
    img: "https://i.ibb.co/D7D1QN0/Group-3.webp",
  },
];

const socialLinks = [
  {
    icon: <FontAwesomeIcon icon={faXTwitter} sie="lg" />,
    link: "https://x.com/digilasersa",
  },
  {
    icon: <FaInstagram size={25} />,
    link: "https://www.instagram.com/digilasersa",
  },
  {
    icon: <FaLinkedin size={25} />,
    link: "https://www.linkedin.com/company/digilasersa",
  },
  { icon: <FaYoutube size={25} />, link: "https://youtube.com/@digilaserSa" },
  {
    icon: <FaSnapchat size={25} />,
    link: "https://www.snapchat.com/add/digilasersa",
  },
  { icon: <FaTiktok size={25} />, link: "https://www.tiktok.com/@digilasersa" },
  { icon: <FaWhatsapp size={25} />, link: "http://wa.me/966571978888" },
];

const INITIAL_FORM_STATE = {
  name: "",
  phone: "",
  message: "",
};

const InteractiveScreens = () => {
  const [outdoorLedData, setOutdoorLedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImages, setMainImages] = useState([]); // Array to store main images for each project
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () =>
    Object.values(formData).every((field) => field.trim() !== "");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill out all fields.");
      return;
    }

    const { name, phone, message } = formData;
    const whatsappNumber = "966571908888";
    const text = `👋 مرحبًا، لدي استفسار:\n\n📛 الاسم: ${name}\n📞 الجوال: ${phone}\n📝 الرسالة: ${message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_HOST}/Screensdepartment`,
        );
        const filteredData = response.data.filter(
          (item) => item.projectype === "الشاشات الإلكترونية الخارجية",
        );

        setOutdoorLedData(filteredData);

        if (filteredData.length > 0) {
          const images = filteredData.map((project) => {
            return project?.projectimage?.[0]
              ? `${process.env.REACT_APP_API_HOST}/uploads/Screenssection/${project.projectimage[0]}`
              : ""; // Default empty string if no image exists
          });
          setMainImages(images); // Update mainImages with the first image of each project
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setOutdoorLedData([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: true,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: true,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const handleImageClick = (index, imageSrc) => {
    const updatedImages = [...mainImages];
    updatedImages[index] = imageSrc; // Update the image for the specific project
    setMainImages(updatedImages);
  };

  const images = [
    "https://i.ibb.co/crGY2Sp/customerservice.png",
    "https://i.ibb.co/FXr5DWX/advertising-plan.png",
    "https://i.ibb.co/NVDMdFy/the-camera-lens-canon-eos-5d-mark-ii-wallpaper-preview.png",
    "https://i.ibb.co/6WYNt6b/1632994991100.png",
  ];

  return (
    <>
      <Container
        maxWidth={false}
        sx={{ padding: 0 }}
        style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "100px" }}
      >
        <Box sx={{ width: "100%", position: "relative", overflow: "hidden" }}>
          <Carousel
            fade
            nextIcon={
              <span
                className="carousel-control-next-icon"
                style={{ backgroundColor: "black" }}
              />
            }
            prevIcon={
              <span
                className="carousel-control-prev-icon"
                style={{ backgroundColor: "black" }}
              />
            }
            aria-live="polite"
          >
            {carouselItems.map((item) => (
              <Carousel.Item key={item.id}>
                <img
                  className="d-block w-100"
                  src={item.img}
                  srcSet={`${item.img} 1000w, ${item.img.replace("Top-Screen.png", "Top-Screen-small.png")} 500w`}
                  sizes="(max-width: 600px) 500px, 1000px"
                  alt={item.title || "Carousel image"}
                  style={{
                    objectFit: "cover",
                    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.8)",
                  }}
                />
                <Carousel.Caption>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "white",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    {item.content}
                  </Typography>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Social Media Icons Sidebar */}
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
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
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
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  {icon}
                </Box>
              </a>
            ))}
          </Box>
        </Box>
      </Container>

      {outdoorLedData.length > 0 &&
        outdoorLedData.map((project, index) => (
          <section
            dir={index % 2 === 0 ? "rtl" : "ltr"}
            key={index}
            style={{
              width: "100%",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "30px",
              position: "relative",
              backgroundColor:
                index % 2 === 0
                  ? "rgba(85, 254, 238, 0.8)"
                  : "rgba(168, 170, 173, 0.5)",
              backgroundImage: mainImages[index]
                ? `url(${mainImages[index]})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: "1",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor:
                  index % 2 === 0
                    ? "rgba(85, 254, 238, 0.8)"
                    : "rgba(168, 170, 173, 0.8)",
                zIndex: "0",
              }}
            ></div>

            <Container maxWidth="xxl" sx={{ px: { xs: 2, sm: 10 }, py: 5 }}>
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: "40px",
                  position: "relative",
                  height: "auto",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                {/* Left Section: Main Image */}
                <Grid item xs={12} md={6} sx={{ position: "relative" }}>
                  <div
                    className="image-overlay"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      backgroundColor:
                        index % 2 === 0
                          ? "rgba(85, 254, 238, 0.5)"
                          : "rgba(168, 170, 173, 0.7)",
                      zIndex: "1",
                      borderRadius: "8px",
                      transition: "background-color 0.3s ease",
                    }}
                  ></div>
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <img
                      src={mainImages[index]}
                      loading="lazy"
                      alt={`Main project ${index}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "550px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        borderLeft:
                          index % 2 === 0 ? "10px solid black" : "none",
                        borderRight:
                          index % 2 !== 0 ? "10px solid black" : "none",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: index % 2 === 0 ? 0 : "auto",
                        left: index % 2 === 0 ? "auto" : 0,
                        height: "100%",
                        width: "150px",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        zIndex: 2,
                        overflowY: "auto",
                        borderRadius: "5px",
                      }}
                    >
                      <Slider {...sliderSettings}>
                        {project?.projectimage?.map((img, imgIndex) => (
                          <Box key={imgIndex} p={1}>
                            <img
                              src={`${process.env.REACT_APP_API_HOST}/uploads/Screenssection/${img}`}
                              alt={`Project ${index} Image ${imgIndex}`}
                              loading="lazy"
                              onClick={() =>
                                handleImageClick(
                                  index,
                                  `${process.env.REACT_APP_API_HOST}/uploads/Screenssection/${img}`,
                                )
                              }
                              style={{
                                width: "100%",
                                height: "100px",
                                objectFit: "cover",
                                cursor: "pointer",
                                borderRadius: "5px",
                              }}
                            />
                          </Box>
                        ))}
                      </Slider>
                    </Box>
                  </Box>
                </Grid>

                {/* Right Section: Text and Card */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ direction: "rtl", textAlign: "justify" }}
                  style={{
                    paddingTop: "50px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <div className="image-overlay">
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <Typography
                          variant="body1"
                          sx={{
                            marginBottom: "20px",
                            fontSize: "20px",
                            fontFamily: "Tajawal",
                          }}
                        >
                          {project?.projectdec}
                        </Typography>
                        <Card
                          sx={{
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor:
                              index % 2 === 0 ? "#24c4bd" : "#6f7073",
                            borderLeft:
                              index % 2 === 0 ? "10px solid black" : "none",
                            borderRight:
                              index % 2 !== 0 ? "10px solid black" : "none",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{ fontFamily: "Tajawal", fontWeight: "600" }}
                          >
                            {project?.projectname}
                          </Typography>
                        </Card>
                      </>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Container>
          </section>
        ))}
      {/* Contact Section */}
      <section
        style={{
          backgroundColor: "#000000",
          backgroundImage: 'url("https://i.ibb.co/k3LmJgK/image.webp")',
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
          paddingBottom: "50px",
          marginTop: "-30px",
          direction: "rtl",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ px: { xs: 2, sm: 3, md: 5 }, textAlign: "center" }}
        >
          <Grid container spacing={4}>
            {/* Right Side - Contact Info */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                textAlign: "justify",
                direction: "ltr",
                pr: 5,
              }}
            >
              <Typography variant="h4" color="white">
                Contact Us
              </Typography>
              <Typography
                variant="h5"
                color="#00fffc"
                sx={{ textAlign: "justify", direction: "rtl" }}
              >
                للطلب والإستفسار /
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{ pt: "30px", direction: "rtl", alignItems: "center" }}
              >
                {[
                  {
                    label: "المدير العام للطباعة بالمملكة",
                    value: "8888 190 057",
                  },
                  {
                    label: "المدير الفني للطباعة بالمملكة",
                    value: "8888 193 057",
                  },
                  { label: "واتساب الطباعة", value: "8888 194 057" },
                ].map(({ label, value }) => (
                  <React.Fragment key={label}>
                    <Grid item xs={4}>
                      <Typography
                        color="white"
                        fontSize={{ xs: 17, md: 20 }}
                        textAlign="right"
                      >
                        {label}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography color="white" fontSize={{ xs: 17, md: 20 }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography
                        color="white"
                        fontSize={{ xs: 17, md: 20 }}
                        textAlign="right"
                      >
                        {value}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>

            {/* Left Side - Form */}
            <Grid item xs={12} sm={6} sx={{ order: { xs: 2, sm: 2 } }}>
              <h2
                style={{
                  color: "white",
                  fontFamily: "Tajawal",
                  fontSize: "26px",
                  textAlign: "right",
                  marginBottom: "20px",
                }}
              >
                للشكاوي ..
              </h2>
              <form onSubmit={handleFormSubmit} style={{ direction: "rtl" }}>
                <Form.Group
                  className="mb-3 d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <Form.Label
                    style={{
                      color: "white",
                      width: "150px",
                      fontSize: "20px",
                      textAlign: "right",
                    }}
                  >
                    الاسم
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      background: "#17202a",
                      border: "none",
                      color: "white",
                    }}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <Form.Label
                    style={{
                      color: "white",
                      width: "150px",
                      fontSize: "20px",
                      textAlign: "right",
                    }}
                  >
                    الجوال
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      background: "#17202a",
                      border: "none",
                      color: "white",
                      textAlign: "right",
                    }}
                    pattern="[0-9]{9,12}"
                    title="الرجاء إدخال رقم جوال صالح"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <Form.Label
                    style={{
                      color: "white",
                      width: "150px",
                      fontSize: "20px",
                      textAlign: "right",
                    }}
                  >
                    رسالتك
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      background: "#17202a",
                      border: "none",
                      color: "white",
                    }}
                  />
                </Form.Group>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "15px",
                    paddingRight: "150px",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      background: "#00fffc",
                      color: "#1e272e",
                      padding: { xs: "10px", sm: "15px" },
                      width: "50%",
                    }}
                  >
                    ارسال
                  </Button>
                </div>
              </form>
            </Grid>
          </Grid>
        </Container>
      </section>

      <style jsx>{`
        .image-overlay:hover {
          background-color: transparent !important;
        }
      `}</style>
    </>
  );
};

export default InteractiveScreens;
