import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllContacts,
  createContract,
  clearAlert,
} from "../../features/ownerUser/ownerUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, AlertToast, ConfirmModal } from "../../components";
import { Button, CircularProgress, TextField, MenuItem } from "@mui/material";
import moment from "moment";
import contractImage from "../../assets/images/createContract.svg";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

const CreateContractPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const province = useLocation();
  const { roomId, title, price, slug } = province?.state; // state is passed from the previous page

  const { contacts, isProcessing, success, alertFlag, alertMsg, alertType } =
    useSelector((state) => state.ownerUser);

  useEffect(() => {
    dispatch(getAllContacts({ name: "" }));
  }, [dispatch]);

  const [contractForm, setContractFrom] = useState({
    lodger: "",
    room: roomId,
    rentAmount: price,
    contractTerm: "",
  });

  const [date, setDate] = useState(null);

  const handleChange = useCallback(
    (e) => {
      setContractFrom({ ...contractForm, [e.target.name]: e.target.value });
    },
    [contractForm]
  );

  const contractTerms = [
    "1 tháng",
    "3 tháng",
    "6 tháng",
    "12 tháng",
  ];

  // Redirect to detail page of the room after successful contract creation
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate(`/owner/tro-so/${slug}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, slug]);

  const handleAlertClose = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch(clearAlert());
    },
    [dispatch]
  );

  //modal
  const [open, setOpen] = useState(false);
  const handleModalOpen = useCallback(() => setOpen(true), []);
  const handleModalClose = useCallback(() => setOpen(false), []);

  const [formData, setFormData] = useState({});
  const handleConfirmation = (e) => {
    e.preventDefault();
    const { lodger, room, rentAmount, contractTerm } = contractForm;
    setFormData({
      lodger,
      room,
      rentAmount,
      contractTerm,
      startDate: moment(date).format("YYYY-MM").concat("-01"),
    });

    handleModalOpen();
  };

  const handleCreateContract = useCallback(() => {
    dispatch(createContract({ formData }));
    handleModalClose();
  }, [dispatch, formData, handleModalClose]);

  return (
    <main className="flex flex-row mb-8 md:mb-0">
      <div className="mt-10 flex flex-col items-center md:ml-14 md:items-start">
        <div className="mb-6">
          <h3 className="font-heading font-bold">Tạo hợp đồng</h3>
        </div>
        <div className="mb-4 flex items-center">
          <h5 className="font-semibold">Tên phòng: </h5>
          <h5 className="ml-2">{title}</h5>
        </div>
        <div className="">
          <form id="form" onSubmit={handleConfirmation}>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <TextField
                select
                required
                label="Bên đại diện thuê"
                value={contractForm.lodger}
                onChange={handleChange}
                sx={{ width: "300px" }}
                name="lodger"
                color="tertiary"
              >
                {contacts?.map((user) => (
                  <MenuItem key={user._id} value={user._id} className="">
                    {user.firstName} {user.lastName}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker
                label="Bắt đầu ngày"
                value={date}
                views={["year", "month"]}
                handleChange={useCallback(
                  (date) => {
                    setDate(date);
                  },
                  [setDate]
                )}
              />

              <TextField
                select
                required
                label="Thời hạn hợp đồng"
                value={contractForm.contractTerm}
                onChange={handleChange}
                sx={{ width: "300px" }}
                name="contractTerm"
                color="tertiary"
              >
                {contractTerms.map((option, index) => (
                  <MenuItem key={index} value={option} className="">
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Tạm tính"
                value={contractForm.rentAmount}
                name="rentAmount"
                color="tertiary"
                sx={{ width: "300px" }}
                disabled
              />
            </div>
            <div className="text-center mt-4 mb-6">
              <Button
                disabled={
                  isProcessing || (alertFlag && alertType === "success")
                }
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
                startIcon={<BorderColorRoundedIcon />}
              >
                {isProcessing ? (
                  <CircularProgress
                    size={26}
                    sx={{
                      color: "#fff",
                    }}
                  />
                ) : (
                  "Tạo"
                )}
              </Button>
            </div>
          </form>
        </div>

        <div>
          <ConfirmModal open={open} handleModalClose={handleModalClose}>
            <h3 className="text-center">Xác nhận tạo hợp đồng?</h3>
            <p className="text-center my-4">
                Chắc chắn tạo hợp đồng? Một khi bạn đã tạo hợp đồng, bạn không thể chỉnh sửa mà chỉ có thể xóa nó. Hợp đồng sẽ được gửi cho bên thuê để xem xét
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <Button onClick={handleModalClose} color="error">
                Không
              </Button>

              <Button
                onClick={handleCreateContract}
                color="success"
                variant="contained"
              >
                Có
              </Button>
            </div>
          </ConfirmModal>
        </div>
      </div>

      <div className="hidden md:block mx-auto mt-10 mb-6 md:mb-0">
        <img src={contractImage} alt="" />
      </div>

      <AlertToast
        alertFlag={alertFlag}
        alertMsg={alertMsg}
        alertType={alertType}
        handleClose={handleAlertClose}
      />
    </main>
  );
};

export default CreateContractPage;
