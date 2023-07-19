const elevations = {
  zero: 0,
  small: 4,
  medium: 8,
  large: 12,
} as const;

export type ElevationsSizes = Partial<typeof elevations>;

export default elevations;
