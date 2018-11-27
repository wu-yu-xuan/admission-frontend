import * as React from 'react';
import ContentTitle from 'src/components/ContentTitle';
import * as style from './style.scss';
import { Radio, Table, Button, Input, InputNumber, message, Icon } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ColumnProps } from 'antd/lib/table';
import ajax, { Code } from 'src/utility/ajax';

const { Group, Button: RadioButton } = Radio;

enum Batch {
  previous,
  first,
  second,
  third
}

interface ProfessionData {
  key: number;
  name: string;
  id: number;
  population: number;
  batch: Batch;
}

export default function Declare() {
  const [proportion, handleProportionChange] = useProportion();
  const [profession, handleChange, addData] = useProfession();
  const [success, handleSubmit] = useSubmit(profession);

  if (success) {
    return (
      <>
        <ContentTitle>申报招生信息</ContentTitle>
        <p className={style.success}>
          <Icon type="check-circle" className={style.icon} />
          志愿已提交成功
        </p>
      </>
    )
  }

  const columns: Array<ColumnProps<ProfessionData>> = [{
    title: '专业名',
    dataIndex: 'name',
    render: (text, record, index) => <Input value={text} onChange={handleChange(index)('name')} />
  }, {
    title: '专业号',
    dataIndex: 'id',
    render: (text, record, index) => <InputNumber min={0} value={text} onChange={handleChange(index)('id')} />
  }, {
    title: '人数',
    dataIndex: 'population',
    render: (text, record, index) => <InputNumber min={1} value={text} onChange={handleChange(index)('population')} />
  }, {
    title: '批次',
    dataIndex: 'batch',
    render: (text, record, index) => (
      <Group value={text} onChange={handleChange(index)('batch')} className={style.batchRadioGroup}>
        <RadioButton value={Batch.previous} key={Batch.previous}>提前批</RadioButton>
        <RadioButton value={Batch.first} key={Batch.first}>第一批</RadioButton>
        <RadioButton value={Batch.second} key={Batch.second}>第二批</RadioButton>
        <RadioButton value={Batch.third} key={Batch.third}>第三批</RadioButton>
      </Group>
    )
  }];

  const renderFooter = () => (<Button onClick={addData} block={true} type="dashed" icon="plus" size="large" />)

  return (
    <>
      <ContentTitle>申报招生信息</ContentTitle>
      <form onSubmit={handleSubmit}>
        <div className={style.row}>
          <label className={style.proportionLabel}>调档比例: </label>
          <Group onChange={handleProportionChange} value={proportion}>
            <RadioButton value={1.0} key="0">1.0</RadioButton>
            <RadioButton value={1.1} key="1">1.1</RadioButton>
            <RadioButton value={1.2} key="2">1.2</RadioButton>
          </Group>
        </div>
        <p className={style.professionLabel}>专业: </p>
        <Table columns={columns} dataSource={profession} pagination={false} footer={renderFooter} className={style.table} />
        <Button type="primary" htmlType="submit" size="large" className={style.button}>提交</Button>
      </form>
    </>
  )
}

function useSubmit(data: ProfessionData[]): [boolean, (e: React.FormEvent<HTMLFormElement>) => Promise<void>] {
  const [success, setSuccess] = React.useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = await ajax({
      url: 'college/declare',
      data,
      method: 'POST'
    });
    if (json.code !== Code.success) {
      message.error('提交失败');
      return;
    }
    setSuccess(true);
  }
  return [success, handleSubmit];
}

function useProfession(): [
  ProfessionData[],
  (index: number) => (key: string) => (e: React.ChangeEvent<HTMLInputElement> | RadioChangeEvent | number | string) => void,
  (e: React.MouseEvent) => void
] {
  const [profession, setProfession] = React.useState<ProfessionData[]>([{
    key: 0,
    name: '',
    id: 0,
    population: 1,
    batch: Batch.previous
  }]);
  const handleChange = (index: number) => (key: string) => (e: React.ChangeEvent<HTMLInputElement> | RadioChangeEvent | number | string) => {
    const value = (typeof e === 'number' || typeof e === 'string') ? e : e.target.value;
    setProfession(oldValue => {
      oldValue[index][key] = value;
      return oldValue;
    });
  }
  const addData = (e: React.MouseEvent) => {
    setProfession(oldValue => {
      oldValue.push({
        key: Math.max(...oldValue.map(v => v.key)) + 1,
        name: '',
        id: 0,
        population: 1,
        batch: Batch.previous
      });
      return oldValue;
    })
  }
  return [profession, handleChange, addData];
}

function useProportion(): [number, (e: RadioChangeEvent) => void] {
  const [proportion, setProportion] = React.useState(1);
  const handleChange = (e: RadioChangeEvent) => setProportion(e.target.value);
  return [proportion, handleChange];
}