import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleRentDetailOwnerView,
  sendPaymentEmailToLodger,
  clearAlert,
} from "../../features/rentDetailOwner/rentDetailOwnerSlice";
import { useDispatch, useSelector } from "react-redux";
import { PageLoading, ConfirmModal, AlertToast } from "../../components";
import { Button, CircularProgress } from "@mui/material";
import {
  dateFormatter,
  format,
  calculateTotalRent,
  calculateNumberOfMonths,
} from "../../utils/valueFormatter";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const SendPaymentEmailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rentDetailId } = useParams();

  const {
    isLoading,
    rentDetail,
    isProcessing,
    alertFlag,
    alertMsg,
    alertType,
    success,
  } = useSelector((state) => state.rentDetailOwner);

  useEffect(() => {
    dispatch(getSingleRentDetailOwnerView({ rentDetailId }));
  }, [dispatch, rentDetailId]);

  // Redirect to detail page of the room after successful contract creation
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate(
          `/owner/rentDetail/${rentDetailId}/${rentDetail?.room.slug}`
        );
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, rentDetailId, rentDetail?.room.slug]);

  const handleAlertClose = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch(clearAlert());
    },
    [dispatch]
  );

  //modal state and handlers
  const [open, setOpen] = useState(false);
  const handleModalOpen = useCallback(() => setOpen(true), []);
  const handleModalClose = useCallback(() => setOpen(false), []);

  const [formValues, setFormData] = useState({});

  const handleSendConfirmation = (e) => {
    e.preventDefault();

    const emailTemplate = {
      to: rentDetail?.lodger?.email,
      from: rentDetail?.owner?.email,
      subject: `Thông báo thanh toán đến hạn`,
      body: `
      <p>
      Xin chào  ${rentDetail?.lodger?.lastName} ${rentDetail?.lodger?.firstName},</p>
              
              <p>Tôi là ${rentDetail?.owner?.lastName} ${rentDetail?.owner?.firstName}, đại diện bên cho thuê</p>
              <p>Tôi viết mail này để thông báo khoản thanh toán đến hạn. Dưới đây là danh sách các khoản chi phí </p>
              <p>Tiền thuê hằng tháng: ${format(rentDetail?.room?.price)}.VND</p>
              <p>Tiền điện: ${format(rentDetail?.electric)}.VND/kWh</p>
              <p>Tiền nước: ${format(rentDetail?.water)}.VND/m3</p>
              <p>Phí dịch vụ: ${format(rentDetail?.service)}.VND
              <p>Mong bạn sớm thanh toán những khoản phí trên</p>
              <p>Trân trọng,</p>
              <p>...............................</p>
              <p>
              ${rentDetail?.owner?.lastName} ${rentDetail?.owner?.firstName}
              </p>
              <p>
              ${rentDetail?.owner?.email}
              </p>
              <p>
              ${rentDetail?.owner?.phoneNumber}
              </p>
      `,
    };

    setFormData(emailTemplate);
    handleModalOpen();
  };

  const handleEmailSend = useCallback(() => {
    dispatch(sendPaymentEmailToLodger({ formValues }));
    handleModalClose();
  }, [dispatch, formValues, handleModalClose]);

  if (isLoading) return <PageLoading />;
  if (!rentDetail)
    return <h1 className="mt-6 text-center">Không tìm thấy chi tiết thuê</h1>;

  return (
    <main className="mt-10 mb-12 mx-8 md:mx-12">
      <div className="flex gap-2">
        <h4 className="mb-4 font-heading font-bold">Nhắc nhở thanh toán</h4>
        <ForwardToInboxRoundedIcon color="tertiary" />
      </div>
      <div className=" shadow-lg rounded-md p-4  overflow-auto">
        <form onSubmit={handleSendConfirmation}>
          <div className="flex mt-4 gap-2 items-center">
            <span className="font-semibold"> To: </span>
            <p className="">{rentDetail?.lodger?.email}</p>
          </div>
          <div className="flex mt-2 gap-2 items-center">
            <span className="font-semibold"> From: </span>
            <p className="">{rentDetail?.owner?.email}</p>
          </div>
          <div className="flex mt-2 gap-2 items-center">
            <span className="font-semibold"> Subject: </span>
            <p>
              Thông báo thanh toán đến hạn
            </p>
          </div>
          <div className="flex mt-2 gap-2 items-start">
            <span className="font-semibold"> Body: </span>
            <div className="text-sm mt-1">
              <p>
                Xin chào {rentDetail?.lodger?.lastName}{" "}{rentDetail?.lodger?.firstName},
              </p>
              <br />
              <p>
                Tôi là {rentDetail?.owner?.lastName}{" "}{rentDetail?.owner?.firstName}, đại diện bên cho thuê
              </p>
              <p>
              Tôi viết mail này để thông báo khoản thanh toán đến hạn. Dưới đây là danh sách các khoản chi phí 
              </p>
              <p>Tiền thuê hằng tháng: {format(rentDetail?.room?.price)}.VND</p>
              <p>Tiền điện: {format(rentDetail?.electric)}.VND/kWh</p>
              <p>Tiền nước: {format(rentDetail?.water)}.VND/m3</p>
              <p>Phí dịch vụ: {format(rentDetail?.service)}.VND</p>
              <p>Mong bạn sớm thanh toán những khoản phí trên</p>
              <p>Trân trọng,</p>
              <p>...............................</p>
              <p>
              {rentDetail?.owner?.lastName} {rentDetail?.owner?.firstName}
              </p>
              <p>
              {rentDetail?.owner?.email}
              </p>
              <p>
              {rentDetail?.owner?.phoneNumber}
              </p>
            </div>
          </div>
          <div className="flex mt-2 gap-2 justify-end py-2">
            <Button
              disabled={isProcessing}
              type="submit"
              variant="contained"
              color="tertiary"
              sx={{ color: "#fff" }}
              startIcon={<SendRoundedIcon />}
            >
              {isProcessing ? (
                <CircularProgress
                  size={26}
                  sx={{
                    color: "#fff",
                    width: "25%",
                  }}
                />
              ) : (
                "Gửi Email"
              )}
            </Button>
          </div>
        </form>
      </div>
      <ConfirmModal open={open} handleModalClose={handleModalClose}>
        <h3 className="text-center">Gửi Email</h3>
        <p className="text-center my-4">
          Xác nhận gửi mail?
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <Button onClick={handleModalClose} color="error">
            Không
          </Button>

          <Button onClick={handleEmailSend} color="success" variant="contained">
            Có
          </Button>
        </div>
      </ConfirmModal>
      <AlertToast
        alertFlag={alertFlag}
        alertMsg={alertMsg}
        alertType={alertType}
        handleClose={handleAlertClose}
      />
    </main>
  );
};

export default SendPaymentEmailPage;
