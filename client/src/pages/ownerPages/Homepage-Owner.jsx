import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPersonalRoom } from "../../features/roomOwner/roomOwnerSlice";
import { Footer, RoomCard } from "../../components";
import { Button, Pagination, CircularProgress } from "@mui/material";

const Homepage = () => {
  const dispatch = useDispatch();

  const { allRoom, isLoading, numberOfPages } = useSelector(
    (store) => store.roomOwner
  );

  // state to store page number
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPersonalRoom({ page }));
  }, [dispatch, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (allRoom?.length === 0)
    return (
      <div className="mx-auto text-center mt-8">
        <h4 className="mb-4">Bạn chưa giới thiệu phòng trọ nào</h4>
        <Button
          href="#/owner/room/post"
          variant="contained"
          sx={{ color: "#fff" }}
        >
          ĐĂNG BÀI
        </Button>
      </div>
    );
  return (
    <>
      <div className="flex flex-col mt-8 mb-12 md:items-start md:ml-10">
        <h3 className="my-4 font-heading font-bold text-center">
          {allRoom?.length > 1 ? "Rooms" : "Danh sách phòng cho thuê"}
        </h3>
        {isLoading ? (
          <div className="flex justify-center mt-12 h-64 mx-auto">
            <CircularProgress size={"6rem"} />
          </div>
        ) : (
          <main className="flex flex-wrap gap-8 justify-center md:justify-start mx-4 md:mx-0">
            {allRoom?.map((item) => {
              return <RoomCard key={item._id} {...item} fromOwnerUser />;
            })}
          </main>
        )}
      </div>

      <Pagination
        count={numberOfPages || 1}
        page={page}
        onChange={handlePageChange}
        color="secondary"
        className="flex justify-center mb-12"
      />
      <Footer />
    </>
  );
};

export default Homepage;
