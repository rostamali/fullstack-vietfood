import { CountriesList } from '@/constants/countries';
import { StatesList } from '@/constants/countries/states';

export const fetchCountryStates = () => {
	const countriesWithStates = CountriesList.map((country) => ({
		...country,
		states: StatesList.filter(
			(state) => state.countryCode === country.isoCode,
		),
	}));
	return countriesWithStates;
};
export const countryStateList = () => {
	const countriesWithStates = CountriesList.map((country) => {
		const { name, isoCode, flag } = country;

		const statesForCountry = StatesList.filter(
			(state) => state.countryCode === country.isoCode,
		).map(({ name, isoCode }) => ({
			name,
			isoCode,
		}));

		return {
			name,
			isoCode,
			flag,
			states: statesForCountry,
		};
	});

	return countriesWithStates;
};

export const fetchCountryList = () => {
	const countries = CountriesList.map((country) => {
		const { name, isoCode, flag } = country;
		return {
			name,
			isoCode,
			flag,
		};
	});

	return countries;
};
export const stateByCountry = (countryCode: string | null) => {
	return StatesList.filter((state) => state.countryCode === countryCode).map(
		({ name, isoCode }) => ({
			name,
			isoCode,
		}),
	);
};

export const countryNameByIso = (isoCode: string) => {
	const selectedCountry = CountriesList.find(
		(country) => country.isoCode === isoCode,
	);
	if (!selectedCountry) return null;
	return selectedCountry;
};
export const stateNameByIso = (isoCode: string) => {
	const selectedState = StatesList.find((state) => state.isoCode === isoCode);
	if (!selectedState) return null;
	return selectedState;
};
