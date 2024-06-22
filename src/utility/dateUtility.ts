import moment from "moment";

const DATE_FORMAT_FOR_INPUT_VALUES = "YYYY-MM-DD";
const DATE_FORMAT = "DD-MM-YY";

export const formatDate = (date: Date) => {
  return moment(date).format(DATE_FORMAT);
};

export const formatDateForInputValue = (date: Date) => {
  return moment(date).format(DATE_FORMAT_FOR_INPUT_VALUES);
};
