'use client';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { invoices } from '@/constants';

const CollapsibleTable = () => {
	return (
		<Table>
			<TableHeader className="[&_tr]:border-b-0">
				<TableRow className="border-b-0">
					<TableHead className="p-0">
						<div className="table-head-start">Invoice</div>
					</TableHead>
					<TableHead className="p-0">
						<div className="table-head">Status</div>
					</TableHead>
					<TableHead className="p-0">
						<div className="table-head">Method</div>
					</TableHead>
					<TableHead className="p-0">
						<div className="table-head">Amount</div>
					</TableHead>
					<TableHead className="p-0">
						<div className="table-head-end">Action</div>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="border-t-0">
				{invoices.map((invoice, index) => (
					<Collapsible key={index} asChild>
						<>
							<TableRow className="border-b-0 border-t-0">
								<TableCell className="p-0">
									<div className="table-cell-start">
										{invoice.invoice}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell">
										{invoice.paymentStatus}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell">
										{invoice.paymentMethod}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell">
										{invoice.totalAmount}
									</div>
								</TableCell>
								<TableCell className="p-0">
									<div className="table-cell-end">
										<CollapsibleTrigger asChild>
											<span>Is it accessible?</span>
										</CollapsibleTrigger>
									</div>
								</TableCell>
							</TableRow>
							<CollapsibleContent
								asChild
								className="transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
							>
								<>
									<TableRow className="border-b-0 border-t-0">
										<TableCell colSpan={5} className="p-0">
											<div className="table-cell-start table-cell-end">
												Lorem ipsum, dolor sit amet
												consectetur adipisicing elit.
												Modi, facere. Perspiciatis ea
												optio ex provident facere,
												repellendus cupiditate aut culpa
												dolore consequuntur. Labore,
												possimus fuga! Obcaecati vel
												impedit, alias ea delectus
												veniam ut! Quis quas cupiditate
												eaque vitae, odit est numquam
												facere labore, pariatur officiis
												amet, nisi culpa cumque sequi.
											</div>
										</TableCell>
									</TableRow>
								</>
							</CollapsibleContent>
						</>
					</Collapsible>
				))}
			</TableBody>
		</Table>
	);
};

export default CollapsibleTable;
