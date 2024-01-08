import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { invoices } from '@/constants';
import LocalSearch from '@/components/shared/filters/local-search';

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col p-20 gap-[30px]">
			<div className="container">
				<div className="heading">
					<h1 className="heading-1">Hello Heading - 1</h1>
					<h2 className="heading-2">Hello Heading - 2</h2>
					<h3 className="heading-3">Hello Heading - 3</h3>
					<h4 className="heading-4">Hello Heading - 4</h4>
					<h5 className="heading-5">Hello Heading - 5</h5>
					<h6 className="heading-6">Hello Heading - 6</h6>
				</div>
				<div className="paragraph">
					<p className="text-base-1">Text base 1</p>
					<p className="text-base-2">Text base 2</p>
				</div>
				<div className="inputs flex flex-col gap-[10px]">
					<Input
						type="email"
						placeholder="Input field sm"
						className="input-field-sm"
					/>
					<Input
						type="email"
						placeholder="Input field lg"
						className="input-field-lg"
					/>
					<Select>
						<SelectTrigger className="input-field-sm">
							<SelectValue placeholder="Select a fruit" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectGroup>
								<SelectLabel>Fruits</SelectLabel>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">
									Blueberry
								</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">
									Pineapple
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Checkbox className="checkbox-sm" id="terms" />
					<Checkbox className="checkbox-lg" id="terms" />
					<LocalSearch
						route={'/'}
						iconPosition={'left'}
						placeholder={'Search by name...'}
						containerClass={''}
						inputClass={''}
						iconClass={''}
					/>
					<LocalSearch
						route={'/'}
						iconPosition={'right'}
						placeholder={'Darling'}
						containerClass={''}
						inputClass={''}
						iconClass={''}
					/>
				</div>
				<div className="buttons flex items-center gap-[20px]">
					<Button className="btn-primary-sm">Button</Button>
					<Button className="btn-primary-lg">Button</Button>
					<Button className="btn-ghost-sm">Button</Button>
					<Button className="btn-ghost-lg">Button</Button>
				</div>
				<div className="badges flex items-center gap-[20px]">
					<span className="badge-success">Badge</span>
					<span className="badge-danger">Badge</span>
					<span className="badge-warning">Badge</span>
					<span className="badge-info">Badge</span>
				</div>
				<div className="tables">
					<Table>
						<TableHeader className="[&_tr]:border-b-0">
							<TableRow className="border-b-0">
								<TableHead className="p-0">
									<div className="table-head-start">
										Invoice
									</div>
								</TableHead>
								<TableHead className="p-0">
									<div className="table-head">Status</div>
								</TableHead>
								<TableHead className="p-0">
									<div className="table-head">Method</div>
								</TableHead>
								<TableHead className="p-0">
									<div className="table-head-end">Amount</div>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="border-t-0">
							{invoices.map((invoice) => (
								<TableRow
									key={invoice.invoice}
									className="border-b-0 border-t-0"
								>
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
										<div className="table-cell-end">
											{invoice.totalAmount}
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
