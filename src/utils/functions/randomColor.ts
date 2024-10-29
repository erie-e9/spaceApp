// randomColor by David Merfield under the CC0 license
// https://github.com/davidmerfield/randomColor/

type Options = {
    seed?: number | string;
    count?: number;
    hue?: string | number;
    luminosity?: string;
    format?: string;
    alpha?: number;
};

type ColorDictionary = {
    [key: string]: {
        hueRange: [number, number];
        lowerBounds: [number, number][];
        saturationRange: [number, number];
        brightnessRange: [number, number];
    };
};

(function (root: any, factory: () => (options?: Options) => string | string[]) {
    if (typeof exports === 'object') {
        const randomColor = factory();

        if (typeof module === 'object' && module && module.exports) {
            exports = module.exports = randomColor;
        }

        exports.randomColor = randomColor;
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.randomColor = factory();
    }
})(this, function () {
    let seed: number | null = null;
    const colorDictionary: ColorDictionary = {};
    const colorRanges: boolean[] = [];

    loadColorBounds();

    const randomColor = (options: Options = {}): string | string[] => {
        if (options.seed !== undefined) {
            if (typeof options.seed === 'number') {
                seed = options.seed;
            } else if (typeof options.seed === 'string') {
                seed = stringToInteger(options.seed);
            } else {
                throw new TypeError('The seed value must be an integer or string');
            }
        } else {
            seed = null;
        }

        if (options.count !== undefined) {
            const totalColors = options.count;
            const colors: string[] = [];
            for (let i = 0; i < totalColors; i++) {
                colorRanges.push(false);
            }

            while (colors.length < totalColors) {
                const color = randomColor({ ...options, count: undefined });
                colors.push(color as string);
            }

            return colors;
        }

        const H = pickHue(options);
        const S = pickSaturation(H, options);
        const B = pickBrightness(H, S, options);

        return setFormat([H, S, B], options);
    };

    function pickHue(options: Options): number {
        const hueRange = getHueRange(options.hue);

        let hue = randomWithin(hueRange);

        if (hue < 0) {
            hue += 360;
        }

        return hue;
    }

    function pickSaturation(hue: number, options: Options): number {
        if (options.hue === 'monochrome') return 0;
        if (options.luminosity === 'random') return randomWithin([0, 100]);

        const [sMin, sMax] = getSaturationRange(hue);
        let saturationRange = [sMin, sMax];

        switch (options.luminosity) {
            case 'bright':
                saturationRange[0] = 55;
                break;
            case 'dark':
                saturationRange[0] = sMax - 10;
                break;
            case 'light':
                saturationRange[1] = 55;
                break;
        }

        return randomWithin(saturationRange);
    }

    function pickBrightness(H: number, S: number, options: Options): number {
        let bMin = getMinimumBrightness(H, S);
        let bMax = 100;

        switch (options.luminosity) {
            case 'dark':
                bMax = bMin + 20;
                break;
            case 'light':
                bMin = (bMax + bMin) / 2;
                break;
            case 'random':
                return randomWithin([0, 100]);
        }

        return randomWithin([bMin, bMax]);
    }

    function setFormat(hsv: [number, number, number], options: Options): string {
        switch (options.format) {
            case 'hsl':
                const [h, s, l] = HSVtoHSL(hsv);
                return `hsl(${h}, ${s}%, ${l}%)`;
            case 'hsla':
                const [h2, s2, l2] = HSVtoHSL(hsv);
                const alpha = options.alpha ?? Math.random();
                return `hsla(${h2}, ${s2}%, ${l2}%, ${alpha})`;
            case 'rgb':
                const rgb = HSVtoRGB(hsv);
                return `rgb(${rgb.join(', ')})`;
            case 'rgba':
                const rgba = HSVtoRGB(hsv);
                const alpha2 = options.alpha ?? Math.random();
                return `rgba(${rgba.join(', ')}, ${alpha2})`;
            case 'hsvArray':
                return hsv.join(', ');
            default:
                return HSVtoHex(hsv);
        }
    }

    function getHueRange(colorInput?: string | number): [number, number] {
        if (typeof colorInput === 'number') {
            if (colorInput >= 0 && colorInput < 360) return [colorInput, colorInput];
        }

        if (typeof colorInput === 'string' && colorDictionary[colorInput]) {
            return colorDictionary[colorInput].hueRange;
        }

        return [0, 360];
    }

    function getSaturationRange(hue: number): [number, number] {
        return getColorInfo(hue).saturationRange;
    }

    function getColorInfo(hue: number) {
        if (hue >= 334 && hue <= 360) hue -= 360;

        for (const colorName in colorDictionary) {
            const color = colorDictionary[colorName];
            if (color.hueRange && hue >= color.hueRange[0] && hue <= color.hueRange[1]) {
                return color;
            }
        }

        throw new Error('Color not found');
    }

    function randomWithin(range: [number, number]): number {
        if (seed === null) {
            const goldenRatio = 0.618033988749895;
            let random = Math.random();
            random += goldenRatio;
            random %= 1;
            return Math.floor(range[0] + random * (range[1] + 1 - range[0]));
        } else {
            seed = (seed * 9301 + 49297) % 233280;
            const rnd = seed / 233280;
            return Math.floor(range[0] + rnd * (range[1] - range[0]));
        }
    }

    function stringToInteger(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    function getMinimumBrightness(H: number, S: number): number {
        const lowerBounds = getColorInfo(H).lowerBounds;

        for (let i = 0; i < lowerBounds.length - 1; i++) {
            const [s1, v1] = lowerBounds[i];
            const [s2, v2] = lowerBounds[i + 1];

            if (S >= s1 && S <= s2) {
                const m = (v2 - v1) / (s2 - s1);
                const b = v1 - m * s1;
                return m * S + b;
            }
        }

        return 0;
    }

    function HSVtoHSL(hsv: [number, number, number]): [number, number, number] {
        const h = hsv[0];
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const l = (2 - s) * v;
        const sl = s * v;
        return [h, (sl / (l <= 1 ? l : 2 - l)) * 100 || 0, l * 50];
    }

    function HSVtoRGB(hsv: [number, number, number]): [number, number, number] {
        const h = hsv[0] / 60;
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const i = Math.floor(h);
        const f = h - i;
        const p = v * (1 - s);
        const q = v * (1 - s * f);
        const t = v * (1 - s * (1 - f));
        const mod = i % 6;

        return [
            Math.round([v, q, p, p, t, v][mod] * 255),
            Math.round([t, v, v, q, p, p][mod] * 255),
            Math.round([p, p, t, v, v, q][mod] * 255),
        ];
    }

    function HSVtoHex(hsv: [number, number, number]): string {
        const rgb = HSVtoRGB(hsv);
        return (
            '#' +
            rgb
                .map((c) => {
                    const hex = c.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                })
                .join('')
        );
    }

    function loadColorBounds() {
        colorDictionary.monochrome = {
            hueRange: [0, 0],
            lowerBounds: [
                [0, 0],
                [100, 0],
            ],
            saturationRange: [0, 100],
            brightnessRange: [0, 100],
        };

        colorDictionary.red = {
            hueRange: [-26, 18],
            lowerBounds: [
                [20, 100],
                [30, 92],
                [40, 89],
                [50, 85],
                [60, 78],
                [70, 70],
                [80, 60],
                [90, 55],
                [100, 50],
            ],
            saturationRange: [20, 100],
            brightnessRange: [50, 100],
        };

        // Add other colors (orange, yellow, green, blue, purple, pink, etc.) here
    }

    return randomColor;
});
