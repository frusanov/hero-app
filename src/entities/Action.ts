import { ReactNode } from 'react';

export default class Action {
  title: string;
  icon: string | ReactNode;
  event: string;
  disabled: boolean;

  constructor({ title, icon, event, disabled = false }) {
    this.title = title;
    this.icon = icon;
    this.event = event;
    this.disabled = disabled;
  }
}
