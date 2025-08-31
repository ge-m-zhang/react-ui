import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const meta = {
  title: 'components/select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A customizable select dropdown component with accessibility support.',
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'on-hold', label: 'On Hold' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany', disabled: true },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
];

export const Default: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Select status',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    return (
      <Select
        options={args.options}
        placeholder={args.placeholder}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithHelperText: Story = {
  args: {
    options: statusOptions,
    label: 'Task Status',
    placeholder: 'Select status',
    helperText: 'Choose from the available status options',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    return (
      <Select
        options={args.options}
        label={args.label}
        placeholder={args.placeholder}
        helperText={args.helperText}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: countryOptions,
    label: 'Select Country',
    placeholder: 'Choose a country',
    helperText: 'Some options may be disabled',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    return (
      <Select
        options={args.options}
        label={args.label}
        placeholder={args.placeholder}
        helperText={args.helperText}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// Interactive example with state management
export const Interactive: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Select status',
  },
  render: () => {
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('us');

    return (
      <div className='space-y-6'>
        <Select
          options={statusOptions}
          label='Task Status'
          placeholder='Select status'
          value={selectedStatus}
          onChange={setSelectedStatus}
          helperText={
            selectedStatus
              ? `You selected: ${selectedStatus}`
              : 'No status selected'
          }
        />

        <Select
          options={countryOptions}
          label='Country'
          placeholder='Select a country'
          value={selectedCountry}
          onChange={setSelectedCountry}
          helperText={
            selectedCountry
              ? `Selected country: ${selectedCountry}`
              : 'No country selected'
          }
        />
      </div>
    );
  },
};

export const AllSizes: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Select status',
  },
  render: () => {
    const [smallValue, setSmallValue] = useState<string>('');
    const [mediumValue, setMediumValue] = useState<string>('');
    const [largeValue, setLargeValue] = useState<string>('');

    return (
      <div className='space-y-4'>
        <Select
          options={statusOptions}
          label='Small Size'
          placeholder='Select status'
          size='small'
          value={smallValue}
          onChange={setSmallValue}
        />
        <Select
          options={statusOptions}
          label='Medium Size (Default)'
          placeholder='Select status'
          size='medium'
          value={mediumValue}
          onChange={setMediumValue}
        />
        <Select
          options={statusOptions}
          label='Large Size'
          placeholder='Select status'
          size='large'
          value={largeValue}
          onChange={setLargeValue}
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Select status',
  },
  render: () => {
    const [defaultValue, setDefaultValue] = useState<string>('');
    const [errorValue, setErrorValue] = useState<string>('');
    const [successValue, setSuccessValue] = useState<string>('');
    const [disabledValue, setDisabledValue] = useState<string>('');

    return (
      <div className='space-y-4'>
        <Select
          options={statusOptions}
          label='Default State'
          placeholder='Select status'
          helperText='This is a normal select'
          value={defaultValue}
          onChange={setDefaultValue}
        />
        <Select
          options={statusOptions}
          label='Error State'
          placeholder='Select status'
          error
          helperText='This field has an error'
          value={errorValue}
          onChange={setErrorValue}
        />
        <Select
          options={statusOptions}
          label='Success State'
          placeholder='Select status'
          success
          helperText='This field is valid'
          value={successValue}
          onChange={setSuccessValue}
        />
        <Select
          options={statusOptions}
          label='Disabled State'
          placeholder='Select status'
          disabled
          helperText='This field is disabled'
          value={disabledValue}
          onChange={setDisabledValue}
        />
      </div>
    );
  },
};
