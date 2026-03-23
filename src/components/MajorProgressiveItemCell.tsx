import { useCallback, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useLocationHotkeys } from "../utilities/hotkeys";
import { ProgressiveItemState } from "../store/ProgressiveItemState";
import { observer } from "mobx-react-lite";
import locations from "../data/locations";
import {
  baseIconCss,
  unhoverCss,
  hoverCss,
  itemActiveCss,
  itemInactiveCss,
} from "../utilities/iconCss";

export interface MajorProgressiveItemCellProps {
  itemState: ProgressiveItemState;
}

const MajorProgressiveItemCell = observer(
  ({ itemState }: MajorProgressiveItemCellProps) => {
    const [mouseOver, setMouseOver] = useState(false);
    const [mouseLeave, setMouseLeave] = useState(false);
    const [didClick, setDidClick] = useState(false);
    const hotkeysDisabled = itemState.startingLocation === locations.Starting;

    useLocationHotkeys(mouseOver, itemState, hotkeysDisabled);

    const incrementLocationState = useCallback(
      (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) {
          e.stopPropagation();
        }

        itemState.incrementLocation();
      },
      [itemState],
    );

    const decrementLocationState = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();

        if (e.currentTarget === e.target) {
          e.stopPropagation();
        }

        itemState.decrementLocation();
        setDidClick(true);
      },
      [itemState],
    );

    const incrementProgressionState = useCallback(
      (e: React.MouseEvent) => {
        if (e.currentTarget !== e.target) {
          return;
        }

        itemState.incrementProgression();
        setDidClick(true);
      },
      [itemState],
    );

    const decrementProgressionState = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();

        if (e.currentTarget !== e.target) {
          return;
        }

        itemState.decrementProgression();
        setDidClick(true);
      },
      [itemState],
    );

    let iconAnimationCss = unhoverCss;
    let iconColorCss = itemInactiveCss;
    let icon = itemState.icon;

    if (mouseOver && !didClick) {
      iconAnimationCss = hoverCss;
      icon = itemState.icon;
    } else if (mouseOver && didClick && !mouseLeave) {
      iconAnimationCss = unhoverCss;
      icon = itemState.icon;
    }

    if (itemState.progression == 0) {
      iconColorCss = itemInactiveCss;
    } else if (itemState.progression > 0) {
      iconColorCss = itemActiveCss;
    }

    return (
      <div
        data-tooltip-id={itemState.item.id}
        data-tooltip-content={itemState.item.name}
        className="w-[64px] h-[64px] flex justify-start"
        style={{
          position: "relative",
          width: "64px",
          height: "64px",
        }}
        onDoubleClick={(e) => e.preventDefault()}
        onMouseEnter={() => {
          setMouseOver(true);
          setMouseLeave(false);
        }}
        onMouseLeave={() => {
          setMouseOver(false);
          setMouseLeave(true);
          setDidClick(false);
        }}
      >
        <img
          style={{ ...baseIconCss, ...iconColorCss, ...iconAnimationCss }}
          src={icon}
          onClick={incrementProgressionState}
          onContextMenu={decrementProgressionState}
        />
        <Tooltip id={itemState.item.id} style={{ zIndex: "4" }} />
        <button
          className="w-[24px] h-[24px]"
          onClick={incrementLocationState}
          onContextMenu={decrementLocationState}
          style={{
            backgroundColor: "#ffffff",
            color: "#000011",
            opacity: 1,
            borderColor: "#000000",
            borderWidth: 1,
            borderRadius: "50%",
            zIndex: "2",
          }}
        >
          <div className="text-sm">{itemState.location.initial}</div>
        </button>
      </div>
    );
  },
);

export default MajorProgressiveItemCell;
