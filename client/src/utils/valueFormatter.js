import moment from "moment";

export const { format } = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
});

export const dateFormatter = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const ageCalculator = (date) => {
  return moment().diff(date, "years");
};

// calculate the total rent amount according to payment plan
export const calculateTotalRent = (contractTerm, price) => {
  if (contractTerm === "1 tháng") return price;
  if (contractTerm === "3 tháng") return price * 3;
  if (contractTerm === "6 tháng") return price * 6;
  if (contractTerm === "12 tháng") return price * 12;
};

// calculate number of months according to payment plan
export const calculateNumberOfMonths = (contractTerm) => {
  if (contractTerm === "1 tháng") return "1 tháng";
  if (contractTerm === "3 tháng") return "3 tháng";
  if (contractTerm === "6 tháng") return "6 tháng";
  if (contractTerm === "12 tháng") return "12 tháng";
};

// calculate the added date according to payment plan
export const calculateAddedDate = (contractTerm, currentRentDate) => {
  if (contractTerm === "1 tháng")
    return moment(currentRentDate)
      .add(0, "months")
      .endOf("month")
      .endOf("month")
      .format("YYYY-MM-DD");
  if (contractTerm === "3 tháng")
    return moment(currentRentDate)
      .add(2, "months")
      .endOf("month")
      .format("YYYY-MM-DD");
  if (contractTerm === "6 tháng")
    return moment(currentRentDate)
      .add(5, "months")
      .endOf("month")
      .format("YYYY-MM-DD");
  if (contractTerm === "12 tháng")
    return moment(currentRentDate)
      .add(11, "months")
      .endOf("month")
      .format("YYYY-MM-DD");
};

// calculate the next due date according to last payment date
export const calculateNextDueDate = (lastPaymentDate) => {
  return moment(lastPaymentDate).add(1, "d").format("DD-MM-YYYY");
};
