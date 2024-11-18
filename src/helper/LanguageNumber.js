import enToBnNumber from "@/utls/Language/entoBnNumber";
import { useSelector } from "react-redux";

const LanguageNumber = ({ number }) => {
  const { language } = useSelector((state) => state.language);

  if (language === "BN") {
    return enToBnNumber(number);
  } else {
    return number;
  }
};

export default LanguageNumber;
