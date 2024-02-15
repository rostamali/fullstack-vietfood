import ProfileLoading from '@/app/admin/profile/loading';
import ProfileForm from '@/components/elements/forms/profile-form';
import ProfilePicture from '@/components/elements/forms/profile-picture';
import ChangePassword from '@/components/elements/modals/change-password';
import { fetchUserProfile } from '@/lib/actions/auth.action';
import { dateFormat } from '@/lib/helpers/formater';
import { CalendarDays } from 'lucide-react';
export const metadata = {
	title: 'My Profile - Vietfood User Dashboard',
};

const UserProfilePage = async () => {
	const result = await fetchUserProfile();
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
						<ChangePassword />
					</div>
				</div>
			)}
			<ProfileForm
				defaultValues={{
					firstName: result.profile.firstName,
					lastName: result.profile.lastName || '',
					bio: result.profile.bio || '',
				}}
			/>
		</div>
	);
};

export default UserProfilePage;
