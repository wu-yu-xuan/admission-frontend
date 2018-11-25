import * as React from 'react';
import { search } from './style.scss';
import { AutoComplete, message } from 'antd';
import { SelectValue, OptionProps } from 'antd/lib/select';
import ajax, { Code } from 'src/utility/ajax';

interface SearchBarProps {
  value: string;
  onChange(value: SelectValue): void;
  onSelect(value: SelectValue): any;
}

export default React.memo(function SearchBar({ value, onChange, onSelect }: SearchBarProps) {
  const colleges = useColleges();

  return (
    <AutoComplete
      dataSource={colleges}
      placeholder="请输入想要查询的学校"
      size="large"
      className={search}
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      filterOption={isValid}
    />
  )
});

function isValid(v: SelectValue, option: React.ReactElement<OptionProps>) {
  return option.props.children.toString().includes(v.toString());
}

function useColleges() {
  const [colleges, setColleges] = React.useState<string[]>([]);

  React.useEffect(() => {
    (async () => {
      const json = await ajax<string[]>({ url: 'student/colleges' });
      if (json.code !== Code.success) {
        message.error('获取学校列表失败');
        return;
      }
      setColleges(json.data);
    })();
  }, []);

  return colleges;
}

export function useInput(): [string, (v: SelectValue) => void] {
  const [value, setValue] = React.useState('');
  const handleChange = (v: SelectValue) => setValue(v.toString());
  return [value, handleChange];
}