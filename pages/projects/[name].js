import { useRouter } from "next/router";
import { useMST } from "../_app";
import { observer } from "mobx-react";
import { Project } from "../../models/Project";

const Post = () => {
  const store = useMST();
  const router = useRouter();

  const { name } = router.query;
  const projectDetails = store.projects.get(name);

  return (
    <div>
      <p>Project ID: {projectDetails.id}</p>
      <p>Project Name: {projectDetails.name}</p>
    </div>
  );
};

export default Post;
