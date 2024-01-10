import Profile from '@/components/shared/forms/profile';
import ProfilePicture from '@/components/shared/forms/profile-picture';
import { Button } from '@/components/ui/button';
import { fetchAdminProfile } from '@/lib/actions/auth.action';
import { dateFormat } from '@/lib/helpers/formater';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
import ProfileLoading from './loading';

const AdminProfilePage = async () => {
	const result = await fetchAdminProfile();
	if (!result || !result.profile) return <ProfileLoading />;
	return (
		<div className="dashboard-col-space">
			{result && result.profile && (
				<div className="flex md:items-end justify-between max-md:flex-col gap-[15px]">
					<div className="flex xm:items-center gap-[15px] max-xm:flex-col">
						<ProfilePicture
							previewUrl={
								result.avatar
									? `/uploads/avatar/${result.avatar?.url}`
									: null
							}
							isThumbnail={result.avatar ? true : false}
							pageUrl={'/admin/profile'}
							frameClass={'h-[120px] w-[120px] rounded-full'}
							thumbnailClass={'h-[120px] w-[120px] rounded-full'}
						/>
						<div className="flex flex-col gap-2">
							<div>
								<h3 className="heading-3">
									{result?.profile?.firstName}{' '}
									{result?.profile?.lastName}
								</h3>
								<span className="text-base-2">
									{result?.profile?.email}
								</span>
							</div>
							<div className="flex items-center text-primary-gray gap-[5px]">
								<CalendarDays size={20} />
								<span className="text-base-2 mt-1">
									Joined{' '}
									{dateFormat(result?.profile?.createdAt)}
								</span>
							</div>
						</div>
					</div>
					<div className="flex xm:justify-end">
						<Link href="/admin/files">
							<Button className="btn-primary-lg">
								Edit Password
							</Button>
						</Link>
					</div>
				</div>
			)}
			<Profile />
		</div>
	);
};

export default AdminProfilePage;