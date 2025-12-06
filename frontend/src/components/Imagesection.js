import { Box } from "@mui/material";
import Container from "@mui/material/Container";

const Imagesection = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        padding: 0,
        margin: 0,
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%", position: "relative", overflow: "hidden" }}>
        <img
          src="https://i.ibb.co/nq5qw0s5/image.webp"
          alt="main-slide"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
            display: "block",
            boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.8)",
          }}
        />
      </Box>
    </Container>
  );
};

export default Imagesection;
