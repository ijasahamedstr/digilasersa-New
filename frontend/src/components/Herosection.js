import React from "react";
import { Container, Typography } from "@mui/material";

function Herosection() {
  return (
    <section
      style={{
        backgroundColor: "#f2f3f4",
        width: "100%",
        margin: "0 auto",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "center", // Horizontally center the content
        alignItems: "center", // Vertically center the content
        height: "auto", // Adjust height to fit the content
        paddingTop: "20px", // Padding for the top
        paddingBottom: "20px", // Padding for the bottom
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          paddingX: { xs: 2, sm: 3, md: 5 }, // Responsive padding for different screen sizes
          textAlign: "center", // Center text for all screen sizes
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontFamily: "Tajawal", // Apply Changa font family
          }}
        >
          <span style={{ fontSize: "50px", color: "" }}>قصتنا </span>صناع
          الإعلان بالمملكة
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginTop: "15px",
            fontSize: { xs: "14px", sm: "16px", md: "18px" }, // Responsive font size
            fontFamily: "Tajawal", // Apply Changa font family
          }}
        >
          نسرد قصة الإعلان بشكل مختلف تبصره العين وينبهر به العقل ، ويجد مكانا
          في خيال الناس
        </Typography>
      </Container>
    </section>
  );
}

export default Herosection;
