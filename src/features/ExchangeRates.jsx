const BASE_URL = `https://api.frankfurter.dev/v1/latest?from=INR`;

export async function getLatestRates() {
    try {
        const response = await fetch(`${BASE_URL}`);

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
        }

        let data = await response.json();
        const rates = {INR: 1, ...data.rates}
        return rates;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}