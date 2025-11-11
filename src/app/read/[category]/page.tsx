import DataUserPosts from "@/components/server/DataUserPosts";
import { GetUserArticlePosts } from "@/lib/user_article/getAllPosts";
import React from "react";

const CategoryListPage = async ({ params }: { params: { category: string } }) => {
  const article = await GetUserArticlePosts()
  const { category } = params;
  const findKey = category.replace("-", " ");

  return (
    <div className="h-full">
      <DataUserPosts articles={article} category={findKey.toString()} />

    </div>
  );
};

export default CategoryListPage;
