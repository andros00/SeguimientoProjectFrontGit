export interface IMenuItem {
  icon: string;
  label: string;
  action: () => void;
  disabled?: boolean;
}
