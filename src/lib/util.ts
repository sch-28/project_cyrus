export function number_to_euro(number: number) {
	return number.toLocaleString('de-DE', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 0
	});
}
