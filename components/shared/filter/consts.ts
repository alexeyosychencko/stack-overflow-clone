/* eslint-disable no-unused-vars */
export const AnswerFilters = [
  { name: "Highest Upvotes", value: "highestUpvotes" },
  { name: "Lowest Upvotes", value: "lowestUpvotes" },
  { name: "Most Recent", value: "recent" },
  { name: "Oldest", value: "old" }
];

export enum UserFiltersValues {
  NewUsers = "new_users",
  OldUsers = "old_users",
  TopContributors = "top_contributors"
}

export const UserFilters = [
  { name: "New Users", value: UserFiltersValues.NewUsers },
  { name: "Old Users", value: UserFiltersValues.OldUsers },
  { name: "Top Contributors", value: UserFiltersValues.TopContributors }
];

export enum QuestionFiltersValues {
  Newest = "newest",
  Oldest = "oldest",
  MostVoted = "most_voted",
  MostViewed = "most_viewed",
  MostAnswered = "most_answered"
}

export const QuestionFilters = [
  { name: "Newest", value: QuestionFiltersValues.Newest },
  { name: "Oldest", value: QuestionFiltersValues.Oldest },
  // { name: "Most Voted", value: QuestionFiltersValues.MostVoted },
  { name: "Most Viewed", value: QuestionFiltersValues.MostViewed },
  { name: "Most Answered", value: QuestionFiltersValues.MostAnswered }
];

export const TagFilters = [
  { name: "Popular", value: "popular" },
  { name: "Recent", value: "recent" },
  { name: "Name", value: "name" },
  { name: "Old", value: "old" }
];

export const HomePageFilters = [
  { name: "Newest", value: "newest" },
  { name: "Recommended", value: "recommended" },
  { name: "Frequent", value: "frequent" },
  { name: "Unanswered", value: "unanswered" }
];

export const GlobalSearchFilters = [
  { name: "Question", value: "question" },
  { name: "Answer", value: "answer" },
  { name: "User", value: "user" },
  { name: "Tag", value: "tag" }
];
