export const getOutfits = async (parameters, useMl) => {
	try {
		const response = await fetch(
			useMl ? `/api/outfits-ml` : `/api/outfits`,
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

export const like = async (outfitId) => {
	try {
		const response = await fetch(
			`/api/outfits/like/` + outfitId
		);
		return await response.json();
	} catch (error) {
		return {};
	}
}

export const dislike = async (outfitId) => {
	try {
		const response = await fetch(
			`/api/outfits/dislike/` + outfitId
		);
		return await response.json();
	} catch (error) {
		return {};
	}
}

export const unlike = async (outfitId) => {
	try {
		const response = await fetch(
			`/api/outfits/unlike/` + outfitId
		);
		return await response.json();
	} catch (error) {
		return {};
	}
}
