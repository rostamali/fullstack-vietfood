import { CircleDollarSign } from 'lucide-react';

const UserAccountPage = () => {
	return (
		<div className="dashboard-col-space">
			<div className="grid grid-cols-4 gap-5">
				{[1, 2, 3, 4].map((item, index) => (
					<div className="bg-white p-4 rounded-md" key={index}>
						<div className="flex items-center gap-4">
							<div className="h-[45px] w-[45px] flex-center bg-gray-light rounded-md text-action-success">
								<CircleDollarSign size={24} />
							</div>
							<div>
								<h6 className="heading-6">Savings</h6>
								<h3 className="heading-3">$41,210</h3>
							</div>
						</div>
					</div>
				))}
				<div className="col-span-2 bg-white p-4 rounded-md">sds</div>
				<div className="col-span-2 bg-white p-4 rounded-md">GDJS</div>
			</div>
		</div>
	);
};

export default UserAccountPage;
