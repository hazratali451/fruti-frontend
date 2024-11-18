import Image from "next/image";

const UnderConstruction = () => {
	return (
		<div className="container py-5">
			<div className="text-center py-5">
				<Image
					width={320}
					height={320}
					src="/images/under-construction.jpg"
					alt=""
					className="mb-4"
				/>
				<h1 className="text-danger h1 mb-4">Under Construction</h1>
				<p className="text-muted m-0">
					আমরা এই পৃষ্ঠার উপর বর্তমানে কাজ করছি। অনুগ্রহ করে পরে আবার চেক
					করুন।
				</p>
			</div>
		</div>
	);
};

export default UnderConstruction;
