
land_form_threshold = [
    0, 0.6, 0.8, 0.85, 0.9, 0.95, 1
];

land_form_mapping = [
    "🟦", "🟩", "🟫", "⬛", "🟥", "🟪"
];

// land_form_mapping = [
//     "0", "1", "2", "3", "4", "5"
// ];

function land_appearance(value) {
    // return Math.round(value * 10).toString();

    for (let i = 0; i < land_form_mapping.length - 1; i++) {
        if (land_form_threshold[i] <= value && value < land_form_threshold[i + 1]) {
            return land_form_mapping[i];
        }
    }
    return land_form_mapping[land_form_mapping.length - 1];
}

class land {
    // initial info
    x = -1;
    y = -1;
    value = -1;
    form = '';

    constructor(info) {
        this.x = info.x;
        this.y = info.y;

        this.update_value(info.value);
    }

    __update_form() {
        this.form = land_appearance(this.value);
    }

    update_value(new_value) {
        this.value = new_value;
        this.__update_form();
    }
}


module.exports = {
    land,
};
