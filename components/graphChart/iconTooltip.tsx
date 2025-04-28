import React, { useCallback, useState } from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import { TooltipContent, TooltipContainer } from './style';

interface Props {
  tooltipContent: string;
}

function IconTooltip({ tooltipContent }: Props) {
  const [showIconTooltip, setShowIconTooltip] = useState(false);

  const onMouseEnter = useCallback(() => {
    setShowIconTooltip(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setShowIconTooltip(false);
  }, []);

  return (
    <TooltipContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <SVGIcon
        name='chart-tooltip-icon'
        width='12'
        height='12'
        viewBox='0 0 12 12'
      />
      {showIconTooltip && <TooltipContent>{tooltipContent}</TooltipContent>}
    </TooltipContainer>
  );
}

export default IconTooltip;
