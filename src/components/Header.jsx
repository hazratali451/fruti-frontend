/* eslint-disable react-hooks/exhaustive-deps */
import { useLoginQuery } from "@/redux/slices/apiSlices/AuthApiSlice";
import { setCartSidebarOpen } from "@/redux/slices/cartSlice";
import { setLanguageDispatch } from "@/redux/slices/languageSlice";
import { setUserDispatch } from "@/redux/slices/userSlice";
import enToBnNumber from "@/utls/Language/entoBnNumber";
import Loader from "@/utls/Loader/Loader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import Language from "../helper/Language";
import { CartIcon, ClearIcon, Hamburger } from "./Icon";

const Header = () => {
	const [activeLang, setActiveLang] = useState(langData[1]);
	const [open, setOpen] = useState(false);
	// const [openDelivery, setOpenDelivery] = useState(true);
	const { language } = useSelector((state) => state.language);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const { isLoading, isSuccess, data } = useLoginQuery(cookies?.login_token);

	useEffect(() => {
		if (language) {
			const langObj = langData.find((item) => item.title === language);
			if (langObj) {
				setActiveLang(langObj);
			}
		}
	}, [language]);

	// useEffect(() => {
	// 	const openDelivery = localStorage.getItem("openDelivery");

	// 	if (openDelivery) {
	// 		setOpenDelivery(false);
	// 	}
	// }, []);

	const handleLangChange = (lang) => {
		setActiveLang(lang);
		dispatch(setLanguageDispatch(lang.title));
	};

	const cart = useSelector((state) => state.cart);
	const { cartList, cartSidebarOpen } = cart;
	const [userDispatched, setUserDispatched] = useState(false);

	/* Interaction according to API response */
	if (isLoading) {
		<Loader />;
	}

	useEffect(() => {
		if (isSuccess && !userDispatched) {
			dispatch(setUserDispatch(data.user));
			setUserDispatched(true); // Set the flag to true to prevent multiple dispatches
		}
	}, [isSuccess, dispatch, data?.user, userDispatched]);

	return (
		<>
			<header>
				<div className="container">
					<div className="header-wrapper">
						<Link className="logo" href="/">
							<Image
								width={162}
								height={86}
								src={"/images/logo.png"}
								alt={"logo"}
							/>
						</Link>
						<div className="menu-wrapper">
							<ul className={`menu ${open ? "active" : ""}`}>
								<li className="clear-icon d-md-none">
									<Link className="logo" href="/">
										<Image
											width={162}
											height={86}
											src={"/images/logo.png"}
											alt={"logo"}
										/>
									</Link>
									<button
										onClick={() => setOpen(false)}
										type="button"
										className="p-0 m-0 outline-0 border-0 bg-transparent"
									>
										<ClearIcon />
									</button>
								</li>
								<li>
									<Link href="/" onClick={() => setOpen(false)}>
										<Language
											data={{
												bn: "হোম",
												en: "Home",
											}}
										/>
									</Link>
								</li>
								{/* <li>
									<Link
										href="/order-tracking"
										onClick={() => setOpen(false)}
									>
										<Language
											data={{
												bn: "অর্ডার ট্রাকিং",
												en: "Order Tracking",
											}}
										/>
									</Link>
								</li> */}
								<li>
									<Link
										href="/contact-us"
										onClick={() => setOpen(false)}
									>
										<Language
											data={{
												bn: "যোগাযোগ করুন",
												en: "Contact Us",
											}}
										/>
									</Link>
								</li>
								{!user && (
									<li className="d-md-none">
										<Link
											href="/login"
											onClick={() => setOpen(false)}
										>
											<Language
												data={{
													bn: "লগইন করুন",
													en: "Login",
												}}
											/>
										</Link>
									</li>
								)}
							</ul>
							<div className="right-icons ms-auto">
								{!user ? (
									<Link
										href="/login"
										className="login d-none d-md-block"
									>
										<Language
											data={{
												bn: "লগইন করুন",
												en: "Login",
											}}
										/>
									</Link>
								) : (
									""
								)}
								<Dropdown>
									<Dropdown.Toggle>
										<Image
											src={activeLang.img}
											width={20}
											height={20}
											alt={activeLang.title}
										/>{" "}
										{activeLang.title === "EN" ? "English" : "বাংলা"}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{langData.map((item, index) => (
											<Dropdown.Item
												key={index}
												onClick={() => handleLangChange(item)}
											>
												<Image
													src={item.img}
													width={20}
													height={20}
													alt={item.title}
												/>{" "}
												{item.title === "EN" ? "English" : "বাংলা"}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Dropdown>
								<button
									className="btn cart-icon p-0 outline-0 border-0"
									onClick={() =>
										dispatch(
											setCartSidebarOpen(
												cartSidebarOpen === "true"
													? "false"
													: "true"
											)
										)
									}
								>
									<span className="badge-count">
										{language === "EN"
											? cartList?.length || 0
											: enToBnNumber(cartList?.length) || "০"}
									</span>
									<CartIcon />
								</button>
								<div className="d-md-none">
									<button
										type="button"
										className="p-0 m-0 border-0 outline-0 hamburger"
										onClick={() => setOpen(true)}
									>
										<Hamburger />
									</button>
								</div>
							</div>
							{user && (
								<Dropdown className="profile-menu-dropdown">
									<Dropdown.Toggle>
										<Image
											src={"/images/user.jpeg"}
											width={20}
											height={20}
											alt={""}
										/>
									</Dropdown.Toggle>
									<Dropdown.Menu align={"end"}>
										<Dropdown.Item>
											<Link href="/dashboard">
												<Language
													data={{
														bn: "আমার অর্ডার",
														en: "My Orders",
													}}
												/>
											</Link>
										</Dropdown.Item>
										<Dropdown.Item>
											<Link
												onClick={() => {
													removeCookie("login_token");
													removeCookie("token");
													dispatch(setUserDispatch(null));
												}}
												href="/"
											>
												<Language
													data={{
														bn: "লগ আউট",
														en: "Log out",
													}}
												/>
											</Link>
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							)}
						</div>
					</div>
				</div>
			</header>
			{open && (
				<div
					className="backdrop d-md-none"
					onClick={() => setOpen(false)}
				/>
			)}
			{/* <Modal
				show={openDelivery}
				centered
				onHide={() => {
					localStorage.setItem("openDelivery", "true");
					setOpenDelivery(false);
				}}
			>
				<ModalBody>
					<div className="d-flex justify-content-end">
						<button
							onClick={() => {
								localStorage.setItem("openDelivery", "true");
								setOpenDelivery(false);
							}}
							type="button"
							className="p-0 m-0 outline-0 border-0 bg-transparent"
							style={{ opacity: 0.6 }}
						>
							<ClearIcon />
						</button>
					</div>
					<div className="text-center pb-4 px-4">
						<Image
							style={{ objectFit: "contain" }}
							src="/images/delivery-man.png"
							width={130}
							height={130}
							alt="delivery"
						/>
						<h5 className="mt-3 mb-4">ডেলিভারি নোটিশ</h5>
						<div className="text-start">
							<div className="mb-2">
								<strong className="text-title">
									প্রিয় গ্রাহকবৃন্দ
								</strong>{" "}
								,
							</div>
							<div className="mb-3">
								ঈদ উল আযহার জন্য এই মুহুর্তে ডেলিভারি বন্ধ আছে, তবে
								অর্ডার করে রাখতে পারবেন, আগামী ২০ তারিখ থেকে ডেলিভারি
								পুনরায় শুরু হবে ইনশাআল্লাহ।{" "}
							</div>
							ঈদ মুবারাক,
							<strong className="text-title">বগুড়া থেকে</strong>
						</div>
					</div>
				</ModalBody>
			</Modal> */}
		</>
	);
};
const langData = [
	{
		img: "/images/lang/en.png",
		title: "EN",
	},
	{
		img: "/images/lang/bd.png",
		title: "BN",
	},
];
export default Header;
