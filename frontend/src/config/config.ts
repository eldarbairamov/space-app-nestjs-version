export const config = {
   API_URL: import.meta.env.VITE_API_URL,
   SERVER_URL: import.meta.env.VITE_SERVER_URL,
};

export const userRequests = {
   profileUpdate: "/user/profile_update",
   changeEmail: "/user/email_change",
   changeEmailAccept: "/user/email_new",
   changePassword: "/user/password_new",
   getUser: "/user/get_user",
   uploadAvatar: "/user/avatar_upload",
   deleteAvatar: "/user/avatar_delete",
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

export const momentsRequests = {
   addPlan: "/moments/add",
   deletePlan: "/moments/",
   updatePlan: "/moments/",
   getAllPlans: "/moments",
   getPlansCount: "/moments/count",
   getPlansByTags: "/moments/filter",
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