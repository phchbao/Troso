import mongoose from "mongoose";

const RentDetailSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "OwnerUser",
      required: true,
    },
    lodger: {
      type: mongoose.Types.ObjectId,
      ref: "LodgerUser",
      required: true,
    },
    room: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    contractTerm: {
      type: String,
      enum: {
        values: [
          "1 tháng",
          "3 tháng",
          "6 tháng",
          "12 tháng",
        ],
        message: "{VALUE} is not supported",
      },
      required: [true, "Please provide a plan"],
      default: "1 tháng",
    },
    startDate: {
      type: String,
      required: [true, "Please provide a start date"],
    },
    currentRentDate: {
      from: {
        type: String,
        required: [true, "Please provide a start date"],
      },
      to: {
        type: String,
        required: [true, "Please provide an end date"],
      },
    },
    electric: {
      type: Number,
      required: [true, "Nhập giá điện"],
      min: [1500, "Giá điện không rẻ hơn 1500 đồng/kWh"],
      max: [2500, "Giá điện không đắt hơn 2500 đồng/kWh"]
    },
    water: {
      type: Number,
      required: [true, "Nhập giá nước"],
      min: [2000, "Giá nước không rẻ hơn 2000 đồng/m3"],
      max: [18000, "Giá nước không đắt hơn 18000 đồng/m3"]
    },
    service: {
      type: Number,
      required: [true, "Nhập giá dịch vụ"],
      min: [0, "Giá dịch vụ không bé hơn 0"],
    },
  },
  { timestamps: true }
);

//check if rent is paid for current month
RentDetailSchema.methods.isRentPaid = async function () {
  const rentDeadline = new Date(this.currentRentDate.to);
  const today = new Date();
  return today <= rentDeadline;
};

export default mongoose.model("RentDetail", RentDetailSchema);
