import numeral from "numeral";

function dollarFilter(value) {
  if (!value) {
    return "$0.00";
  }
  return numeral(value).format("$0,0.00");
}

function percentFilter(value) {
  if (!value) {
    return "0%";
  }
  return `${parseFloat(value).toFixed(2)}%`;
}

export { dollarFilter, percentFilter };
