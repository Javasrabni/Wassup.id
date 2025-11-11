import { GetDetailUsersProfile } from "@/lib/user_profile/userProfile";
import UserProfileClient from "./userProfileClient";
import { GetUserArticlePosts } from "@/lib/user_article/getAllPosts";

async function UserProfile({params}: {params: {slug: string}}) {
  const articles = await GetUserArticlePosts()
  const profile = await GetDetailUsersProfile(params.slug.replaceAll('-', ' '))
  return <UserProfileClient profile={profile} articles={articles}/>
};

export default UserProfile;
