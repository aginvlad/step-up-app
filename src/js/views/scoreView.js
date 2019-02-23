export const enableBtn = (btn) => {
    btn.disabled = false; 
    btn.classList.add(btn.id + '--active');
};

export const disableBtn = (btn) => {
    btn.disabled = true;
    btn.classList.remove(btn.id + '--active');
};

