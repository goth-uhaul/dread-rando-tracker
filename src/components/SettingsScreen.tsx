import { useCallback, useEffect, useState, useRef } from "react";
import {
  loadPreviousSettings,
  saveSettings,
  TrackerSettings,
} from "../utilities/settings";
import { TrackerStore } from "../store/TrackerStore";
import { hasSavedState, loadPreviousState } from "../store/persistence";
import { speedBoosterUpgrades, flashShiftUpgrades } from "../data";

export interface SettingsScreenProps {
  doneConfiguring(settings: TrackerSettings): void;
  loadedPreviousState(store: TrackerStore): void;
}

export default function SettingsScreen({
  doneConfiguring,
  loadedPreviousState,
}: SettingsScreenProps) {
  const elemNumberOfSpeedBoosterUpgradesRef = useRef<HTMLInputElement>(null);
  const elemNumberOfFlashShiftUpgradesRef = useRef<HTMLInputElement>(null);

  const [hasProgressiveBeam, setHasProgressiveBeam] = useState(false);
  const [hasProgressiveCharge, setHasProgressiveCharge] = useState(false);
  const [hasProgressiveBomb, setHasProgressiveBomb] = useState(false);
  const [hasProgressiveMissile, setHasProgressiveMissile] = useState(false);
  const [hasProgressiveSpin, setHasProgressiveSpin] = useState(false);
  const [hasProgressiveSuit, setHasProgressiveSuit] = useState(false);
  const [speedBoosterHasUpgrades, setSpeedBoosterHasUpgrades] = useState(false);
  const [flashShiftHasUpgrades, setFlashShiftHasUpgrades] = useState(false);
  const [numberOfFlashShiftUpgrades, setNumberOfFlashShiftUpgrades] = useState(
    flashShiftUpgrades[0].defaultMaxUpgrades,
  );
  const [numberOfSpeedBoosterUpgrades, setNumberOfSpeedBoosterUpgrades] =
    useState(speedBoosterUpgrades[0].defaultMaxUpgrades ?? 0);
  const [startWithPulseRadar, setStartWithPulseRadar] = useState(false);
  const [allMajorBossesHaveDna, setAllMajorBossesHaveDna] = useState(false);
  const [canLoadPreviousState] = useState(() => hasSavedState());

  useEffect(() => {});

  useEffect(() => {
    const previousSettings = loadPreviousSettings();

    setHasProgressiveBeam(previousSettings.progressiveBeam ?? false);
    setHasProgressiveCharge(previousSettings.progressiveCharge ?? false);
    setHasProgressiveBomb(previousSettings.progressiveBomb ?? false);
    setHasProgressiveMissile(previousSettings.progressiveMissile ?? false);
    setHasProgressiveSpin(previousSettings.progressiveSpin ?? false);
    setHasProgressiveSuit(previousSettings.progressiveSuit ?? false);
    setSpeedBoosterHasUpgrades(
      previousSettings.speedBoosterHasUpgrades ?? false,
    );
    setFlashShiftHasUpgrades(previousSettings.flashShiftHasUpgrades ?? false);
    setStartWithPulseRadar(previousSettings.startWithPulseRadar ?? false);
    setAllMajorBossesHaveDna(previousSettings.allMajorBossesHaveDna ?? false);

    setNumberOfSpeedBoosterUpgrades(
      previousSettings.numberOfSpeedBoosterUpgrades ??
        speedBoosterUpgrades[0].defaultMaxUpgrades,
    );

    setNumberOfFlashShiftUpgrades(
      previousSettings.numberOfFlashShiftUpgrades ??
        flashShiftUpgrades[0].defaultMaxUpgrades,
    );
  }, []);

  const onClickLoadPreviousState = useCallback(() => {
    const store = loadPreviousState();

    if (store) {
      loadedPreviousState(store);
    }
  }, [loadedPreviousState]);

  return (
    <div className="container">
      <div className="w-[420px] max-w-[420px]">
        <div className="grid grid-cols-[100%] items-center">
          <div className="text-3xl dark:text-white text-center pt-4">
            Options
          </div>

          <div className="grid grid-cols-1 py-4 px-12 items-center">
            <label className="dark:text-white ">
              <input
                type="checkbox"
                checked={hasProgressiveBeam}
                onChange={() => setHasProgressiveBeam(!hasProgressiveBeam)}
              />
              Progressive Beam
            </label>
            <label className="dark:text-white">
              <input
                type="checkbox"
                checked={hasProgressiveCharge}
                onChange={() => setHasProgressiveCharge(!hasProgressiveCharge)}
              />
              Progressive Charge
            </label>
            <label className="dark:text-white">
              <input
                type="checkbox"
                checked={hasProgressiveBomb}
                onChange={() => setHasProgressiveBomb(!hasProgressiveBomb)}
              />
              Progressive Bomb
            </label>
            <label className="dark:text-white">
              <input
                type="checkbox"
                checked={hasProgressiveMissile}
                onChange={() =>
                  setHasProgressiveMissile(!hasProgressiveMissile)
                }
              />
              Progressive Missile
            </label>
            <label className="dark:text-white">
              <input
                type="checkbox"
                checked={hasProgressiveSpin}
                onChange={() => setHasProgressiveSpin(!hasProgressiveSpin)}
              />
              Progressive Spin
            </label>
            <label className="dark:text-white">
              <input
                type="checkbox"
                checked={hasProgressiveSuit}
                onChange={() => setHasProgressiveSuit(!hasProgressiveSuit)}
              />
              Progressive Suit
            </label>
            <label className="dark:text-white">
              <input
                type="checkbox"
                checked={speedBoosterHasUpgrades}
                onChange={() =>
                  setSpeedBoosterHasUpgrades(!speedBoosterHasUpgrades)
                }
              />
              Speed Booster Has Upgrades
            </label>
            <label className="dark:text-white">
              <input
                type="checkbox"
                checked={flashShiftHasUpgrades}
                onChange={() =>
                  setFlashShiftHasUpgrades(!flashShiftHasUpgrades)
                }
              />
              Flash Shift Has Upgrades
            </label>
            <label className="dark:text-white">
              <input
                type="checkbox"
                checked={startWithPulseRadar}
                onChange={() => setStartWithPulseRadar(!startWithPulseRadar)}
              />
              Start with Pulse Radar
            </label>
            <label className="dark:text-white">
              <input
                type="checkbox"
                checked={allMajorBossesHaveDna}
                onChange={() =>
                  setAllMajorBossesHaveDna(!allMajorBossesHaveDna)
                }
              />
              All Major Bosses Have DNA
            </label>
            {speedBoosterHasUpgrades && (
              <label className="dark:text-white">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div># of Speed Booster Upgrades</div>
                  <div style={{ marginLeft: "auto" }}>
                    <input
                      inputMode="numeric"
                      type="number"
                      ref={elemNumberOfSpeedBoosterUpgradesRef}
                      style={{
                        width: "72px",
                        paddingInline: "4px",
                        color: "black",
                        backgroundColor: "white",
                        borderWidth: "1px",
                        borderColor: "black",
                      }}
                      defaultValue={numberOfSpeedBoosterUpgrades}
                      min={0}
                      max={9}
                      onChange={(e) => {
                        if (+e.target.value < +e.target.min) {
                          e.target.value = e.target.min;
                        }

                        if (+e.target.value > +e.target.max) {
                          e.target.value = e.target.max;
                        }

                        setNumberOfSpeedBoosterUpgrades(+e.target.value);
                      }}
                    />
                  </div>
                </div>
              </label>
            )}
            {flashShiftHasUpgrades && (
              <label className="dark:text-white">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div># of Flash Shift Upgrades</div>
                  <div style={{ marginLeft: "auto" }}>
                    <input
                      inputMode="numeric"
                      type="number"
                      ref={elemNumberOfFlashShiftUpgradesRef}
                      style={{
                        width: "72px",
                        paddingInline: "4px",
                        color: "black",
                        backgroundColor: "white",
                        borderWidth: "1px",
                        borderColor: "black",
                      }}
                      defaultValue={numberOfFlashShiftUpgrades}
                      min={0}
                      max={9}
                      onChange={(e) => {
                        if (+e.target.value < +e.target.min) {
                          e.target.value = e.target.min;
                        }

                        if (+e.target.value > +e.target.max) {
                          e.target.value = e.target.max;
                        }

                        setNumberOfFlashShiftUpgrades(+e.target.value);
                      }}
                    />
                  </div>
                </div>
              </label>
            )}
          </div>

          <button
            className="dark:text-white dark:bg-slate-900 text-xl m-2 p-2 text-center rounded-lg"
            onClick={() => {
              const settings: TrackerSettings = {
                progressiveBeam: hasProgressiveBeam,
                progressiveCharge: hasProgressiveCharge,
                progressiveBomb: hasProgressiveBomb,
                progressiveMissile: hasProgressiveMissile,
                progressiveSpin: hasProgressiveSpin,
                progressiveSuit: hasProgressiveSuit,
                flashShiftHasUpgrades: flashShiftHasUpgrades,
                numberOfFlashShiftUpgrades: numberOfFlashShiftUpgrades,
                speedBoosterHasUpgrades: speedBoosterHasUpgrades,
                numberOfSpeedBoosterUpgrades: numberOfSpeedBoosterUpgrades,
                startWithPulseRadar: startWithPulseRadar,
                allMajorBossesHaveDna: allMajorBossesHaveDna,
              };

              saveSettings(settings);
              doneConfiguring(settings);
            }}
          >
            Open Tracker
          </button>

          {canLoadPreviousState && (
            <button
              className="dark:text-white dark:bg-slate-900 text-xl m-2 p-2 text-center rounded-lg"
              onClick={onClickLoadPreviousState}
            >
              Load Previous Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
