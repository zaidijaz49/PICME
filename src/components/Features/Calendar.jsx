import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isWithinInterval, parseISO } from "date-fns";
import Button from "../common/Button";

function Calendar({
  value,
  onChange,
  title = "Choose Date",
  showHeader = true,
  onSetAvailability,
  showFooter = true,
  buttonLabel = "CONTINUE",
  onContinue,
  className = "",
  Dateheader = true,
  availabilities = [],       // green — photographer is available
  unavailabilities = [],     // red   — photographer is blocked
}) {

  // Check if a day falls inside any of the date ranges
  const isDayInRanges = (day, ranges) => {
    return ranges.some((range) => {
      try {
        return isWithinInterval(day, {
          start: parseISO(range.start_date),
          end: parseISO(range.end_date),
        });
      } catch {
        return false;
      }
    });
  };

  // Only allow selecting days that are available and not unavailable
  const isDisabled = (day) => {
    const available = isDayInRanges(day, availabilities);
    const unavailable = isDayInRanges(day, unavailabilities);

    // disable if not available OR if unavailable
    return !available || unavailable;
  };

  // Style each day based on availability
  const modifiers = {
    available: (day) =>
      isDayInRanges(day, availabilities) &&
      !isDayInRanges(day, unavailabilities),
    unavailable: (day) => isDayInRanges(day, unavailabilities),
  };

  const modifiersClassNames = {
    available: "day-available",     // green
    unavailable: "day-unavailable", // red
  };

  return (
    <div className={`bg-[#F2FAFC] rounded-2xl p-6 space-y-6 w-full ${className}`}>

      {/* Header */}
      {showHeader && (
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          {onSetAvailability && (
            <button
              onClick={onSetAvailability}
              className="text-cyan-600 underline text-sm cursor-pointer poppins-medium"
            >
              Set Availability
            </button>
          )}
        </div>
      )}

      {/* Legend */}
      {availabilities.length > 0 && (
        <div className="flex gap-4 text-xs poppins-regular">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
            Available
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            Unavailable
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />
            Your Selection
          </span>
        </div>
      )}

      {/* Selected Range Display */}
      {Dateheader && (
        <div className="flex justify-between bg-gray-50 rounded-xl p-4">
          <div>
            <p className="text-sm text-gray-500 poppins-regular">Booking From</p>
            <p className="font-semibold">
              {value?.from ? format(value.from, "MMM dd, yyyy") : "--"}
            </p>
          </div>
          <div className="w-px bg-gray-300 mx-4" />
          <div>
            <p className="text-sm text-gray-500 poppins-regular">Booking To</p>
            <p className="font-semibold">
              {value?.to ? format(value.to, "MMM dd, yyyy") : "--"}
            </p>
          </div>
        </div>
      )}

      {/* Calendar */}
      <style>{`
        .day-available {
          background-color: #bbf7d0 !important;
          border-radius: 50%;
          color: #166534 !important;
          font-weight: 600;
        }
        .day-unavailable {
          background-color: #fecaca !important;
          border-radius: 50%;
          color: #991b1b !important;
          text-decoration: line-through;
          opacity: 0.7;
        }
        .rdp-day_selected {
          background-color: #2BAFC7 !important;
          color: white !important;
        }
        .rdp-day_range_middle {
          background-color: #cffafe !important;
          color: #0e7490 !important;
        }
      `}</style>

      <div className="w-full flex justify-center">
        <DayPicker
          mode="range"
          selected={value}
          onSelect={onChange}
          showOutsideDays
          disabled={availabilities.length > 0 ? isDisabled : undefined}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
      </div>

      {/* Footer Button */}
      {showFooter && (
        <div className="h-15 mt-11">
          <Button label={buttonLabel} onClick={onContinue} />
        </div>
      )}
    </div>
  );
}

export default Calendar;