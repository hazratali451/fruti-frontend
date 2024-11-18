/* eslint-disable react-hooks/exhaustive-deps */
import { setUpdateCartProduct } from "@/redux/slices/cartSlice";
import ProductCard from "@/src/components/ProductCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProductSection = ({ products }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (products?.length) {
			dispatch(setUpdateCartProduct(products));
		}
	}, [products]);

	return (
		<section className="product-section">
			<div className="container">
				<div className="row g-2 g-md-4 justify-content-center">
					{products?.map((item, index) => (
						<div className="col-xxl-3 col-lg-4 col-6" key={index}>
							<ProductCard {...item} index={index} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProductSection;
