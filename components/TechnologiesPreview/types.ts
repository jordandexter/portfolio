import { IconType } from "react-icons";

export interface SliderItem {
    name: string,
    yearsExperience?: number,
    mastery?: 'Expert' | 'Proficient' | 'Novice' | 'Learning',
    Icon: IconType | null,
    type: string
}