import EmployeesIcon from '@iconify/icons-eva/people-outline';
import AccountIcon from '@iconify/icons-eva/person-outline';
// import AccountIcon from '@iconify/icons-ant-design/user-outlined';
import fileTextFill from '@iconify/icons-eva/file-text-outline';
import lockFill from '@iconify/icons-eva/lock-outline';
import SettingsIcon from '@iconify/icons-eva/settings-outline';
import WorkSpaceIcon from '@iconify/icons-eva/layout-outline';
import ProjectsIcon from '@iconify/icons-ant-design/code-sandbox-outlined';
import ProjBoard from '@iconify/icons-eva/layers-outline';
import DashBoardIcon from '@iconify/icons-ant-design/layout-outlined';
import AnalyticsIcon from '@iconify/icons-ant-design/signal-filled';
import TaskIcon from '@iconify/icons-ant-design/project-outlined';
import { getIcon } from 'Utils/GetIcon';
// ----------------------------------------------------------------------

export interface NavItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

export const AdminSideBar = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: getIcon(DashBoardIcon),
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: getIcon(ProjBoard),
  },
  {
    title: 'Employees',
    path: '/employees',
    icon: getIcon(EmployeesIcon),
  },
  {
    title: 'Analytics & Reports',
    path: '/analytics',
    icon: getIcon(AnalyticsIcon),
  },
  // {
  //   title: 'Settings',
  //   path: '/',
  //   icon: getIcon(SettingsIcon),
  // },
];

export const ProjManagerSideBar = [
  {
    title: 'WorkSpace',
    path: '/workspace',
    icon: getIcon(WorkSpaceIcon),
  },
  // {
  //   title: 'Employees',
  //   path: '/',
  //   icon: getIcon(EmployeesIcon),
  // },
  // {
  //   title: 'Project Board',
  //   path: '/projectBoard',
  //   icon: getIcon(ProjectsIcon),
  // },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: getIcon(AnalyticsIcon),
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: getIcon(SettingsIcon),
  },
  {
    title: 'My Account',
    path: '/account',
    icon: getIcon(AccountIcon),
  },
];

export const UserSidebar = [
  {
    title: 'Workspace',
    path: '/',
    icon: getIcon(WorkSpaceIcon),
  },
  {
    title: 'Board/Task',
    path: '/',
    icon: getIcon(TaskIcon),
  },
  // {
  //   title: 'Activity',
  //   path: '/',
  //   icon: getIcon(shoppingBagFill),
  // },
  {
    title: 'Analytics',
    path: '/',
    icon: getIcon(fileTextFill),
  },
  {
    title: 'Settings',
    path: '/',
    icon: getIcon(lockFill),
  },
  {
    title: 'My Account',
    path: '/',
    icon: getIcon(AccountIcon),
  },
];

// export default sidebarConfig;
