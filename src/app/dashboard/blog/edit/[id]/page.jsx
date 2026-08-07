import EditBlog from "@/pages/BlogAdmin/EditBlog/EditBlog";

export default async function Page({ params }) {
  const { id } = await params;

  return <EditBlog id={id} />;
}
