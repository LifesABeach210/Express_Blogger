
let validateUserData = (userData) => {

	// if (userData.email === undefined || typeof(userData.email) !== "string") {
	// 	// email is required and it must be a string
	// 	return {
	// 		isValid: false,
	// 		message: "Email is required and it must be a string"
	// 	}
	// } 
	
	if (userData.title === undefined || typeof(userData.title) !== "string") {
		// firstName is required and it must be a string
		return {
			isValid: false,
			message: "First name is required and it must be a string"
		}
	}
	
    
 
	if (userData.text === undefined || typeof(userData.text) !== "string") {
		// lastName is required and it must be a string
		return {
			isValid: false,
			message: "Last name is required and it must be a string"
		}
	} 
    if (userData.text.length > 40 ) {
        return {
			isValid: false,
			message: "Max of 40 chars"
		}
    }
	if (userData.author === undefined && typeof(userData.author) !== "string") {
		// age is NOT required, so first we check to see if it even exists before checking to see if the type is anything except 'number'
		return {
			isValid: false,
			message: "Author must be a string"
		}
	} 
	
	return {
		isValid: true
	}

	// if (userData.favoriteFoods !== undefined && Array.isArray(userData.favoriteFoods) && userData.favoriteFoods.length > 0) {
	// 	// Array.isArray() will check to see if the variable is an array

	// 	let isFavoriteFoodsStrings = true;

	// 	for (let i = 0; i < userData.favoriteFoods.length; i++) {
	// 		if (typeof(userData.favoriteFoods[i]) !== 'string') {
	// 			isFavoriteFoodsStrings = false
	// 		}
	// 	}

	// 	if (isFavoriteFoodsStrings === false) {
	// 		return {
	// 			isValid: false
	// 		}
	// 	}
	// } 
};

module.exports = {
	
	validateUserData,
};