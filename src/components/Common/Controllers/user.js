export const handleMenuOption = (num, onChangeMenuOption) => {
    if(num === 0) {
        onChangeMenuOption(true, false, false);
    } else if(num === 1) {
        onChangeMenuOption(false, true, false);
    } else if(num === 2){
        onChangeMenuOption(false, false, true);
    }
}