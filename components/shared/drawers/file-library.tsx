import Link from 'next/link';
import EmptyError from '../ui/empty-error';

const FileLibrary = () => {
	return (
		<div>
			{files?.length > 0 ? (
				<Sheet>
					<div className="grid 2lg:grid-cols-3 xm:grid-cols-2 grid-cols-1 gap-[20px]">
						{files.map((file, index) => (
							<div
								className="relative file-card-wrap"
								key={index}
							>
								<SheetTrigger asChild>
									<div
										className="single-file-card"
										onClick={() => {
											setFileDetails(file);
										}}
									>
										<FileCard file={file} />
									</div>
								</SheetTrigger>
								<Checkbox
									className="h-[25px] border border-primary-dark-100 border-opacity-40 w-[25px] absolute top-3 right-3 rounded-full bg-admin-gray-light text-primary-black-light text-[14px]"
									onClick={() =>
										toggleSelectList(
											selectedItems,
											setSelectedItems,
											file.id,
										)
									}
									checked={isChecked(selectedItems, file.id)}
								/>
							</div>
						))}
					</div>
					<SheetContent
						side="right"
						className="bg-white data-[state=open]:bg-secondary border-l border-l-primary-dark-100 xm:w-[350px] w-[260px] dark:border-opacity-10 border-opacity-10"
					>
						<h3 className="heading-3 dark:text-primary-black-dark">
							Edit file
						</h3>
						{fileDetails && (
							<div className="flex flex-col gap-[10px] mt-[30px]">
								<FileCard file={fileDetails} />
								<div className="flex items-center justify-end gap-[20px]">
									<Button className="p-0 text-primary-black-light underline outline-none focus-visible:ring-0">
										Compress
									</Button>
									<SheetClose asChild>
										<Button
											className="p-0 text-primary-orange-dark underline outline-none focus-visible:ring-0"
											onClick={() =>
												handleDeleteFile(fileDetails.id)
											}
											disabled={isPending}
										>
											Delete
										</Button>
									</SheetClose>
								</div>
								<FileUpdate fileDetails={fileDetails} />
							</div>
						)}
					</SheetContent>
				</Sheet>
			) : (
				<EmptyError
					containerClass={
						'sm:max-w-[450px] justify-center mx-auto text-center items-center py-[60px]'
					}
					thumbnailClass={'sm:w-[70%] w-[80%]'}
					title={'There are no files to show'}
					description={`Whoa! It looks like the files directory is currently empty. 📂 No files are present in this location.
					`}
					Links={
						<Link
							href="/admin/files"
							className="btn-primary !h-[45px] !text-[14px] !px-[15px]"
						>
							Reload
						</Link>
					}
					titleClass={''}
					descriptionClass={''}
				/>
			)}
		</div>
	);
};

export default FileLibrary;
