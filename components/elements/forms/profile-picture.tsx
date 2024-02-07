'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCallback, useState, FC, useEffect } from 'react';
import Spinner from '../shared/spinner';
import { useDropzone } from 'react-dropzone';
import { Camera, Check, Trash2 } from 'lucide-react';
import {
	deleteProfilePicture,
	uploadProfilePicture,
} from '@/lib/actions/file.action';
import { toast } from 'sonner';
import { ToastError, ToastSuccess } from '../shared/custom-toast';
type ProfileType = {
	previewUrl: string | null;
	file: File | null;
	default: boolean;
};
type ProfilePictureProps = {
	previewUrl: string | null;
	isThumbnail: boolean;
	pageUrl: string;
	frameClass: string;
	thumbnailClass: string;
};

const ProfilePicture: FC<ProfilePictureProps> = ({
	previewUrl,
	isThumbnail,
	pageUrl,
	frameClass,
	thumbnailClass,
}) => {
	const [isPending, setIsPending] = useState(false);
	const [profile, setProfile] = useState<ProfileType>({
		previewUrl: null,
		file: null,
		default: false,
	});
	useEffect(() => {
		setProfile({
			...profile,
			previewUrl: previewUrl,
			default: isThumbnail,
		});
	}, [previewUrl, isThumbnail]);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		const fileUrl = URL.createObjectURL(acceptedFiles[0]);
		setProfile({
			previewUrl: fileUrl,
			file: acceptedFiles[0],
			default: false,
		});
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/png': ['.png'],
			'image/jpg': ['.jpg'],
			'image/jpeg': ['.jpeg'],
		},
		maxFiles: 1,
	});
	const handleUploadProfile = async () => {
		setIsPending(true);
		try {
			if (profile.file) {
				const formData = new FormData();
				formData.append('files', profile.file);
				const result = await uploadProfilePicture(formData);
				setIsPending(false);
				if (result.success) {
					toast.custom((t) => (
						<ToastSuccess
							toastNumber={t}
							content={result.message}
						/>
					));
					setProfile({
						...profile,
						file: null,
					});
				} else {
					toast.custom((t) => (
						<ToastError toastNumber={t} content={result.message} />
					));
				}
			}
		} catch (error) {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError toastNumber={t} content={`Picture upload failed`} />
			));
		}
	};
	const handleDeleteProfile = async () => {
		setIsPending(true);
		try {
			const result = await deleteProfilePicture({
				refreshLink: pageUrl,
			});
			setIsPending(false);
			if (result.success) {
				toast.custom((t) => (
					<ToastSuccess toastNumber={t} content={result.message} />
				));
			} else {
				toast.custom((t) => (
					<ToastError toastNumber={t} content={result.message} />
				));
			}
		} catch (error) {
			setIsPending(false);
			toast.custom((t) => (
				<ToastError
					toastNumber={t}
					content={`Picture deletion failed`}
				/>
			));
		}
	};

	return (
		<div className={`${frameClass} relative ring-2 ring-primary-green`}>
			<div className="relative group overflow-hidden rounded-full">
				<Image
					src={
						profile.previewUrl
							? `${profile.previewUrl}`
							: '/assets/placeholder.svg'
					}
					alt={'name'}
					width={250}
					height={250}
					className={`${thumbnailClass} object-cover border-4 border-white`}
				/>
				{profile.default && (
					<div className="absolute bottom-0 left-0 w-full h-[40px] bg-black-dark bg-opacity-30 text-white group-hover:opacity-[1] opacity-0 duration-150 flex-center">
						<Button
							className="p-0"
							onClick={handleDeleteProfile}
							disabled={isPending}
						>
							<Trash2 size={18} />
						</Button>
					</div>
				)}
			</div>
			{profile.file ? (
				<button
					className="profile-picture__trigger"
					onClick={handleUploadProfile}
					disabled={isPending}
				>
					{isPending ? (
						<Spinner className={'h-[20px] w-[20px] stroke-white'} />
					) : (
						<Check size={20} />
					)}
				</button>
			) : (
				<div className="profile-picture__trigger" {...getRootProps()}>
					<input {...getInputProps()} />
					<Camera size={20} />
				</div>
			)}
		</div>
	);
};

export default ProfilePicture;
