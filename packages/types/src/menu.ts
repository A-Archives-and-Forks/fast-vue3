export interface MenuItem {
  path: string;
  name: string;
  title: string;
  icon?: string;
  children?: MenuItem[];
  hidden?: boolean;
  sort?: number;
}
