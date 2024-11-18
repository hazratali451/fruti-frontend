import {
	setAddToCart,
	setCartSidebarOpen,
	setRemoveAllFromCart,
} from "@/redux/slices/cartSlice";
import enToBnNumber from "@/utls/Language/entoBnNumber";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Language from "../helper/Language";
import { Star } from "./Icon";

const ProductCard = (props) => {
	const { img, price, rating, rating_count, weight, en, bn, sale_price } =
		props;
	const dispatch = useDispatch();
	const language = useSelector((state) => state.language.language);
	const router = useRouter();
	return (
		<>
			<div className="product-card">
				{en.discount_tag_text && (
					<span className="discount-tag">
						{
							<Language
								data={{
									en: en.discount_tag_text,
									bn: bn.discount_tag_text,
								}}
							/>
						}
					</span>
				)}
				<div className="position-relative">
					<span className="weight-tag">
						{
							<Language
								data={{
									en: "Net Weight : " + weight + "gm",
									bn: "নীট ওজনঃ " + enToBnNumber(weight) + " গ্রাম",
								}}
							/>
						}
					</span>
					<div className="img">
						<Image width={312} height={266} src={img} alt="" />
					</div>
				</div>
				<div className="content">
					<h4 className="title">
						{<Language data={{ en: en.title, bn: bn.title }} />}
					</h4>
					<h5 className="price">
						{language === "EN" ? (
							<>
								{en.discount_tag_text && (
									<del style={{ fontSize: "17px" }}>{price}</del>
								)}{" "}
								TK.
								{sale_price}
							</>
						) : (
							<>
								{bn.discount_tag_text && (
									<del>{enToBnNumber(price)} </del>
								)}
								{enToBnNumber(sale_price)} টাকা
							</>
						)}
					</h5>
					<div className="review">
						<Star />
						<span>
							{language === "EN" ? rating : enToBnNumber(rating)}
						</span>
						<span>
							(
							{language === "EN"
								? rating_count
								: enToBnNumber(rating_count)}
							)
						</span>
					</div>
					<div className="d-flex flex-wrap justify-content-center gap-3 mt-3 mt-sm-4 btn--group">
						<button
							className="btn btn-outline-base"
							onClick={() => {
								dispatch(setAddToCart(props));
								dispatch(setCartSidebarOpen("true"));
							}}
						>
							<Language
								data={{ en: "Add to Cart", bn: "ব্যাগে যুক্ত করুন" }}
							/>
						</button>
						<button
							onClick={() => {
								dispatch(setRemoveAllFromCart());
								dispatch(setAddToCart(props));
								router.push("/checkout");
							}}
							className="btn btn-base"
						>
							<Language data={{ en: "Buy Now", bn: "কিনুন" }} />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
