// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { setMonth, format } from 'date-fns';
import { memo, useState, useEffect } from 'react';
import { months, yearRange, usePrevious, isNumberInRange } from './utils';

const monthOptions = months.map((month, i) => (
  <option key={i} value={i}>
    {format(setMonth(new Date(), month), 'MMM')}
  </option>
));

type SelectMonthProps = {
  onChange: number => mixed,
  month: number,
};

export const SelectMonth: React.ComponentType<SelectMonthProps> = memo(({ onChange, month }) => {
  return (
    <select
      id="ks-select-month"
      onChange={event => {
        onChange(Number(event.target.value));
      }}
      value={month}
    >
      {monthOptions}
    </select>
  );
});

export type YearPickerType = 'auto' | 'input';

type SelectYearProps = {
  onChange: number => mixed,
  year: number,
  yearRangeFrom: number,
  yearRangeTo: number,
  yearPickerType: YearPickerType,
};

export const SelectYear: React.ComponentType<SelectYearProps> = memo(
  ({ onChange, year, yearRangeFrom, yearRangeTo, yearPickerType }) => {
    const years = yearRange(yearRangeFrom, yearRangeTo);

    // using internal state so that the user can input invalid values
    // but the parent component will only recieve valid values
    const [internalValue, setInternalValue] = useState(year);

    const previousYearProp = usePrevious(year);
    useEffect(() => {
      if (previousYearProp !== year) {
        setInternalValue(year);
      }
    }, [previousYearProp, year, setInternalValue]);

    const handleChange = event => {
      const value = Number(event.target.value);
      setInternalValue(value);
      if (isNumberInRange(value, yearRangeFrom, yearRangeTo)) {
        onChange(value);
      }
    };

    if ((years.length > 50 && yearPickerType === 'auto') || yearPickerType === 'input') {
      return (
        <input
          id="ks-input-year"
          type="number"
          min={yearRangeFrom}
          max={yearRangeTo}
          onChange={handleChange}
          value={internalValue}
        />
      );
    } else {
      return (
        <select id="ks-select-year" onChange={handleChange} value={internalValue}>
          {years.map((yearOption, i) => (
            <option key={i} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      );
    }
  }
);
