/**
 * @module borders
 * @desc Borders tokens module.
 *
 * @memberof @gympass/yoga-tokens
 */

/**
 * A border
 * @typedef Border
 *
 * @type {Object}
 * @property {String} zero - 0
 * @property {String} small - 1
 * @property {String} medium - 2
 */

/**
 * @type {Border}
 * @default
 */
import { borderProps } from '../types/border';

const border: borderProps = [0, 1, 2];

[border.zero, border.small, border.medium] = border;


export default border;
