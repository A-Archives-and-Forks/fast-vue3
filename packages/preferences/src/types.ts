export type ThemeMode = 'auto' | 'dark' | 'light';

export interface AppPreferences {
  /** Color gray mode */
  colorGrayMode: boolean;
  /** Color weak mode (for accessibility) */
  colorWeakMode: boolean;
  /** Content compact mode */
  contentCompact: boolean;
  /** Enable breadcrumb */
  enableBreadcrumb: boolean;
  /** Enable tabs */
  enableTabs: boolean;
  /** Header height */
  headerHeight: number;
  /** Language */
  locale: 'en-US' | 'zh-CN';
  /** Primary color (hex) */
  primaryColor: string;
  /** Sidebar collapsed */
  sidebarCollapsed: boolean;
  /** Sidebar width */
  sidebarWidth: number;
  /** Theme mode */
  themeMode: ThemeMode;
}
