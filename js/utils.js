export const calories = (age, height, weight, sex, coef) => {
    if (sex === 'male') {
        return coef * (10 * weight + 6.25 * height - 5 * age + 5);
    } else if (sex === 'female') {
        return  coef * (10 * weight + 6.25 * height - 5 * age - 161);
    }
}

