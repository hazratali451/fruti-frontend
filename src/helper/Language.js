import { useSelector } from "react-redux";

const Language = ({ data }) => {
	const { language } = useSelector((state) => state.language);

	if (language === "BN") {
		return data.bn;
	} else {
		return data.en;
	}
};

export default Language;
