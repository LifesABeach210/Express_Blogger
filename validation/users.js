let validateUserData = (
  userData
) => {
  // if (userData.email === undefined || typeof(userData.email) !== "string") {
  // 	// email is required and it must be a string
  // 	return {
  // 		isValid: false,
  // 		message: "Email is required and it must be a string"
  // 	}
  // }

  if (
    userData.title ===
      undefined ||
    typeof userData.title !==
      "string"
  ) {
    // firstName is required and it must be a string
    return {
      isValid: false,
      message:
        "First name is required and it must be a string",
    };
  }

  if (
    userData.text ===
      undefined ||
    typeof userData.text !==
      "string"
  ) {
    // lastName is required and it must be a string
    return {
      isValid: false,
      message:
        "Last name is required and it must be a string",
    };
  }
  if (
    userData.text
      .length > 40
  ) {
    return {
      isValid: false,
      message:
        "Max of 40 chars",
    };
  }
  if (
    userData.author ===
      undefined &&
    typeof userData.author !==
      "string"
  ) {
    // age is NOT required, so first we check to see if it even exists before checking to see if the type is anything except 'number'
    return {
      isValid: false,
      message:
        "Author must be a string",
    };
  }

  if (
    userData.category !==
      undefined &&
    Array.isArray(
      userData.category
    ) &&
    userData.category
      .length >= 1
  ) {
    if (
      userData.category
        .length > 10
    ) {
      return {
        isValid: false,
        message:
          "10 items Max in category section",
      };
    }

    return {
      isValid: false,
      message:
        "catergory needs to have Data",
    };
  }

  if (
    userData.category ===
      undefined ||
    userData.category
      .length < 1 ||
    !Array.isArray(
      userData.category
    )
  ) {
    return {
      isValid: false,
      message:
        "Category must exist have at least 1 item and no more than 10 items and be An [Array]",
    };
  }

  const NoString =
    userData.category.filter(
      (blogCategory) => {
        if (
          typeof (
            blogCategory !==
            "string"
          )
        ) {
          return true;
        } else {
          return false;
        }
      }
    );
  if (
    NoString.length > 0
  ) {
    return {
      isValid: false,
      message:
        "Category can only be string values",
    };
  }
  const validCategorys =
    [
      "lorem",
      "ipsum",
      "doler",
      "sit",
      "amet",
    ];

  let isArrayValid = true;
  userData.category.forEach(
    (blogCategory) => {
      if (
        validCategorys.includes(
          blogCategory
        ) === false
      ) {
        isArrayValid = false;
      }
    }
  );

  return {
    isValid: true,
  };

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
