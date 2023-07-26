import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgMuiIconMap } from '@mui/material'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

type MuiIcon = OverridableComponent<SvgMuiIconMap<{}, "svg">> & {
    muiName: string;
};
type CallableComponent = () => EmotionJSX.Element;