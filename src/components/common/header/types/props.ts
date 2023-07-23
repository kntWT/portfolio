import { SxProps, Theme } from '@mui/system';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

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
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    url: string;
    sx?: ExternalLinkSx;
}
