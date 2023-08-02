import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import logo from "../images/header__logo.svg";
import Header from "./Header"
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login"
import Register from "./Register"
import InfoTooltip from "./InfoTooltip.js"
import sucessImage from "../images/Success.png"
import failImage from "../images/Fail.png"
import ProtectedRouteElement from "./ProtectedRoute.js"

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const avatarPhotoRef = React.useRef();

  React.useEffect(() => {
    api.getUserInfo().then((res) => {
      const userInfoApi = {
        name: res.name,
        about: res.about,
        _id: res._id,
        avatar: res.avatar
      }
      setCurrentUser(userInfoApi);
    }).catch((err => {
      console.log(err)
    }));
  }, []);

  React.useEffect(() => {
    api.getCards().then((res) => {
      const cardsApi = res.map((item) => ({
        name: item.name,
        link: item.link,
        likes: item.likes,
        _id: item._id,
        owner: item.owner
      }));
      setCards(cardsApi);
    }).catch((err => {
      console.log(err)
    }));
  }, []);

  function handleCardClick(cardInfo) {
    setImagePopupOpen(true);
    setSelectedCard(cardInfo);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // function handleRegisterPopupClick() {
  //   setRegisterPopupOpen(true);
  // }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setRegisterPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
      const isLiked = card.likes.some(i => (
        i._id === currentUser._id
        ));

      if (!isLiked) {
        api.putLike(currentUser, card._id).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err => {
          console.log(err)
        }));
      } else {
        api.deleteLike(currentUser, card._id).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err => {
          console.log(err)
        }));
      }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter(c => c._id !== card._id));
    }).catch((err => {
      console.log(err)
    }));
  }

  const handleUpdateUser = (data) => {
    api.editUserInfo(data.name, data.description).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch((err => {
      console.log(err)
    }));
  }

  const handleUpdateAvatar = (data) => {
    api.editUserPhoto(data.avatar).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch((err => {
      console.log(err)
    }));
  }

  const onAddPlace = (data) => {
    api.postCard(data.placeName, data.placeLink).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err => {
      console.log(err)
    }));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App root">
        <div className="root__page">
          <Header logo={logo}/>
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/my-profile" replace /> : <Navigate to="/sign-in" replace />} /> 
            <Route path="/sign-up" element={<Register/>} />
            <Route path="/sign-in" element={<Login/>} />
            <Route path="/my-profile" element={<ProtectedRouteElement element={
              Main} loggedIn={loggedIn} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick} cards={cards} onCardClick={handleCardClick}
              onLikeClick={handleCardLike} onCardDelete={handleCardDelete}/>}/>
          </Routes>
          <Footer />
          <InfoTooltip onClose={closeAllPopups} isOpen={isRegisterPopupOpen} image={failImage} text={"Что-то пошло не так! Попробуйте ещё раз."}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdate={handleUpdateUser} buttonText={"Сохранить"}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={onAddPlace} buttonText={"Создать"}/>
          <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard}/>
          <EditAvatarPopup avatarPhotoRef={avatarPhotoRef} onSubmit={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText={"Сохранить"}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
