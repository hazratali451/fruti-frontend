/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Layout from "@/src/components/Layout";
import Language from "@/src/helper/Language";
import { useRouter } from "next/router";

const AccountPage = () => {
	const router = useRouter();

	return (
		<Layout>
			<div className="py-5">
				<div className="container py-md-5">
					<Stepper step={"account"} />
					<div className="auth-form">
						<div className="auth-inner">
							<div className="text-center">
								{/* <h4 className="title">
                  <Language
                    data={{
                      en: "Login",
                      bn: "লগইন করুন",
                    }}
                  />
                </h4> */}
								<p>
									<Language
										data={{
											en: 'You can order without login, click the "Checkout as Guest" button below to order without login. And click the "Checkout After Login" button below to order by login.',
											bn: 'আপনি চাইলে লগইন না করেই অর্ডার করতে পারবেন, লগইন না করে অর্ডার করার জন্য নিচে থেকে "লগিন ছাড়াই অর্ডার করুন" বাটন এ ক্লিক করুন । আর লগইন করে অর্ডার করার জন্য নিচে থেকে "লগিন করে অর্ডার করুন" বাটন এ ক্লিক করুন ।',
										}}
									/>
								</p>
							</div>
							<div className="row g-4">
								{/* <div className="col-12">
                  <Input
                    type={"tel"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    label={convertLang({
                      en: "Phone Number",
                      bn: "ফোন নম্বর",
                    })}
                    placeholder="+880 00000000000"
                  />
                </div> */}
								<div className="col-12">
									<button
										onClick={() =>
											router.push("/login?redirect=checkout")
										}
										type="submit"
										className="btn btn-base w-100 h-48"
									>
										<Language
											data={{
												bn: "লগইন করে অর্ডার করুন",
												en: "Checkout After Login",
											}}
										/>
									</button>
								</div>
								<div className="col-12">
									<span className="or">
										<span>
											<Language data={{ en: "Or", bn: "অথবা" }} />
										</span>
									</span>
								</div>
								<div className="col-12">
									<button
										type="button"
										className="btn btn-outline-base w-100 h-48"
										onClick={() => router.push("/checkout")}
									>
										<Language
											data={{
												en: "Checkout as Guest",
												bn: "লগিন ছাড়াই অর্ডার করুন",
											}}
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export const Stepper = ({ step }) => {
	return (
		<>
			<div className="d-flex justify-content-center mb-30">
				<ul className="cart-step-list">
					<li className={`${step === "account" ? "current" : "done"}`}>
						<span>
							<CheckIcon />
						</span>{" "}
						<Language data={{ en: "Login", bn: "লগইন" }} />
					</li>
					<li
						className={`${
							step === "checkout"
								? "current"
								: step === "thank-you"
								? "done"
								: ""
						}`}
					>
						<span>
							<CheckIcon />
						</span>{" "}
						<Language
							data={{ en: "Delivery Info", bn: "ডেলিভেরি তথ্য" }}
						/>
					</li>
					<li className={`${step === "thank-you" ? "current" : ""}`}>
						<span>
							<CheckIcon />
						</span>{" "}
						<Language data={{ en: "Payment", bn: "পেমেন্ট" }} />
					</li>
				</ul>
			</div>
		</>
	);
};
const CheckIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		dataSlot="icon"
		width={10}
		height={10}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="m4.5 12.75 6 6 9-13.5"
		/>
	</svg>
);

export default AccountPage;
