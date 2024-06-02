import React, { useEffect, useState, useCallback } from "react";
import {
  Logo,
  FormTextField,
  FormPasswordField,
  FormSelectField,
  AlertToast,
  DatePicker,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  registerOwner,
  registerLodger,
  clearAlert,
  stateClear,
} from "../features/auth/authSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import registerImg from "../assets/images/registerImg.svg";
import { Button, CircularProgress } from "@mui/material";
import moment from "moment";

const Register = () => {
  const { success, userType, errorFlag, errorMsg, isLoading, alertType } =
    useSelector((store) => store.auth);
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      navigate(`/account-created/${userType}`);
      dispatch(stateClear());
    }
  }, [success, navigate, userType, dispatch]);

  const [values, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    gender: "",
    password: "",
    retypedPassword: "",
  });

  const [date, setDate] = useState(null);

  // preview image
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const previewImage = () => {
    if (image) {
      return (
        <div className="p-2">
          <img src={image} alt="profilePreview" className="h-24 md:h-28" />
        </div>
      );
    }
  };

  const handleChange = useCallback(
    (e) => {
      setFormValues({ ...values, [e.target.name]: e.target.value });
    },
    [values]
  );

  const isValidPassword = (password) => {
    // Kiểm tra mật khẩu chứa ít nhất một chữ thường, một chữ hoa, một kí tự đặc biệt và một số
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    return (
      lowerCaseRegex.test(password) &&
      upperCaseRegex.test(password) &&
      specialCharRegex.test(password) &&
      numberRegex.test(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu
    if (!isValidPassword(values.password)) {
      // Hiển thị thông báo lỗi
      alert(
        "Mật khẩu phải dài tối thiểu 8 kí tự, chứa ít nhất một chữ thường, một chữ hoa, một kí tự đặc biệt và một số."
      );
      return;
    }
     if(values.password!=values.retypedPassword){alert ("Mật khẩu nhập lại không khớp"); return;}

    // Tiếp tục xử lý đăng ký nếu mật khẩu hợp lệ
    const form = document.getElementById("form");
    const formData = new FormData(form);
    formData.append("role", param.role);

    if (!date) {
      setDate(new Date());
      return;
    }

    const formattedDate = moment(date).format("DD-MM-YYYY");
    formData.append("dateOfBirth", formattedDate);

    if (param.role === "owner") {
      dispatch(registerOwner({ formData }));
    } else if (param.role === "lodger") {
      dispatch(registerLodger({ formData }));
    }
  };

  const handleClose = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch(clearAlert());
    },
    [dispatch]
  );

  return (
    <div>
      <header className="flex m-1 shadow-sm">
        <Logo />
        <div className="flex flex-col justify-center ml-2">
          <h5 className="font-display">Trọ số</h5>
          <p className="hidden text-xs md:block md:text-sm">since 2024</p>
        </div>
      </header>

      <main className="px-6 h-full mt-7 mb-12">
        <div className="flex lg:justify-between justify-center items-start flex-wrap h-full g-6">
          <div className="lg:w-5/12 md:w-8/12">
            <form onSubmit={handleSubmit} id="form">
              <div className="flex justify-center mt-3 mb-4">
                <h4 className="text-center">Đăng kí tài khoản mới</h4>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:ml-16">
                <FormTextField
                  label="Họ"
                  name="lastName"
                  type="text"
                  value={values.lastName}
                  handleChange={handleChange}
                />
                <FormTextField
                  label="Tên"
                  name="firstName"
                  type="text"
                  value={values.firstName}
                  handleChange={handleChange}
                  autoFocus={true}
                />
                <FormTextField
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  handleChange={handleChange}
                />
                <FormTextField
                  label="Địa chỉ"
                  name="address"
                  type="text"
                  value={values.address}
                  handleChange={handleChange}
                />
                <FormTextField
                  label="Số điện thoại"
                  name="phoneNumber"
                  type="text"
                  value={values.phoneNumber}
                  handleChange={handleChange}
                />
                <DatePicker
                  value={date}
                  label="Ngày sinh"
                  handleChange={useCallback(
                    (date) => {
                      setDate(date);
                    },
                    [setDate]
                  )}
                />
                <FormSelectField
                  label="Giới tính"
                  name="gender"
                  options={["Nam", "Nữ", "Không muốn trả lời"]}
                  value={values.gender}
                  handleChange={handleChange}
                />

                <div className="flex flex-col justify-center my-2">
                  <label
                    htmlFor="profileImg"
                    className="mb-2 cursor-pointer font-robotoNormal self-center"
                  >
                    Chọn ảnh đại diện
                  </label>

                  <input
                    required
                    name="profileImage"
                    className="font-robotoNormal w-full px-3 py-1.5 text-base font-normal border border-solid border-gray-300 rounded cursor-pointer focus:border-primary focus:outline-none"
                    type="file"
                    id="profileImg"
                    onChange={handleImageChange}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Hỗ trợ JPG, JPEG, PNG hoặc GIF (Tối đa 3.5MB)
                  </p>
                  <div className="self-center border mt-2">
                    {previewImage()}
                  </div>
                </div>

                <FormPasswordField
                  label="Mật khẩu"
                  name="password"
                  value={values.password}
                  handleChange={handleChange}
                />
                <FormPasswordField
                  label="Nhập lại mật khẩu"
                  name="retypedPassword"
                  value={values.retypedPassword}
                  handleChange={handleChange}
                />
              </div>

              <div className="text-center mt-6">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  disabled={isLoading}
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      sx={{
                        color: "#fff",
                      }}
                    />
                  ) : (
                    "ĐĂNG KÍ"
                  )}
                </Button>
                <p className="text-sm font-medium mt-2 pt-1 mb-0 md:text-base">
                  Bạn đã có tài khoản?{" "}
                  <Link
                    to={`/login/${param.role}`}
                    className="text-secondary hover:text-secondaryDark transition duration-200 ease-in-out"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="hidden md:w-6/12 mb-12 md:mb-0 md:block mt-8">
            <img src={registerImg} className="w-full" alt="login banner" />
          </div>
        </div>
      </main>
      <AlertToast
        alertFlag={errorFlag}
        alertMsg={errorMsg}
        alertType={alertType}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Register;
