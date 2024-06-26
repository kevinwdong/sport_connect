import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGames } from "../redux/gameSlice.js";
import GameWidget from "./GameWidget";
import apiClient from "../utils/apiClient.js"

const GamesWidget = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { games } = useSelector((state) => state.game);
  
  const getGames = async () => {
    const response = await apiClient.get("/games", {
      headers: { Authorisation: token },
    });
    const data = response.data;
    dispatch(setGames({ games: data }));
  };

  const getUserGames = async () => {
    const response = await apiClient.get(
      `/games/${userId}/games`,
      {
        headers: { Authorisation: token },
      }
    );
    const data = response.data;
    dispatch(setGames({ games: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserGames();
    } else {
      getGames();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  

  return (
    <>
      {games?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          title,
          description,
          locationName,
          gameImage,
          userImage,
          players,
          comments,
        }) => (
          <GameWidget
            key={_id}
            gameId={_id}
            gameUserId={userId}
            gameUserImage={userImage}
            gameUserName={`${firstName} ${lastName}`}
            title={title}
            locationName={locationName}
            description={description}      
            gameImage={gameImage}          
            players={players}
            comments={comments}
            isProfile={isProfile}
          />
        )
      )}
    </>
  );
};

GamesWidget.propTypes = {
  userId: PropTypes.string,
  isProfile: PropTypes.bool,
};

export default GamesWidget;
