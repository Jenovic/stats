interface IStudySession {
  uuid?: string;
  userUuid?: string;
  user?: IUser;
  courseUuid?: string;
  course?: ICourse;
  totalModulesStudied: number;
  averageScore: number;
  timeStudied: number;
  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
}
