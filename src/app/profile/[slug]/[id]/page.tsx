import { GetDetailUsersProfile } from "@/lib/user_profile/userProfile";
import UserProfileClient from "./userProfileClient";
import { GetUserArticlePosts } from "@/lib/user_article/getAllPosts";
import CreateArticle from "@/models/CreateArticle";
import { Metadata } from "next";

interface Props {
  params: {
    slug: string;
    id: string;
  }
}

export async function generateMetadata({ params }: Props):Promise<Metadata> {
  const { slug, id } = params
  const dataSlug = slug.replaceAll('-', ' ')

  const profile = await GetDetailUsersProfile({ slug: dataSlug, id: id })
  if (!profile) {
    return {
      title: "Profil tidak ditemukan - Wassup.id",
      description: "Pengguna yang Anda cari tidak ditemukan.",
      robots: "noindex",
    }
  }

  const name = profile.username || dataSlug;
  const bio = profile.bio || `${name}, Seorang yang gemar membaca atau membagikan informasi bermanfaat di Wassup.id.`;

  return {
    title: `${name} - Wassup.id`,
    description: bio,

    authors: [{ name }],

    alternates: {
      canonical: `https://wassup.id/profile/${dataSlug}/${profile._id}`,
    },

    openGraph: {
      type: "profile",
      title: `${name} - Profil Penulis di Wassup.id`,
      description: bio,
      url: `https://wassup.id/profile/${dataSlug}/${profile._id}`,
      images: profile.avatar ? [profile.avatar] : [],
    },

    twitter: {
      card: "summary",
      title: `${name} - Profil Penulis`,
      description: bio,
      images: profile.avatar ? [profile.avatar] : [],
    },
  };
}
async function UserProfile({ params }: Props) {
  const dataSlug = params.slug.replaceAll('-', ' ')
  const articles = await GetUserArticlePosts()
  const profile = await GetDetailUsersProfile({ slug: dataSlug, id: params.id })
  const totalUserPosts = await CreateArticle.countDocuments({ author: dataSlug })

  return <UserProfileClient profile={profile} articles={articles} lengthUserPosts={totalUserPosts} />
};

export default UserProfile;
