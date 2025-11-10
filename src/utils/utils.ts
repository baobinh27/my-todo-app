export const calculateDifferenceOfDays = (initialDate: number, targetDate: number) => {
    const res = Math.floor((initialDate - targetDate) / 1000 / 60 / 60 / 24);
    return res;
}