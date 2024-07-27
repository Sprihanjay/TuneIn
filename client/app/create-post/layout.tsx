import { Input } from "../components/ui/input";
import PostForm from "../components/post-form/post-form";

const createPost = ({ children }: { children: React.ReactElement }) => {
  return <div className="w-screen h-screen flex justify-center">
    <PostForm>
    </PostForm>
  </div>
};

export default createPost;