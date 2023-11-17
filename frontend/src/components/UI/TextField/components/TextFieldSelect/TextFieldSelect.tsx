import React, { useEffect, useState } from 'react';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { useAppSelector } from '@/store/hooks';
import { selectOneTour } from '@/containers/tours/toursSlice';
import Select from 'react-select';

interface Props {
  name: string;
  label?: string;
  value: string;
  onSelect: (e: IChangeEvent) => void;
  className?: string;
}

interface IOption {
  value: string;
  label: string;
}

const TextFieldSelect: React.FC<Props> = (props) => {
  const tour = useAppSelector(selectOneTour);
  const [options, setOptions] = useState<IOption[]>([]);

  useEffect(() => {
    if (tour && !options.length) {
      setOptions(
        tour.guides.map((guide) => ({
          value: guide._id,
          label: guide.user.displayName,
        })),
      );
    }
  }, [tour, options]);

  return (
    <Select
      className={`text-field-select ${props.className}`}
      options={options}
      value={options.find((option) => option.value === props.value)}
      onChange={(newValue) =>
        newValue &&
        props.onSelect({ target: { name: props.name, value: newValue.value } })
      }
      placeholder={props.label}
      name={props.name}
    />
  );
};

export default TextFieldSelect;
