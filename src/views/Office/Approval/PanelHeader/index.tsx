import * as React from 'react';
import * as style from './style.scss';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface PanelHeaderProps {
  title: string;
  checked: boolean;
  onChange(e: CheckboxChangeEvent): void;
}

export default React.memo( function PanelHeader({ title, checked, onChange }: PanelHeaderProps) {
  return (
    <div className={style.panelHeader}>
      <span>{title}</span>
      <Checkbox checked={checked} onChange={onChange} />
    </div>
  )
})