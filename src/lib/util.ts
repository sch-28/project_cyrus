/**
 * Converts the given number to a EURO currency string
 * @param number to convert
 * @returns EURO currency string
 */
export function number_to_euro(number: number) {
	return number.toLocaleString('de-DE', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 0
	});
}
