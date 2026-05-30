type UnitString = 'cm' | 'mm' | 'inch';

const sizeConvertToInch = (unit: UnitString, value: number) => {
    switch (unit) {
        case 'cm':
            return value / 2.54;
        case 'mm':
            return value / 25.4;
        case 'inch':
        default:
            return value;
    }
};

const sizeConvertFromInchToMillimeter = (value: number) => {
    return value * 25.4;
}

export {
    type UnitString,
    sizeConvertToInch,
    sizeConvertFromInchToMillimeter,
}