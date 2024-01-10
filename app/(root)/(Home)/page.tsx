'use client';
import { useFetchUsersByAdmin } from '@/lib/react-query/useFetch';

export default function Home() {
	const { data } = useFetchUsersByAdmin();
	return (
		<div className="min-h-screen flex flex-col p-20 gap-[30px]">
			<div className="container">{JSON.stringify(data)}</div>
		</div>
	);
}
