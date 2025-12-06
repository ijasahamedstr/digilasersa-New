import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const pages1 = ["الرئيسية", "أقسامنا", "من نحن", "إتصل بنا"];
const sections = [
  "قسم الشاشات",
  "قسم الطباعة",
  "قسم الفن التشكيلي",
  "قسم الهدايا الدعائية",
  "قسم الإعلام والميديا",
  "قسم السوشيال ميديا",
  "قسم البرمجيات",
  "قسم الصوتيات",
];

function ResponsiveAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawerList = () => (
    <Box
      sx={{
        width: 250,
        fontFamily: "Tajawal",
        height: "100%",
        overflowY: "auto",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      dir="rtl"
    >
      {/* Logo */}
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <img
          src="https://i.ibb.co/hRZ1bMy/78-removebg-preview.png"
          alt="Logo"
          style={{ height: "40px", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
            setDrawerOpen(false);
          }}
        />
      </Box>

      {/* Navigation Pages 1 */}
      <Box sx={{ marginBottom: 2 }}>
        {pages1.map((page) =>
          page === "أقسامنا" ? (
            <>
              <Button
                key="أقسامنا"
                onClick={handleMenuClick}
                sx={{
                  my: 0.5,
                  mx: 2,
                  color: location.pathname.includes("/sections")
                    ? "white"
                    : "inherit",
                  display: "flex",
                  fontFamily: "Tajawal",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  borderRadius: "50px",
                  backgroundColor: location.pathname.includes("/sections")
                    ? "#0b5097"
                    : "transparent",
                  "&:hover": {
                    backgroundColor:
                      location.pathname !== "/sections" ? "#444" : "#0b5097",
                  },
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
                aria-controls={
                  Boolean(anchorEl) ? "sections-menu-mobile" : undefined
                }
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              >
                أقسامنا
                <ArrowDropDownIcon sx={{ ml: 1 }} />
              </Button>
              {/* Dropdown menu inside drawer */}
              <Menu
                id="sections-menu-mobile"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ direction: "rtl" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {sections.map((section) => (
                  <MenuItem
                    key={section}
                    component={Link}
                    to={`/${section.toLowerCase()}`}
                    onClick={() => {
                      handleMenuClose();
                      setDrawerOpen(false);
                    }}
                    sx={{ fontFamily: "Tajawal" }}
                  >
                    {section}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <MenuItem
              key={page}
              component={Link}
              to={`/${page.toLowerCase()}`}
              onClick={toggleDrawer(false)}
              sx={{
                backgroundColor:
                  location.pathname === `/${page.toLowerCase()}`
                    ? "#06f9f3"
                    : "transparent",
                "&:hover": { backgroundColor: "#444" },
                color:
                  location.pathname === `/${page.toLowerCase()}`
                    ? "white"
                    : "inherit",
                padding: "10px",
                fontFamily: "Tajawal",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Tajawal",
                  fontSize: "14px",
                  width: "100%",
                }}
              >
                {page}
              </Typography>
            </MenuItem>
          ),
        )}
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{ background: "#000", height: "100px" }}
      dir="rtl"
    >
      <Container
        maxWidth="xxl"
        sx={{
          "@media (min-width: 1600px)": {
            maxWidth: "1900px",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: "100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: "16px", sm: "20px", md: "25px" },
              paddingRight: "16px",
              cursor: "pointer",
            }}
          >
            <img
              src="https://i.ibb.co/hRZ1bMy/78-removebg-preview.png"
              alt="Logo"
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "auto",
                maxHeight: "50px",
              }}
            />
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-start",
              paddingRight: "40px",
            }}
            dir="rtl"
          >
            {pages1.map((page) =>
              page === "أقسامنا" ? (
                <Button
                  key="أقسامنا"
                  onClick={handleMenuClick}
                  aria-controls={
                    Boolean(anchorEl) ? "sections-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                  sx={{
                    my: 0.5,
                    mx: 2,
                    color: location.pathname.includes("/sections")
                      ? "white"
                      : "inherit",
                    display: "flex",
                    fontFamily: "Tajawal",
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                    borderRadius: "50px",
                    backgroundColor: location.pathname.includes("/sections")
                      ? "#0b5097"
                      : "transparent",
                    "&:hover": {
                      backgroundColor:
                        location.pathname !== "/sections" ? "#444" : "#0b5097",
                    },
                    alignItems: "center",
                  }}
                >
                  أقسامنا
                  <ArrowDropDownIcon sx={{ ml: 1 }} />
                </Button>
              ) : (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                  sx={{
                    my: 0.5,
                    mx: 2,
                    color:
                      location.pathname === `/${page.toLowerCase()}`
                        ? "white"
                        : "inherit",
                    display: "block",
                    fontFamily: "Tajawal",
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                    borderRadius: "50px",
                    backgroundColor:
                      location.pathname === `/${page.toLowerCase()}`
                        ? "#0b5097"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        location.pathname !== `/${page.toLowerCase()}`
                          ? "#444"
                          : "#0b5097",
                    },
                  }}
                >
                  {page}
                </Button>
              ),
            )}
          </Box>

          {/* Contact and Store Buttons */}
          <Button
            component="a"
            href="https://wa.link/yo3er5"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "white",
              fontFamily: "Tajawal",
              fontSize: { xs: "12px", sm: "18px", md: "25px" },
              borderRadius: "50px",
              padding: "10px 20px",
              ml: 2,
              display: { xs: "none", md: "block" },
              direction: "ltr",
              fontWeight: "600",
              paddingLeft: { xs: "10px", sm: "50px", md: "200px" },
              whiteSpace: "nowrap",
            }}
          >
            +966 57 197 8888
          </Button>

          <Button
            component="a"
            href="https://digilaser.com.sa"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#000000",
              background: "rgb(15, 245, 236)",
              fontFamily: "Tajawal",
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
              borderRadius: "50px",
              padding: "10px 20px",
              "&:hover": {
                backgroundImage: "linear-gradient(to right, #005bb5, #003f8e)",
              },
              ml: 2,
              display: { xs: "none", md: "block" },
              whiteSpace: "nowrap",
            }}
          >
            متجر الليزر
          </Button>

          {/* Mobile Menu (Drawer) */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            dir="ltr"
          >
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  backgroundColor: "#000",
                  color: "#fff",
                },
              }}
            >
              {drawerList()}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>

      {/* Dropdown Menu for أقسامنا (Desktop) */}
      <Menu
        id="sections-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ direction: "rtl" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {sections.map((section) => (
          <MenuItem
            key={section}
            component={Link}
            to={`/${section.toLowerCase()}`}
            onClick={handleMenuClose}
            sx={{
              fontFamily: "Tajawal",
            }}
          >
            {section}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}

export default ResponsiveAppBar;
