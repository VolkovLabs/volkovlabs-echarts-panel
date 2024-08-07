import { InlineField, InlineFieldRow, Input, Select } from '@grafana/ui';
import React from 'react';

import { SERIES_TYPE_OPTIONS, TEST_IDS } from '../../constants';
import { DatasetItem, SeriesItem, SeriesType } from '../../types';
import { getSeriesWithNewType } from '../../utils';
import { LineEditor } from './../GraphEditors/LineEditor';
import { RadarEditor } from './../GraphEditors/RadarEditor';

/**
 * Label Width
 */
const LabelWidth = 10;

/**
 * Properties
 */
interface Props {
  /**
   * Value
   *
   * @type {SeriesItem}
   */
  value: SeriesItem;

  /**
   * On Change
   */
  onChange: (value: SeriesItem) => void;

  /**
   * Dataset
   */
  dataset: DatasetItem[];
}

export const SeriesItemEditor: React.FC<Props> = ({ value, onChange, dataset }) => (
  <>
    <InlineFieldRow>
      <InlineField label="ID" labelWidth={LabelWidth} grow={true}>
        <Input
          value={value.id}
          onChange={(event) => {
            onChange({
              ...value,
              id: event.currentTarget.value,
            });
          }}
          data-testid={TEST_IDS.seriesEditor.fieldId}
        />
      </InlineField>
      <InlineField label="Type" labelWidth={LabelWidth} grow={true}>
        <Select
          value={value.type}
          options={SERIES_TYPE_OPTIONS}
          onChange={(event) => {
            if (event.value) {
              onChange(getSeriesWithNewType(value, event.value));
            }
          }}
          aria-label={TEST_IDS.seriesEditor.fieldType}
        />
      </InlineField>
    </InlineFieldRow>
    <InlineFieldRow>
      <InlineField label="Name" labelWidth={LabelWidth} grow={true}>
        <Input
          value={value.name}
          onChange={(event) => {
            onChange({
              ...value,
              name: event.currentTarget.value,
            });
          }}
          data-testid={TEST_IDS.seriesEditor.fieldName}
        />
      </InlineField>
    </InlineFieldRow>
    {value.type === SeriesType.LINE && <LineEditor value={value} onChange={onChange} dataset={dataset} />}
    {value.type === SeriesType.RADAR && <RadarEditor value={value} onChange={onChange} dataset={dataset} />}
  </>
);
