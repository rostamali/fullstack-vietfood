import Pie from '@/components/elements/charts/pie';
import { CircleDollarSign } from 'lucide-react';
export const metadata = {
	title: 'Admin Dashboard - Vietfood E-commerce Management',
};

const AdminDashboard = () => {
	return (
		<div className="dashboard-col-space">
			<div className="space-y-5">
				<div className="grid grid-cols-[1fr,350px] gap-5">
					<div className="grid grid-cols-2 gap-5">
						{[1, 2, 3, 4].map((item, index) => (
							<div
								className="bg-white p-4 rounded-md"
								key={index}
							>
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
					</div>
					<div className="bg-white p-4 rounded-md">
						<h6 className="heading-6">Users</h6>
						<h3 className="heading-3">210</h3>
						<div className="grid grid-cols-2 gap-4 items-center">
							<div className="space-y-1">
								{PieData.map((item, index) => (
									<div key={index}>
										<div className="flex items-center gap-1">
											<div
												className={`h-[10px] w-[20px] ${item.color} rounded-sm`}
											></div>
											<p className="text-base-1">
												{item.value}
											</p>
											<p className="text-base-1">
												{item.label}
											</p>
										</div>
									</div>
								))}
							</div>
							<div className="">
								<Pie />
							</div>
						</div>
					</div>
				</div>
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
				</div>
				<div className="grid grid-cols-2 gap-5">
					<div className="bg-white p-4 rounded-md">sales Graph</div>
					<div className="bg-white p-4 rounded-md">
						#Recent order 1. User-Country-Date-Status
					</div>
				</div>
			</div>
		</div>
	);
};

const PieData = [
	{
		color: 'bg-[#FF6A6A]',
		value: 50,
		label: 'New user',
	},
	{
		color: 'bg-[#8FB7CD]',
		value: 38,
		label: 'Active',
	},
	{
		color: 'bg-[#CDC2C3]',
		value: 12,
		label: 'Paid',
	},
	{
		color: 'bg-[#53FFE1]',
		value: 70,
		label: 'NInactive',
	},
	{
		color: 'bg-[#5891B1]',
		value: 32,
		label: 'Trail',
	},
];

export default AdminDashboard;
