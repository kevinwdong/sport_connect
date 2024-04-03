import PropType from "prop-types";
import { useState, useEffect } from "react";
import { ManageAccountsOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import FlexBetween from "../components/FlexBetween.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "../components/UserAvatar.jsx";
import FacebookIcon from "@mui/icons-material/Facebook";
import { setUser } from "../redux/userSlice.js";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import PublishIcon from "@mui/icons-material/Publish";



const UserWidget = ({userId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);

  const { palette } = useTheme();
  const main = palette.neutral.main;

  

  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/users/${user._id}`, {
      method: "GET",
      headers: { Authorization: token },
    });
    const data = await response.json();
    dispatch(setUser({user: data}));
  };

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(user)

  return (
    <WidgetWrapper mb="1rem">
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={user.userImage} size="40px" />
          <Box>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton onClick={() => 
        {navigate('/profile')
        navigate(0)}
      }>
          <ManageAccountsOutlined />
        </IconButton>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            {user.location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <SportsBasketballIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            {user.position}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PublishIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            {user.height}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <MonitorWeightIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            {user.weight}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <FacebookIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                TikTok
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <FacebookIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Facebook
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

UserWidget.propTypes = {
  userId: PropType.string,
  userImage: PropType.string,
};

export default UserWidget;
