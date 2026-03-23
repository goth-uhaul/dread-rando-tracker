import { useCallback, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useLocationHotkeys } from "../utilities/hotkeys";
import { SingleItemState } from "../store/SingleItemState";
import locations from "../data/locations";
import { observer } from "mobx-react-lite";
import {
  baseIconCss,
  unhoverCss,
  hoverCss,
  itemActiveCss,
  itemInactiveCss,
} from "../utilities/iconCss";

export interface MajorItemCellProps {
  itemState: SingleItemState;
}

const MajorItemCell = observer(({ itemState }: MajorItemCellProps) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [didClick, setDidClick] = useState(false);
  const hotkeysDisabled = itemState.startingLocation === locations.Starting;

  useLocationHotkeys(mouseOver, itemState, hotkeysDisabled);

  const toggleCollected = useCallback(
    (e: React.MouseEvent) => {
      if (e.currentTarget !== e.target) {
        return;
      }

      itemState.toggleCollected();
      setDidClick(true);
    },
    [itemState],
  );

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
    },
    [itemState],
  );

  const incrementUpgradeCounter = useCallback(
    (e: React.MouseEvent) => {
      if (e.currentTarget === e.target) {
        e.stopPropagation();
      }

      itemState.incrementUpgradeCount();
    },
    [itemState],
  );

  const decrementUpgradeCounter = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (e.currentTarget === e.target) {
        e.stopPropagation();
      }

      itemState.decrementUpgradeCount();
    },
    [itemState],
  );

  let iconAnimationCss = unhoverCss;
  let iconColorCss = itemInactiveCss;

  if (mouseOver && !didClick && !itemState.startedWithThisItem) {
    iconAnimationCss = hoverCss;
  } else {
    iconAnimationCss = unhoverCss;
  }

  if (itemState.collected) {
    iconColorCss = itemActiveCss;
  } else if (!itemState.collected) {
    iconColorCss = itemInactiveCss;
  }

  return (
    <div
      data-tooltip-id={itemState.item.id}
      data-tooltip-content={itemState.item.name}
      className="flex justify-between"
      style={{
        position: "relative",
        width: "64px",
        height: "64px",
      }}
      onDoubleClick={(e) => e.preventDefault()}
      onMouseEnter={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
        setDidClick(false);
      }}
    >
      <img
        style={{ ...baseIconCss, ...iconColorCss, ...iconAnimationCss }}
        onClick={toggleCollected}
        src={itemState.item.icon}
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
      {itemState.item.maxUpgrades > 0 && (
        <button
          className="w-[24px] h-[24px] self-end"
          onClick={incrementUpgradeCounter}
          onContextMenu={decrementUpgradeCounter}
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
          <div className="text-sm">{itemState.upgradeCount}</div>
        </button>
      )}
    </div>
  );
});

export default MajorItemCell;
