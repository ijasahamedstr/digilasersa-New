import React, { useEffect } from "react";
import { Box, Container, Button, Checkbox, Typography } from "@mui/material";

// ✨ Simple fade-in-up animation helper
function fadeInUp(delay = 0) {
  return {
    opacity: 0,
    transform: "translateY(20px)",
    animation: `fadeInUp 0.7s ease-out forwards`,
    animationDelay: `${delay}s`,
    "@keyframes fadeInUp": {
      "0%": { opacity: 0, transform: "translateY(20px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
  };
}

const checkboxStyle = {
  transform: "scale(1.6)",
  "&.Mui-checked": { color: "#111827" },
  transition: "transform 0.2s ease, color 0.2s ease",
  "&:hover": {
    transform: "scale(1.8)",
  },
};

function NewHomePage4() {
  // 🔹 Scroll to top when this page mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // use "auto" if you prefer an instant jump
    });
  }, []);

  return (
    <Box
      sx={{
        background:
          "radial-gradient(circle at top, #e5e7eb 0, #f2f3f4 40%, #e5e7eb 100%)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: { xs: "80px", sm: "100px", md: "100px" },
        pb: { xs: "80px", sm: "100px", md: "100px" },
        mt: { xs: "80px", sm: "100px", md: "100px" },
        px: { xs: 2, sm: 0 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 5, sm: 7, md: 9 },
          direction: "rtl",
          textAlign: "right",
          fontFamily: "'Tajawal', sans-serif",
          alignItems: "flex-end",
        }}
      >
        {/* ========= MAIN TITLE ========= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            ...fadeInUp(0),
          }}
        >
          <Button variant="contained" fullWidth sx={titleButtonStyle}>
            إيجار
          </Button>
        </Box>

        {/* ========= TWO BIG OPTIONS (2 COLUMNS - RESPONSIVE) ========= */}
        <Box sx={{ ...smallOptionsRow, ...fadeInUp(0.3) }}>
          {["جاهز"].map((label, i) => (
            <Box key={i} sx={smallOptionBox}>
              <Typography sx={smallOptionText}>{label}</Typography>
              <Checkbox sx={checkboxStyle} />
            </Box>
          ))}
        </Box>

        {/* ========= SECOND TITLE ========= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            width: "100%",
            mt: 8,
            ...fadeInUp(0.2),
          }}
        >
          <Button variant="contained" fullWidth sx={titleButtonStyle}>
            نوع العقار
          </Button>
        </Box>

        {/* ========= SMALL FOUR OPTIONS ========= */}
        <Box sx={{ ...smallOptionsRow, ...fadeInUp(0.3) }}>
          {["دوبلكس", "فيلا", "أرض"].map((label, i) => (
            <Box key={i} sx={smallOptionBox}>
              <Typography sx={smallOptionText}>{label}</Typography>
              <Checkbox sx={checkboxStyle} />
            </Box>
          ))}
        </Box>

        <Box sx={{ ...smallOptionsRow, ...fadeInUp(0.3) }}>
          {["تاون هاوس", "قصر", "شقة"].map((label, i) => (
            <Box key={i} sx={smallOptionBox}>
              <Typography sx={smallOptionText}>{label}</Typography>
              <Checkbox sx={checkboxStyle} />
            </Box>
          ))}
        </Box>

        <Box sx={{ ...smallOptionsRow, ...fadeInUp(0.3) }}>
          {["مستودعات", "روف"].map((label, i) => (
            <Box key={i} sx={smallOptionBox}>
              <Typography sx={smallOptionText}>{label}</Typography>
              <Checkbox sx={checkboxStyle} />
            </Box>
          ))}
        </Box>

        {/* ========= THIRD TITLE ========= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            width: "100%",
            mt: 10,
            ...fadeInUp(0.4),
          }}
        >
          <Button variant="contained" fullWidth sx={titleButtonStyle}>
            الحي المرغوب فيه الشراء
          </Button>
        </Box>

        {/* ========= TITLE THREE GRID ========= */}
        <Box sx={{ ...titleThreeWrapper, ...fadeInUp(0.7) }}>
          <Box sx={lineRow}>
            {[""].map((label, i) => (
              <Box key={i} sx={titleThreeItem}>
                <input type="text" style={textBoxStyle} />
                <Typography sx={titleThreeText}>{label}</Typography>
              </Box>
            ))}

            <Box sx={titleThreeItem}>
              <Typography sx={titleThreeText}>اختر الحي</Typography>
              <Checkbox sx={checkboxStyle} />
            </Box>
          </Box>
        </Box>

        {/* ========= FOURTH TITLE ========= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            width: "100%",
            mt: 10,
            ...fadeInUp(0.6),
          }}
        >
          <Button variant="contained" fullWidth sx={titleButtonStyle}>
            المعلومات المالية
          </Button>
        </Box>

        {/* ========= FOURTH SECTION ========= */}
        <Box sx={{ ...titleThreeWrapper, ...fadeInUp(0.7) }}>
          <Box sx={lineRow}>
            {["إلى", "من"].map((label, i) => (
              <Box key={i} sx={titleThreeItem}>
                <input type="text" style={textBoxStyle} />
                <Typography sx={titleThreeText}>{label}</Typography>
              </Box>
            ))}

            <Box sx={titleThreeItem}>
              <Typography sx={titleThreeText}>السعر المقترح</Typography>
              <Checkbox sx={checkboxStyle} />
            </Box>
          </Box>
        </Box>

        {/* ========= MAIN HEADING (BOTTOM) ========= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            width: "100%",
            ...fadeInUp(0.8),
          }}
        >
          <Button variant="contained" fullWidth sx={titleButtonStyle}>
            طرية الدفع
          </Button>
        </Box>

        {/* ========= EXTRA CHECKBOXES SECTION ========= */}
        <Box sx={{ ...titleThreeWrapper, ...fadeInUp(0.9) }}>
          <Box sx={lineRow}>
            {["مدعوم", "تحويل بنكي", "كاش"].map((label, i) => (
              <Box key={i} sx={titleThreeItem}>
                <Typography sx={titleThreeText}>{label}</Typography>
                <Checkbox sx={checkboxStyle} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* ========= SEARCH BAR UNDER LAST BUTTON ========= */}
        <Box
          sx={{
            ...titleThreeWrapper,
            ...fadeInUp(0.85),
            mt: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row-reverse" }, // ✅ Better on mobile
              alignItems: "stretch",
              gap: 2,
              width: "100%",
            }}
          >
            <input
              type="text"
              style={{ ...textBoxStyle, flex: 1 }}
              placeholder="ابحث عن العقار أو رقم القطعة..."
            />
            <Button
              variant="contained"
              sx={{
                ...searchButtonStyle,
                width: { xs: "100%", sm: "auto" }, // ✅ Full width on mobile
              }}
            >
              ابحث
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ======================= STYLES ======================= */

// 🌈 GRADIENT MAIN HEADING BUTTONS
const titleButtonStyle = {
  maxWidth: { xs: "100%", sm: 480, md: 560 },
  background: "linear-gradient(135deg, #A1A1A1, #0f172a)",
  color: "#fff",
  padding: { xs: "22px 18px", sm: "30px 32px", md: "34px 52px" },
  fontSize: { xs: "20px", sm: "24px", md: "26px" },
  fontWeight: 700,
  borderRadius: "20px",
  boxShadow: "0 14px 30px rgba(15, 23, 42, 0.45)",
  letterSpacing: "0.03em",
  transition:
    "transform 0.3s ease, box-shadow 0.3s ease, background 0.4s ease, letter-spacing 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #A1A1A1, #0f172a)",
    transform: "translateY(-4px)",
    boxShadow: "0 22px 40px rgba(15, 23, 42, 0.55)",
    letterSpacing: "0.08em",
  },
};

const bigOptionsRow = {
  display: "flex",
  flexDirection: { xs: "column", md: "row-reverse" },
  justifyContent: "flex-end",
  alignItems: "stretch",
  gap: { xs: 3, md: 4 },
  width: "100%",
};

const bigOptionBox = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  flexDirection: "row-reverse",
  width: "100%",
  justifyContent: "flex-end",
};

// 🌈 GRADIENT BIG OPTION BUTTONS
const bigOptionButton = {
  width: "100%",
  maxWidth: { xs: "100%", sm: 520, md: 540 },
  background: "linear-gradient(135deg, #e0f2fe, #bae6fd)",
  color: "#0f172a",
  borderRadius: "20px",
  padding: { xs: "22px 16px", sm: "28px 32px", md: "32px 48px" },
  fontSize: { xs: "18px", sm: "22px", md: "24px" },
  fontWeight: 700,
  border: "2px solid #93c5fd",
  boxShadow: "0 12px 26px rgba(15, 23, 42, 0.18)",
  textAlign: "right",
  transition: "all 0.35s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #bae6fd, #e0f2fe)",
    transform: "translateY(-4px) scale(1.02)",
    boxShadow: "0 18px 38px rgba(15, 23, 42, 0.3)",
    borderColor: "#60a5fa",
  },
};

