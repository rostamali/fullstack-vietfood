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
