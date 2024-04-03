import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import AdvertWidget from "../widgets/AdvetWidget.jsx";
import GamesWidget from "../widgets/GamesWidget.jsx";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { user } = useSelector((state) => state.user);

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box
        flexBasis={isNonMobileScreens ? "26%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <UserWidget userId={user._id} userImage={user.userImage} />
        <AdvertWidget />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <MyPostWidget userImage={user.userImage} />
        <PostsWidget isProfile={false} />
      </Box>
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <GamesWidget isProfile={false} />
          <Box m="2rem 0" />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
