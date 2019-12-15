export const getOutfits = async (parameters) => {
	try {
		const response = await fetch(
			`/api/outfits`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(parameters)
			}
		);
		return await response.json();
	} catch (error) {
		return {};
	}
};

export const getOutfit = async (id) => {
	try {
		const response = await fetch(
			`/api/outfits/` + id
		);
		return await response.json();
	} catch (error) {
		return {};
	}
};

export const getPreferences = async () => {
	try {
		const response = await fetch(
			`/api/preferences`
		);
		return await response.json();
	} catch (error) {
		return {};
	}
}

export const setPreferences = async (preferences) => {
	try {
		const response = await fetch(
			`/api/preferences`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(preferences)
		}
		);
		return await response.json();
	} catch (error) {
		return {};
	}
}
