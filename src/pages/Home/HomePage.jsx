// Mui component
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Mui Icon
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

// Internal component
import BannerCarousel from "@/pages/Home/BannerCarousel";
import CategoriesSlider from "./CategoriesSlider";
import SectionHeader from "@/components/user/SectionHeader";
import CardCarousel from "@/components/user/CardCarousel";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CategoriesContext } from "@/contexts/user/CategoryContext";
const imgs = [
  "https://hips.hearstapps.com/hmg-prod/images/plants-1620425290.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
  "https://advanceplants.com.au/wp-content/uploads/2020/06/Corporate-Indoor-Plant-Hire-7.jpg",
  "https://www.ikea.com/images/an-white-office-space-filled-with-large-grean-floor-plants-03228b07a2eb6c2b3d3df4749d525c25.jpg?f=s",
];

const categories = [
  {
    img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1675018253-157654MDS_20220221-1645468126653.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
    name: "flower",
  },
  {
    img: "https://www.eatingwell.com/thmb/Mi_AoBSd6a0HZ5MWLlFyHAI6pUc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/102865778_960px_hero-8081aae50da546a8a0013c48eb93f519.jpg",
    name: "tools",
  },
  {
    img: "https://www.mydomaine.com/thmb/dko8fVfm8Yj6hfQ6cC151nQlJ7E=/420x0/filters:no_upscale():strip_icc()/zzplantthesill-7244092fd94745f2959a91d4ce00f14a.jpg",
    name: "Indoor",
  },
  {
    img: "https://bloomingartificial.imgix.net/blog-images/spring-top-10/faux-patio-tub-in-garden.png?auto=format%2Ccompress&crop=focalpoint&fit=crop&fp-x=0.32&fp-y=0.45&fp-z=1.4&h=1440&ixlib=php-3.3.1",
    name: "outdoor",
  },
  {
    img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1579636650-yucca-plant-cubico_0771a49a-46db-4324-8e77-3153ed7280aa_2000x.jpg?crop=0.668xw:1.00xh;0.0401xw,0&resize=980:*",
    name: "Tall",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtigORTav0bt4ihRrdZkjf-jZ7B-rsLUD8A&usqp=CAU",
    name: "seeds",
  },
];

function HomePage() {
  const navigate = useNavigate();
  const { categoryData, handleClick } = useContext(CategoriesContext);

  useEffect(() => {
    categoryData.map((data) => (data.selected = false));
  }, [categoryData]);

  return (
    <Box component="main" sx={{ minHeight: "100vh" }}>
      <BannerCarousel imgs={imgs} />
      <Box>
        <Box sx={{ padding: "1rem" }}>
          <CategoriesSlider categories={categories} />
          <Button
            sx={{
              borderRadius: "0.5rem",
              display: "flex",
              flexDirection: "column",
              color: "background.default",
              padding: "1rem",
              ":hover": { backgroundColor: "#035316" },
              // eslint-disable-next-line no-dupe-keys
              background:
                "linear-gradient(225deg, rgba(169,245,164,1) 0%, rgba(3,83,22,1) 100%)",
              marginBottom: "1rem",
            }}
            variant="contained"
            fullWidth
            onClick={() => {
              navigate("/store");
              handleClick((categoryData[0].selected = true));
            }}
          >
            <ShoppingBagIcon sx={{ fontSize: "6rem" }} />
            <Typography variant="body" sx={{ fontSize: "1rem" }}>
              go to store
            </Typography>
          </Button>
          <Box>
            <SectionHeader title="trending" link="/" />
            <CardCarousel />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
