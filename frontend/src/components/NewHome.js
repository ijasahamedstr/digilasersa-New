import { Box, Container, Button } from "@mui/material";
import { Link } from "react-router-dom"; // IMPORTANT

function NewHome() {
  return (
    <Box
      sx={{
        backgroundColor: "#f2f3f4",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        pt: "100px",
        pb: "100px",

        px: { xs: 2, sm: 0 },
        mt: { xs: "-31px", sm: "-30px" },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {[
          [
            { label: "بيع", path: "/sell" },
            { label: "شراء", path: "/buy" },
          ],
          [
            { label: "إيجار", path: "/rent" },
            { label: "تشطيب", path: "/finish" },
          ],
        ].map((row, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            {row.map((btn, i) => (
              <Button
                key={i}
                variant="contained"
                component={Link}         // Make Button Link
                to={btn.path}            // Link Path

                sx={{
                  background:
                    "linear-gradient(145deg, #1a1a1a, #000000, #3a3a3a)",
                  color: "#fff",

                  fontSize: { xs: "40px", sm: "50px", md: "60px" },
                  fontFamily: "'Tajawal', sans-serif",
                  fontWeight: "700",

                  padding: "90px 70px",
                  borderRadius: "30px",
                  width: { xs: "100%", sm: "48%" },

                  textDecoration: "none", // remove link underline

                  boxShadow:
                    "0px 8px 20px rgba(0,0,0,0.35), 0px 0px 25px rgba(255,215,0,0.2)",

                  position: "relative",
                  overflow: "hidden",
                  transition: "0.35s ease-in-out",

                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.15), rgba(255,215,0,0.25), rgba(255,255,255,0.15))",
                    transform: "skewX(-20deg)",
                  },

                  "&:hover::before": {
                    left: "100%",
                    transition: "0.8s",
                  },

                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow:
                      "0px 12px 35px rgba(0,0,0,0.45), 0px 0px 40px rgba(255,215,0,0.4)",
                  },
                }}
              >
                {btn.label}
              </Button>
            ))}
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default NewHome;
