import Layout from "@/src/components/Layout";

const DashboardLayout = ({ children }) => {
	return (
		<>
			<Layout>
				<div className="py-5">
					<div className="container">{children}</div>
				</div>
			</Layout>
		</>
	);
};

export default DashboardLayout;
