type timeCategory = "Today" | "Previous 7 days" | "Previous 30 days" | "More than 30 days";

const datetimeUtil = {
  getTimeCategory: (dateString: string): timeCategory => {
    const date = new Date(dateString);
    const now = new Date();
    const passDay = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    if (passDay < 1) {
      return "Today";
    } else if (passDay < 7) {
      return "Previous 7 days";
    } else if (passDay < 30) {
      return "Previous 30 days";
    } else {
      return "More than 30 days";
    }
  },
};

export type { timeCategory };
export default datetimeUtil;
