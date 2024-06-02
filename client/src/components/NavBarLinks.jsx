import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBarLinksOwner = ({ toggleMenu }) => {
  return (
    <>
      <Link
        to="/owner/room/post"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          ĐĂNG BÀI
        </Button>
      </Link>
      <Link
        to="/owner/contacts/all"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          LIÊN HỆ
        </Button>
      </Link>
      <Link to="/owner/rentDetail" onClick={toggleMenu} className="text-center">
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          TẠO CHI TIẾT THUÊ
        </Button>
      </Link>
      <Link to="/owner/chat" onClick={toggleMenu} className="text-center">
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          CHAT
        </Button>
      </Link>
    </>
  );
};

const NavBarLinksLodger = ({ toggleMenu }) => {
  return (
    <>
      <Link
        to="/lodger/rental-rooms/all"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          PHÒNG ĐANG THUÊ
        </Button>
      </Link>
      <Link
        to="/lodger/tro-so/saved/all"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          ĐÃ LƯU
        </Button>
      </Link>
      <Link
        to="/lodger/contacts/all"
        onClick={toggleMenu}
        className="text-center"
      >
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          LIÊN HỆ
        </Button>
      </Link>
      <Link to="/lodger/chat" onClick={toggleMenu} className="text-center">
        <Button
          type="text"
          sx={{
            color: "black",
            "&:hover": {
              color: "primary.dark",
            },
            width: "100%",
          }}
        >
          Chat
        </Button>
      </Link>
    </>
  );
};

export { NavBarLinksOwner, NavBarLinksLodger };
