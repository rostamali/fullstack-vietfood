import { useQuery } from '@tanstack/react-query';
import { stateByCountry } from '../actions/country.action';
// import { countryList } from '../actions/country.action';

// export const useCountryList = () => {
// 	return useQuery({
// 		queryKey: ['countrySelectList'],
// 		queryFn: () => countryList(),
// 	});
// };

export const useStateByCountry = (isoCode: string | null) => {
	return useQuery({
		queryKey: ['stateByCountry', isoCode],
		queryFn: () => stateByCountry(isoCode),
	});
};
