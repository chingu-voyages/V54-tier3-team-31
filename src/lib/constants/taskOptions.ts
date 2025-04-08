export const FREQUENCY_OPTIONS = ['Once', 'Daily', 'Weekly', 'Monthly'] as const
export type FrequencyOption = typeof FREQUENCY_OPTIONS[number]

export const DURATION_OPTIONS = [
    '5 mins',
    '10 mins',
    '15 mins',
    '30 mins',
    '1 hour',
    'Unknown'
] as const
export type DurationOption = typeof DURATION_OPTIONS[number]