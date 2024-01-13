import CreateTaxModal from '@/components/ecom/tax/create-tax-modal';
import TaxList from '@/components/shared/tables/tax-list';
import DashboardPageTitle from '@/components/shared/ui/db-page-title';
import { fetchTaxRateByAdmin } from '@/lib/actions/tax.action';
type SearchParams = {
	searchParams: {
		page: string;
		q: string | null;
	};
};
const TaxPage = async ({ searchParams }: SearchParams) => {
	const result = await fetchTaxRateByAdmin({
		pageSize: 9,
		page: searchParams.page ? parseInt(searchParams.page) : 1,
		query: searchParams.q ? searchParams.q : null,
	});
	return (
		<div className="dashboard-col-space">
			<div className="flex items-center justify-between gap-[40px]">
				<DashboardPageTitle
					title={'Tax Rates'}
					links={[]}
					params={null}
				/>
				<CreateTaxModal />
			</div>
			<TaxList
				data={result ? result.taxRates : []}
				pages={result ? result.pages : 0}
			/>
		</div>
	);
};

export default TaxPage;