const smallOptionsRow = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row-reverse" },
  flexWrap: "wrap",
  columnGap: "80px",
  justifyContent: "center",
  between: "space-evenly",
  alignItems: "flex-end",
  gap: { xs: 2.5, sm: 3.5 },
  mt: 3,
  width: "100%",
};

const smallOptionBox = {
  display: "flex",
  alignItems: "center",
  fontSize: { xs: "15px", sm: "17px", md: "19px" },
  gap: 1.5,
  flexDirection: "row-reverse",
  minWidth: { xs: "100%", sm: "48%", md: "23%" },
  justifyContent: "flex-end",
  padding: { xs: "10px 14px", md: "12px 16px" },
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  boxShadow: "0 8px 18px rgba(15, 23, 42, 0.06)",
  transition:
    "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#F9FAFB",
    boxShadow: "0 14px 32px rgba(15, 23, 42, 0.16)",
    transform: "translateY(-3px)",
    borderColor: "#cbd5e1",
  },
};

const smallOptionText = {
  fontSize: { xs: "15px", sm: "17px", md: "30px" },
  fontWeight: 600,
  color: "#111",
};

const titleThreeWrapper = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: { xs: 4, md: 5 },
  mt: 6,
  alignItems: "flex-end",
  backgroundColor: "#ffffff",
  borderRadius: "24px",
  padding: { xs: 3, sm: 4, md: 5 },
  boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
};

const lineRow = {
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: { xs: 3, md: 4.5 },
  flexWrap: "wrap",
  width: "100%",
};

const titleThreeItem = {
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  gap: 1.5,
  minWidth: { xs: "100%", sm: "48%", md: "30%" },
  justifyContent: "flex-end",
};

const titleThreeText = {
  fontSize: { xs: "15px", sm: "17px", md: "19px" },
  fontWeight: 600,
  color: "#111",
};

const fourthLineRow = {
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 3,
  width: "100%",
  flexWrap: "wrap",
};

const labelInputBox = {
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  gap: 2,
};

const labelStyle = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#111",
};

const textBoxStyle = {
  padding: "10px 12px",
  fontSize: "16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  width: "100%",
  backgroundColor: "#F9FAFB",
  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.06)",
  outline: "none",
  boxSizing: "border-box",
};

const searchButtonStyle = {
  padding: "12px 24px",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: 600,
  background: "linear-gradient(135deg, #A1A1A1, #0f172a)",
  color: "#fff",
  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.35)",
  whiteSpace: "nowrap",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #A1A1A1, #0f172a)",
    transform: "translateY(-2px)",
    boxShadow: "0 16px 32px rgba(15, 23, 42, 0.45)",
  },
};

export default NewHomePage4;
