import { FC } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import * as z from 'zod';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FreeShipRequired, ShipMethodList, TaxStatusList } from '@/constants';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SelectField from '@/components/elements/select/select-field';
import { ShipFormSchema } from '@/lib/helpers/form-validation';
import { useMethodClassList } from '@/lib/hooks/useShip';
import { format } from 'path';
import { X } from 'lucide-react';
type TabProps = {
	form: UseFormReturn<z.infer<typeof ShipFormSchema>>;
};
const ShipMethods: FC<TabProps> = ({ form }) => {
	const { data: classList, isLoading } = useMethodClassList();
	const {
		fields: flatField,
		append: flatAppend,
		remove: flatRemove,
	} = useFieldArray({
		control: form.control,
		name: 'flatMethod',
	});
	const {
		fields: freeField,
		append: freeAppend,
		remove: freeRemove,
	} = useFieldArray({
		control: form.control,
		name: 'freeMethod',
	});
	const {
		fields: pickupField,
		append: pickupAppend,
		remove: pickupRemove,
	} = useFieldArray({
		control: form.control,
		name: 'pickupMethod',
	});
	const handleNewMethod = (value: string) => {
		if (value === 'FLAT_RATE') {
			flatAppend({
				name: '',
				taxStatus: 'NONE',
				cost: 0,
				classList:
					!isLoading && classList
						? classList.map((item) => ({
								classId: item.id,
								cost: 0,
								className: item.name,
						  }))
						: [],
			});
		} else if (value === 'FREE_SHIPPING') {
			freeAppend({
				name: '',
				miniOrderAmount: undefined,
				required: '',
			});
		} else {
			pickupAppend({
				name: '',
				taxStatus: 'NONE',
				cost: undefined,
			});
		}
	};

	return (
		<div className="dashboard-col-space">
			<div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-[25px]">
				<div>
					<label className="field-label-sm">Shipping methods</label>
					<p className="form-note-sm mt-1 mb-2">
						Add the shipping methods you'd like to make available to
						customers in this zone.
					</p>
					<Popover>
						<PopoverTrigger asChild>
							<Button className="btn-primary-sm">
								Add shipping method
							</Button>
						</PopoverTrigger>
						<PopoverContent className="PopoverContent bg-white p-0">
							<div className="flex flex-col">
								{ShipMethodList.map((method, index) => (
									<span
										key={index}
										className="menubar-item w-full h-auto text-left px-2 py-1.5 cursor-pointer"
										onClick={() =>
											handleNewMethod(method.value)
										}
									>
										{method.label}
									</span>
								))}
							</div>
						</PopoverContent>
					</Popover>
				</div>
				<div>
					{flatField.length > 0 ||
					freeField.length > 0 ||
					pickupField.length > 0 ? (
						<Accordion
							type="single"
							collapsible
							className="method-ac"
						>
							{flatField.map((field, index) => (
								<AccordionItem
									value={`flat-${index}`}
									key={index}
									className="border-light rounded-md"
								>
									<div className="method-ac__title">
										<button
											onClick={() => flatRemove(index)}
											type="button"
											className="method-ac__remove"
										>
											<X size={14} />
										</button>
										<AccordionTrigger className="flex-1">
											{form.watch(
												`flatMethod.${index}.name`,
											).length > 0
												? form.watch(
														`flatMethod.${index}.name`,
												  )
												: 'Flat rate'}
										</AccordionTrigger>
									</div>
									<AccordionContent>
										<div className="grid grid-cols-2 gap-[25px] px-3">
											<FormField
												control={form.control}
												name={`flatMethod.${index}.name`}
												render={({ field }) => (
													<FormItem>
														<FormLabel className="field-label-sm">
															Method title
														</FormLabel>
														<FormControl>
															<Input
																className="input-field-sm"
																{...field}
															/>
														</FormControl>
														<FormMessage className="form-error" />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name={`flatMethod.${index}.taxStatus`}
												render={({ field }) => (
													<FormItem>
														<FormLabel className="field-label-sm">
															Tax status
														</FormLabel>
														<FormControl>
															<SelectField
																triggerClass={
																	'input-field-sm bg-white'
																}
																placeholder={''}
																defaultValue={
																	field.value
																}
																onChange={
																	field.onChange
																}
																options={
																	TaxStatusList
																}
															/>
														</FormControl>
														<FormMessage className="form-error" />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name={`flatMethod.${index}.cost`}
												render={({ field }) => (
													<FormItem>
														<FormLabel className="field-label-sm">
															Cost
														</FormLabel>
														<FormControl>
															<Input
																type="number"
																className="input-field-sm"
																{...field}
															/>
														</FormControl>
														<FormMessage className="form-error" />
													</FormItem>
												)}
											/>
											{field &&
												field.classList.map(
													(item, classIndex) => (
														<FormField
															key={classIndex}
															control={
																form.control
															}
															name={`flatMethod.${index}.classList.${classIndex}.cost`}
															render={({
																field,
															}) => (
																<FormItem>
																	<FormLabel className="field-label-sm">
																		<strong>
																			{
																				item.className
																			}
																		</strong>{' '}
																		shipping
																		class
																		cost
																	</FormLabel>
																	<FormControl>
																		<Input
																			type="number"
																			className="input-field-sm"
																			{...field}
																		/>
																	</FormControl>
																	<FormMessage className="form-error" />
																</FormItem>
															)}
														/>
													),
												)}
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
							{freeField.map((field, index) => (
								<AccordionItem
									value={`free-${index}`}
									key={index}
									className="border-light rounded-md"
								>
									<div className="method-ac__title">
										<button
											onClick={() => freeRemove(index)}
											type="button"
											className="method-ac__remove"
										>
											<X size={14} />
										</button>
										<AccordionTrigger className="flex-1">
											{form.watch(
												`freeMethod.${index}.name`,
											).length > 0
												? form.watch(
														`freeMethod.${index}.name`,
												  )
												: 'Free shipping'}
										</AccordionTrigger>
									</div>

									<AccordionContent className="px-3 form-flex-space">
										<FormField
											control={form.control}
											name={`freeMethod.${index}.name`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="field-label-sm">
														Method title
													</FormLabel>
													<FormControl>
														<Input
															className="input-field-sm"
															{...field}
														/>
													</FormControl>
													<FormMessage className="form-error" />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`freeMethod.${index}.required`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="field-label-sm">
														Free shipping
														requires...
													</FormLabel>
													<FormControl>
														<SelectField
															triggerClass={
																'input-field-sm bg-white'
															}
															placeholder={
																'Choose options...'
															}
															defaultValue={
																field.value
															}
															onChange={(val) => {
																form.setValue(
																	`freeMethod.${index}.required`,
																	val,
																);
																form.setValue(
																	`freeMethod.${index}.miniOrderAmount`,
																	undefined,
																);
															}}
															options={
																FreeShipRequired
															}
														/>
													</FormControl>
													<FormMessage className="form-error" />
												</FormItem>
											)}
										/>
										{form.watch(
											`freeMethod.${index}.required`,
										) === 'MINI_ORDER_AMOUNT' && (
											<FormField
												control={form.control}
												name={`freeMethod.${index}.miniOrderAmount`}
												render={({ field }) => (
													<FormItem>
														<FormLabel className="field-label-sm">
															Minimum Order Amount
														</FormLabel>
														<FormControl>
															<Input
																type="number"
																className="input-field-sm"
																{...field}
															/>
														</FormControl>
														<FormMessage className="form-error" />
													</FormItem>
												)}
											/>
										)}
									</AccordionContent>
								</AccordionItem>
							))}
							{pickupField.map((field, index) => (
								<AccordionItem
									value={`pickup-${index}`}
									key={index}
									className="border-light rounded-md"
								>
									<div className="method-ac__title">
										<button
											onClick={() => pickupRemove(index)}
											type="button"
											className="method-ac__remove"
										>
											<X size={14} />
										</button>
										<AccordionTrigger className="flex-1">
											{form.watch(
												`pickupMethod.${index}.name`,
											).length > 0
												? form.watch(
														`pickupMethod.${index}.name`,
												  )
												: 'Local pickup'}
										</AccordionTrigger>
									</div>
									<AccordionContent className="px-3 form-flex-space">
										<FormField
											control={form.control}
											name={`pickupMethod.${index}.name`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="field-label-sm">
														Method title
													</FormLabel>
													<FormControl>
														<Input
															className="input-field-sm"
															{...field}
														/>
													</FormControl>
													<FormMessage className="form-error" />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`pickupMethod.${index}.taxStatus`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="field-label-sm">
														Tax status
													</FormLabel>
													<FormControl>
														<SelectField
															triggerClass={
																'input-field-sm bg-white'
															}
															placeholder={
																'Select options...'
															}
															defaultValue={
																field.value
															}
															onChange={
																field.onChange
															}
															options={
																TaxStatusList
															}
														/>
													</FormControl>
													<FormMessage className="form-error" />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`pickupMethod.${index}.cost`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="field-label-sm">
														Cost
													</FormLabel>
													<FormControl>
														<Input
															type="number"
															className="input-field-sm"
															{...field}
														/>
													</FormControl>
													<FormMessage className="form-error" />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					) : (
						<div className="flex-center bg-white p-4 rounded-md border-light">
							<span className="text-base-2">
								You can add multiple shipping methods within
								this zone. Only customers within the zone will
								see them.
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ShipMethods;
