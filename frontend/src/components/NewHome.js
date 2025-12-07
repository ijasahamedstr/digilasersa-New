import { Box, Container, Button, Typography } from "@mui/material";
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

             <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "25px",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#111",
              mb: 2,
              fontFamily: "'Tajawal', sans-serif",
            }}
          >
            من نحن⭐
          </Typography>

          <Typography
            sx={{
              fontSize: "22px",
              color: "#333",
              mb: 4,
              fontFamily: "'Tajawal', sans-serif",
              lineHeight: 1.8,
            }}
          >
            
          </Typography>

         
        </Box>

        {/* ⭐⭐⭐ SECTION: Vision / Mission / Goal ⭐⭐⭐ */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "25px",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#111",
              mb: 2,
              fontFamily: "'Tajawal', sans-serif",
            }}
          >
            ⭐ الرؤية
          </Typography>

          <Typography
            sx={{
              fontSize: "22px",
              color: "#333",
              mb: 4,
              fontFamily: "'Tajawal', sans-serif",
              lineHeight: 1.8,
            }}
          >
            أن نكون الخيار الأول في التسويق العقاري الرقمي، من خلال تقديم خدمات
            احترافية تُحقق أعلى مستويات الثقة والتميز.
          </Typography>

          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#111",
              mb: 2,
              fontFamily: "'Tajawal', sans-serif",
            }}
          >
            ⭐ الرسالة
          </Typography>

          <Typography
            sx={{
              fontSize: "22px",
              color: "#333",
              mb: 4,
              fontFamily: "'Tajawal', sans-serif",
              lineHeight: 1.8,
            }}
          >
            تقديم خدمات تسويق عقاري تعتمد على المعرفة العميقة بالسوق والاحتراف
            في تقديم المحتوى، للوصول لأفضل النتائج في أقل وقت ممكن.
          </Typography>

          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#111",
              mb: 2,
              fontFamily: "'Tajawal', sans-serif",
            }}
          >
            ⭐ الهدف
          </Typography>

          <Typography
            sx={{
              fontSize: "22px",
              color: "#333",
              fontFamily: "'Tajawal', sans-serif",
              lineHeight: 1.8,
            }}
          >
            الوصول بالعقار إلى العميل المناسب من خلال أدوات تسويقية فعالة،
            وبناء علاقات طويلة الأمد مبنية على المصداقية والجودة.
          </Typography>
        </Box>

        {/* ⭐⭐⭐ BUTTONS SECTION ⭐⭐⭐ */}
        {[
          [
            { label: "بيع", path: "/بيع" },
            { label: "شراء", path: "/شراء" },
          ],
          [
             { label: "تشطيب", path: "/تشطيب" },
            { label: "إيجار", path: "/إيجار" },
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
                component={Link}
                to={btn.path}
                sx={{
                  background:
                    "linear-gradient(145deg, #1a1a1a, #000000, #3a3a3a)",
                  color: "#fff",

                  fontSize: { xs: "40px", sm: "50px", md: "40px" },
                  fontFamily: "'Tajawal', sans-serif",
                  fontWeight: "700",
                  height:"50px",

                  padding: "90px 70px",
                  borderRadius: "30px",
                  width: { xs: "100%", sm: "48%" },

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
