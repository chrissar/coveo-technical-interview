import {countries} from '../../data/CountryList';

export default class Countries {
    getCountryCode(name) {
        if (countries) {
            return countries[name] || "";
        } return "";
    }
}