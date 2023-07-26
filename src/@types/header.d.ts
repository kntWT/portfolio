import { MuiIcon } from "../../../../@types/common";

export type HeaderProp = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

export type ExternalLinkSx = {
    color?: string;
    mr?: number;
    ml?: number;
};

export type ExternalLinkProp = {
    icon: MuiIcon;
    url: string;
    sx?: ExternalLinkSx;
}
