const calculateBmi = (height: number, weight: number): String => {
    const bmi = weight * 10000 / (height * height);
    const result = bmi < 15 ? 'Very severely underweight' :
        bmi < 16 ? 'Severely underweight' :
            bmi < 18.5 ? 'Underweight' :
                bmi < 25 ? 'Normal (healthy weight)' :
                    bmi < 30 ? 'Overweight' :
                        bmi < 35 ? 'Obese Class I (Moderately obese)' :
                            bmi < 40 ? 'Obese Class II (Severely obese)' :
                                'Obese Class III (Very severely obese)';
    return result;
}

console.log(calculateBmi(180, 74))