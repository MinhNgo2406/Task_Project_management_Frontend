export const user = {
  name: "Ngô Minh",
  email: "ngominh24062003@gmail.com",
  role: "Manager",
  // đổi thử: "Admin", "Manager", "Member", "Viewer"
};

export const projects = [
  {
    id: "1",
    name: "Task Management App",
    description: "Ứng dụng quản lý dự án và công việc nhóm.",
    progress: 75,
    status: "In Progress",
    members: 5,
    deadline: "25/05/2026",
  },
  {
    id: "2",
    name: "Mobile UI Design",
    description: "Thiết kế giao diện mobile cho hệ thống quản lý.",
    progress: 40,
    status: "Planning",
    members: 3,
    deadline: "01/06/2026",
  },
  {
    id: "3",
    name: "Backend API",
    description: "Xây dựng API cho workspace, project và task.",
    progress: 90,
    status: "Review",
    members: 4,
    deadline: "20/05/2026",
  },
];

export const tasks = [
  {
    id: "1",
    title: "Thiết kế màn hình Dashboard",
    project: "Task Management App",
    status: "Done",
    priority: "High",
    assignee: "Minh",
    deadline: "18/05/2026",
    description: "Tạo giao diện tổng quan gồm project, task và notification.",
    subtasks: [
      { id: "s1", title: "Tạo Stat Card", done: true },
      { id: "s2", title: "Tạo Recent Project", done: true },
    ],
    comments: [{ id: "c1", user: "Minh", message: "Dashboard đã hoàn thành." }],
  },
  {
    id: "2",
    title: "Làm màn hình Project Detail",
    project: "Task Management App",
    status: "In Progress",
    priority: "Medium",
    assignee: "Minh",
    deadline: "22/05/2026",
    description: "Hiển thị chi tiết project, tiến độ và danh sách task.",
    subtasks: [
      { id: "s3", title: "Hiển thị thông tin project", done: true },
      { id: "s4", title: "Hiển thị task trong project", done: false },
    ],
    comments: [
      { id: "c2", user: "Khoa", message: "Nhớ thêm milestone vào màn này." },
    ],
  },
  {
    id: "3",
    title: "Tạo UI Notification",
    project: "Mobile UI Design",
    status: "Todo",
    priority: "Low",
    assignee: "Khoa",
    deadline: "24/05/2026",
    description: "Tạo danh sách thông báo và trạng thái đã đọc.",
    subtasks: [],
    comments: [],
  },
];

export const notifications = [
  {
    id: "1",
    title: "Task mới được giao",
    message: "Bạn được giao task: Làm màn hình Project Detail.",
    read: false,
  },
  {
    id: "2",
    title: "Project sắp đến hạn",
    message: "Project Backend API sẽ đến hạn vào 20/05/2026.",
    read: false,
  },
  {
    id: "3",
    title: "Task đã hoàn thành",
    message: "Task Dashboard đã được chuyển sang Done.",
    read: true,
  },
];
