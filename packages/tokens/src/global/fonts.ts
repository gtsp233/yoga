import weights from './font-weights';

/**
 * @module fonts
 * @desc Fonts tokens module.
 *
 * @memberof @gympass/yoga-tokens
 */

/**
 * A font
 * @typedef Font
 *
 * @type {Object}
 * @property {String} family
 * @property {Array<Number|String>} weight
 */

/**
 * @type {Font[]}
 */
import { fontsProps } from '../types/fonts';

const fonts: fontsProps = [
  {
    family: 'Rubik',
    weight: [...weights, ...weights.map(weight => `${weight}i`)],
  },
];

[fonts.rubik] = fonts;

export default fonts;
