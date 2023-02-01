export const config = {
   API_URL: import.meta.env.VITE_API_URL,
};

export const userRequests = {
   profileUpdate: "/user/profile_update",
   changeEmailRequest: "/user/email_change",
   changeEmail: "/user/email_new",
   changePassword: "/user/password_new",
   getUserInfo: "/user/get_info",
};

export const notesRequests = {
   addNote: "/notes/add",
   getNotes: "/notes",
   getNotesCount: "/notes/count",
   saveNote: "/notes/",
   deleteNote: "/notes/",
   getNotesBySearch: "/notes/search",
};

export const plansRequests = {
   addPlan: "/plans/add",
   deletePlan: "/plans/",
   updatePlan: "/plans/",
   getAllPlans: "/plans",
   getPlansCount: "/plans/count",
   getPlansBySearch: "/plans/search",
};

export const authRequests = {
   registration: "/auth/registration",
   login: "/auth/login",
   forgotPassword: "auth/password_forgot",
   accountActivation: "/auth/activation",
   resetPassword: "/auth/password_reset",
   logout: "/auth/logout",
};

export const tasksRequests = {
   addTask: "/tasks/add",
   updateTask: "/tasks/",
   deleteTask: "/tasks/",
   getAllTasks: "/tasks",
};