import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CategoriesSlider = ({ categories }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
        }}
        component="div"
        className="hide-scrollbar"
      >
        {categories.map((el, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "48px",
                height: "48px",
                marginBottom: "0.25rem",
                borderRadius: "100px",
                overflow: "hidden",
              }}
            >
              <Box component="img" src={el.img} alt={el.name} />
            </Box>
            <Typography variant="caption">{el.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoriesSlider;
