const config = {
    params: {
        initialAngle: 55,
        maxAngle: 90,
        minAngle: 0,
        initialHeight: 1.6,
        maxHeight: 5,
        minHeight: 0,
        initialWidth: 1.2,
        maxWidth: 5,
        minWidth: 0.5,
    },

    model3d: {
        sides: {
            steps: 30,
            thickness: 0.03,
            extraLength: 0.1,
            minHeight: 0.02
        },
        'slats': {
            'defaultLength': 0.015,
            'thickness': 0.015,
            'space': 0.01
        },
        struts: {
            thickness: 0.08,
            smallSide: 0.04,
            maximumDistance: 0.3
        },
        surface: {
            thickness: 0.015
        }
    },
    units: null,

    UNIT_METERS: 'm',
    UNIT_FEET: 'ft',
    UNIT_DEGREES: '°'
};

export default config;

export type Config = typeof config;